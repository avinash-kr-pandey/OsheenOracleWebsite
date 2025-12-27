// app/cart/page.tsx
"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center py-8 px-4 "
        style={{
          background:
            "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
        }}
      >
        <div className="text-center">
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">🛒</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some products to your cart to see them here!
          </p>
          <Link
            href="/products"
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 pt-32"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium text-sm hover:scale-105 cursor-pointer"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white rounded-2xl p-6 shadow-lg border border-white/50"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg mb-1">
                      {item.name}
                    </h3>

                    {/* Size and Color */}
                    <div className="flex gap-4 text-sm text-gray-600 mb-2">
                      {item.size && <span>Size: {item.size}</span>}
                      {item.color && <span>Color: {item.color}</span>}
                    </div>

                    {/* Price */}
                    <p className="text-xl font-bold text-pink-600 mb-3">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 font-bold text-gray-900 min-w-8 text-center border-l border-r border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors font-medium text-sm cursor-pointer hover:scale-105"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-white/50 sticky top-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({getTotalItems()})</span>
                  <span>Rs. {getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Rs. {(getTotalPrice() * 0.13).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs. {(getTotalPrice() * 1.13).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg mb-4">
                Proceed to Checkout
              </button>

              <Link
                href="/"
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold text-lg text-center block hover:border-pink-400 hover:text-pink-600 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
