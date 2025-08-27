<?php

namespace Tests\Feature\Cart;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

class CartValidationTest extends TestCase
{
    use RefreshDatabase;

    private User $user;
    private User $otherUser;
    private Product $product;
    private Product $unavailableProduct;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->otherUser = User::factory()->create();

        $category = Category::factory()->create();

        $this->product = Product::factory()->create([
            'name' => 'Test Product',
            'price' => 99.99,
            'is_available' => true,
            'is_published' => true,
            'category_id' => $category->id
        ]);

        $this->unavailableProduct = Product::factory()->create([
            'name' => 'Unavailable Product',
            'price' => 49.99,
            'is_available' => false,
            'is_published' => true,
            'category_id' => $category->id
        ]);
    }

    // ==================== ADD TO CART VALIDATION ====================

    public function test_can_add_unavailable_product_to_cart()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->unavailableProduct), [
                'quantity' => 1
            ]);

        $response->assertSessionHas('success', 'Product added to cart');
    }

    public function test_cannot_add_unpublished_product_to_cart()
    {
        $unpublishedProduct = Product::factory()->create([
            'is_published' => false,
            'is_available' => true
        ]);

        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $unpublishedProduct), [
                'quantity' => 1
            ]);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'This product is not available for purchase.');
    }

    public function test_cannot_add_negative_quantity()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => -1
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_cannot_add_zero_quantity()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 0
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_cannot_add_non_numeric_quantity()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 'not-a-number'
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_can_add_quantity_as_string()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => '5'
            ]);

        $response->assertSessionMissing('errors');
        $response->assertSessionHas('success', 'Product added to cart');
    }

    public function test_cannot_add_quantity_greater_than_maximum()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 1001 // Exceeds max of 1000
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_cannot_add_product_without_quantity()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), []);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_cannot_add_nonexistent_product()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', 99999), [
                'quantity' => 1
            ]);

        $response->assertStatus(404);
    }

    // ==================== UPDATE CART VALIDATION ====================

    public function test_cannot_update_quantity_to_zero()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', $cartItem), [
                'quantity' => 0
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_cannot_update_quantity_to_negative()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', $cartItem), [
                'quantity' => -5
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302); // Redirects on validation error
    }

    public function test_cannot_update_nonexistent_cart_item()
    {
        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', 99999), [
                'quantity' => 5
            ]);

        $response->assertStatus(404);
    }

    public function test_cannot_update_quantity_greater_than_maximum()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', $cartItem), [
                'quantity' => 1001 // Exceeds max of 1000
            ]);

        $response->assertSessionHasErrors('quantity');
        $response->assertStatus(302);
    }

    public function test_can_add_maximum_allowed_quantity()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 1000 // Maximum allowed
            ]);

        $response->assertSessionHas('success', 'Product added to cart');
    }

    public function test_can_update_to_maximum_allowed_quantity()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', $cartItem), [
                'quantity' => 1000 // Maximum allowed
            ]);

        $response->assertSessionHas('success', 'Cart updated');
    }

    // ==================== SECURITY TESTS ====================

    public function test_cannot_access_other_users_cart_items()
    {
        $otherCart = Cart::factory()->create(['user_id' => $this->otherUser->id]);
        $otherCartItem = CartItem::factory()->create([
            'cart_id' => $otherCart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->patch(route('cart.update', $otherCartItem), [
                'quantity' => 5
            ]);

        $response->assertStatus(302);
        $response->assertSessionHas('error');
    }

    public function test_cannot_remove_other_users_cart_items()
    {
        $otherCart = Cart::factory()->create(['user_id' => $this->otherUser->id]);
        $otherCartItem = CartItem::factory()->create([
            'cart_id' => $otherCart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $response = $this->actingAs($this->user)
            ->delete(route('cart.remove', $otherCartItem));

        $response->assertStatus(302);
        $response->assertSessionHas('error');
    }

    public function test_cannot_clear_other_users_cart()
    {
        $otherCart = Cart::factory()->create(['user_id' => $this->otherUser->id]);
        CartItem::factory()->create([
            'cart_id' => $otherCart->id,
            'product_id' => $this->product->id
        ]);

        $response = $this->actingAs($this->user)
            ->post(route('cart.clear'));


        $this->assertDatabaseHas('cart_items', [
            'cart_id' => $otherCart->id
        ]);
    }

    public function test_guest_cannot_access_user_cart_operations()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id
        ]);

        // Guest trying to update cart item
        $response = $this->patch(route('cart.update', $cartItem), [
            'quantity' => 5
        ]);
        $response->assertRedirect('/'); // Redirects to home instead of login

        // Guest trying to remove cart item
        $response = $this->delete(route('cart.remove', $cartItem));
        $response->assertRedirect('/'); // Redirects to home instead of login

        // Guest trying to clear cart
        $response = $this->post(route('cart.clear'));
        $response->assertRedirect('/'); // Redirects to home instead of login
    }

    // ==================== CALCULATION TESTS ====================

    public function test_cart_total_calculation_is_accurate()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);

        // Add items with different prices and quantities
        $product1 = Product::factory()->create(['price' => 100.00]);
        $product2 = Product::factory()->create(['price' => 50.00]);

        CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $product1->id,
            'quantity' => 2 // 200.00
        ]);

        CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $product2->id,
            'quantity' => 3 // 150.00
        ]);

        $response = $this->actingAs($this->user)
            ->get(route('cart.index'));

        $response->assertInertia(fn (Assert $page) =>
            $page->component('cart/index')
                ->has('cart', fn (Assert $cart) => $cart
                    ->has('items')
                    ->has('total')
                    ->has('item_count')
                    ->has('subtotal')
                    ->has('discount_amount')
                    ->has('discount_code')
                    ->has('discount_percentage')
                    ->where('total', 350) // Integer instead of float
                    ->where('item_count', 5) // 2 + 3
                )
        );
    }

    public function test_cart_total_handles_decimal_prices()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);

        $product = Product::factory()->create(['price' => 99.99]);

        CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
            'quantity' => 3
        ]);

        $response = $this->actingAs($this->user)
            ->get(route('cart.index'));

        $response->assertInertia(fn (Assert $page) =>
            $page->component('cart/index')
                ->has('cart', fn (Assert $cart) => $cart
                    ->has('items')
                    ->has('total')
                    ->has('item_count')
                    ->has('subtotal')
                    ->has('discount_amount')
                    ->has('discount_code')
                    ->has('discount_percentage')
                    ->where('total', 299.97) // Rounded to 2 decimal places
                )
        );
    }

    // ==================== EDGE CASES ====================

    public function test_cart_handles_large_quantities()
    {
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 999 // Large but valid quantity (under max)
            ]);

        $response->assertSessionHas('success', 'Product added to cart');

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $this->product->id,
            'quantity' => 999
        ]);
    }

    public function test_cart_handles_duplicate_product_additions()
    {
        // Add product first time
        $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 2
            ]);

        // Add same product again
        $response = $this->actingAs($this->user)
            ->post(route('cart.add', $this->product), [
                'quantity' => 3
            ]);

        $response->assertSessionHas('success', 'Product added to cart');

        // Should have combined quantity
        $this->assertDatabaseHas('cart_items', [
            'product_id' => $this->product->id,
            'quantity' => 5 // 2 + 3
        ]);
    }

    public function test_cart_handles_product_price_changes()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 2
        ]);

        // Change product price
        $this->product->update(['price' => 150.00]);

        $response = $this->actingAs($this->user)
            ->get(route('cart.index'));

        $response->assertInertia(fn (Assert $page) =>
            $page->component('cart/index')
                ->has('cart', fn (Assert $cart) => $cart
                    ->has('items')
                    ->has('total')
                    ->has('subtotal')
                    ->has('discount_amount')
                    ->has('discount_code')
                    ->has('discount_percentage')
                    ->has('item_count')
                    ->where('total', 300) // Integer instead of float
                )
        );
    }

    public function test_cart_handles_deleted_products()
    {
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        // Delete the product
        $this->product->delete();

        $response = $this->actingAs($this->user)
            ->get(route('cart.index'));

        $response->assertOk();
    }
}
