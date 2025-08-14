<?php

namespace Tests\Feature\Cart;

use Tests\TestCase;
use App\Models\User;
use App\Models\Cart;
use App\Models\Product;
use App\Models\CartItem;
use App\Services\CartService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class CartTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        // Create a test user
        $this->user = User::factory()->create();

        // Create a test product
        $this->product = Product::factory()->create([
            'name' => 'Test Product',
            'price' => 99.99
        ]);
    }

    public function test_guest_can_view_empty_cart()
    {
        $response = $this->get(route('cart.index'));

        $response->assertStatus(200)
            ->assertInertia(fn (Assert $page) => $page
                ->component('cart/index')
                ->has('cart', fn (Assert $cart) => $cart
                    ->has('items')
                    ->where('total', 0)
                    ->where('item_count', 0)
                )
            );
    }

    public function test_user_can_add_product_to_cart()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 2
            ]);

        $response->assertSessionHas('success', 'Product added to cart');

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $this->product->id,
            'quantity' => 2
        ]);
    }

    public function test_user_can_update_cart_item_quantity()
    {
        // First add an item to cart
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', $cartItem), [
                'quantity' => 3
            ]);

        $response->assertSessionHas('success', 'Cart updated');

        $this->assertDatabaseHas('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 3
        ]);
    }

    public function test_user_can_remove_cart_item()
    {
        // First add an item to cart
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->delete(route('cart.remove', $cartItem));

        $response->assertSessionHas('success', 'Item removed from cart');

        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id
        ]);
    }

    public function test_user_can_clear_cart()
    {
        // First add multiple items to cart
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        CartItem::factory()->count(3)->create([
            'cart_id' => $cart->id
        ]);

        $response = $this->actingAs($this->user)
            ->post(route('cart.clear'));

        $response->assertSessionHas('success', 'Cart cleared');

        $this->assertDatabaseCount('cart_items', 0);
    }

    public function test_cart_shows_correct_total_and_item_count()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);

        // Add two different products with different quantities
        CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 2
        ]);

        $product2 = Product::factory()->create(['price' => 49.99]);
        CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $product2->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->get(route('cart.index'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('cart/index')
            ->has('cart', fn (Assert $cart) => $cart
                ->has('items', 2)
                ->where('total', 249.97) // (99.99 * 2) + 49.99
                ->where('item_count', 3) // 2 + 1
            )
        );
    }

    public function test_guest_cart_transfers_to_user_cart_after_login()
    {
        // Create a guest cart with an item
        $guestCart = Cart::factory()->create(['session_id' => 'test-session']);
        CartItem::factory()->create([
            'cart_id' => $guestCart->id,
            'product_id' => $this->product->id,
            'quantity' => 2
        ]);

        // Login the user and trigger cart transfer
        $this->actingAs($this->user);
        $cartService = app(CartService::class);

        // Get the user's cart (this will create one if it doesn't exist)
        $userCart = $cartService->getCurrentCart();

        // Now transfer the guest cart with specific session ID
        $cartService->transferGuestCart('test-session');

        $this->assertNotNull($userCart, 'User cart should exist');

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $this->product->id,
            'quantity' => 2,
            'cart_id' => $userCart->id
        ]);

        // Check if guest cart was deleted
        $this->assertDatabaseMissing('carts', [
            'id' => $guestCart->id
        ]);
    }

    public function test_cart_validation_rules()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 0 // Invalid quantity
            ]);

        $response->assertSessionHasErrors('quantity');

        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 'not-a-number' // Invalid type
            ]);

        $response->assertSessionHasErrors('quantity');
    }


    public function test_cart_preview_shows_empty_after_logout()
    {
        // Login and add items to cart
        $this->actingAs($this->user);

        $this->post(route('cart.add', $this->product), [
            'quantity' => 1
        ]);

        // Verify cart has items before logout
        $response = $this->get(route('shop'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('shop')
            ->has('cart', fn (Assert $cart) => $cart
                ->where('item_count', 1)
                ->has('items', 1)
                ->has('total')
            )
        );

        // Logout
        $this->post(route('logout'));

        // Verify cart is empty after logout
        $response = $this->get(route('shop'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('shop')
            ->has('cart', fn (Assert $cart) => $cart
                ->where('item_count', 0)
                ->where('total', 0)
                ->has('items', 0)
            )
        );
    }

    public function test_cart_operations_disabled_after_logout()
    {
        // Login and add items to cart
        $this->actingAs($this->user);

        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        // Logout
        $this->post(route('logout'));

        // Try to update cart item (should redirect to login)
        $response = $this->patch(route('cart.update', $cartItem), [
            'quantity' => 2
        ]);

        // Verify quantity was not updated in database
        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 2
        ]);

        $response->assertStatus(302);


    }

}

