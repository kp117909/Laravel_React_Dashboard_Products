<?php

namespace Tests\Unit\Services;

use Tests\TestCase;
use App\Models\Cart;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use App\Services\CartService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;

class CartServiceTest extends TestCase
{
    use RefreshDatabase;

    private CartService $cartService;
    private User $user;
    private Product $product;

    protected function setUp(): void
    {
        parent::setUp();

        $this->cartService = app(CartService::class);
        $this->user = User::factory()->create();
        $this->product = Product::factory()->create([
            'price' => 99.99
        ]);
    }

    public function test_get_current_cart_creates_new_cart_for_guest()
    {
        $cart = $this->cartService->getCurrentCart();

        $this->assertInstanceOf(Cart::class, $cart);
        $this->assertNull($cart->user_id);
        $this->assertEquals(session()->getId(), $cart->session_id);
        $this->assertEquals('active', $cart->status);
    }

    public function test_get_current_cart_creates_new_cart_for_user()
    {
        Auth::login($this->user);

        $cart = $this->cartService->getCurrentCart();

        $this->assertInstanceOf(Cart::class, $cart);
        $this->assertEquals($this->user->id, $cart->user_id);
        $this->assertEquals('active', $cart->status);
    }

    public function test_add_item_creates_new_cart_item()
    {
        Auth::login($this->user);

        $cartItem = $this->cartService->addItem($this->product, 2);

        $this->assertInstanceOf(CartItem::class, $cartItem);
        $this->assertEquals($this->product->id, $cartItem->product_id);
        $this->assertEquals(2, $cartItem->quantity);
    }

    public function test_add_item_updates_existing_cart_item()
    {
        Auth::login($this->user);

        // Add item first time
        $this->cartService->addItem($this->product, 2);

        // Add same item second time
        $cartItem = $this->cartService->addItem($this->product, 3);

        $this->assertEquals(5, $cartItem->quantity); // 2 + 3
    }

    public function test_update_quantity()
    {
        Auth::login($this->user);

        $cart = $this->cartService->getCurrentCart();
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $updatedItem = $this->cartService->updateQuantity($cartItem, 4);

        $this->assertEquals(4, $updatedItem->quantity);
    }

    public function test_update_quantity_throws_exception_when_zero()
    {
        Auth::login($this->user);

        $cart = $this->cartService->getCurrentCart();
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id,
            'quantity' => 1
        ]);

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Quantity must be greater than 0.');

        $this->cartService->updateQuantity($cartItem, 0);
    }

    public function test_remove_item()
    {
        Auth::login($this->user);

        $cart = $this->cartService->getCurrentCart();
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $this->product->id
        ]);

        $result = $this->cartService->removeItem($cartItem);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id
        ]);
    }

    public function test_clear_cart()
    {
        Auth::login($this->user);

        $cart = $this->cartService->getCurrentCart();
        CartItem::factory()->count(3)->create([
            'cart_id' => $cart->id
        ]);

        $result = $this->cartService->clearCart();

        $this->assertTrue($result);
        $this->assertDatabaseCount('cart_items', 0);
    }

    public function test_get_cart_summary()
    {
        Auth::login($this->user);

        $cart = $this->cartService->getCurrentCart();

        // Add two items
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

        // Refresh the cart to ensure it has the latest data
        $cart->refresh();

        $summary = $this->cartService->getCartSummary();

        $this->assertCount(2, $summary['items']);
        $this->assertEquals(249.97, $summary['total']); // (99.99 * 2) + 49.99
        $this->assertEquals(3, $summary['item_count']); // 2 + 1
    }

    public function test_transfer_guest_cart()
    {
        // Create a guest cart with items
        $guestCart = Cart::factory()->create(['session_id' => 'test-session']);
        CartItem::factory()->create([
            'cart_id' => $guestCart->id,
            'product_id' => $this->product->id,
            'quantity' => 2
        ]);

        // Login user and transfer cart
        Auth::login($this->user);

        // Now transfer the guest cart with specific session ID
        $this->cartService->transferGuestCart('test-session');

        // Get the user's cart after transfer
        $userCart = $this->cartService->getCurrentCart();

        $this->assertNotNull($userCart, 'User cart should exist');

        $this->assertDatabaseHas('cart_items', [
            'cart_id' => $userCart->id,
            'product_id' => $this->product->id,
            'quantity' => 2
        ]);

        // Check if guest cart was deleted
        $this->assertDatabaseMissing('carts', [
            'id' => $guestCart->id
        ]);
    }
}
