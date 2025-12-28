"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FaHeartBroken,
  FaShoppingCart,
  FaTrash,
  FaHeart,
} from "react-icons/fa";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";

const Wishlist: React.FC = () => {
  // ✅ Type the wishlist items as Product[]
  const { wishlistItems, removeFromWishlist } = useWishlist() as unknown as {
    wishlistItems: Product[];
    removeFromWishlist: (id: string) => void;
  };

  const { addToCart, cartItems } = useCart();
  const router = useRouter();

  const getSafeProductId = (item: Product): string => {
    if (item._id) {
      return String(item._id);
    } else if (item.id) {
      return String(item.id);
    }

    return `wishlist-${Math.random().toString(36).substr(2, 9)}`;
  };

  // ✅ Handle remove from wishlist
  const handleRemove = (item: Product) => {
    const id = getSafeProductId(item);
    removeFromWishlist(id);
  };

  // ✅ Check if item is already in cart
  const isInCart = (item: Product): boolean => {
    const itemId = getSafeProductId(item);

    return cartItems.some((cartItem) => {
      const cartItemId = String((cartItem as any).id || "");
      return cartItemId === itemId;
    });
  };

  // ✅ Handle add to cart
  const handleAddToCart = (item: Product) => {
    if (isInCart(item)) {
      alert(`${item.name} is already in your cart! 🛒`);
      router.push("/cart");
      return;
    }

    const itemId = getSafeProductId(item);
    
    addToCart({
      id: itemId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      size: item.size?.[0],
      color: item.color?.[0],
    });
    alert(`${item.name} added to cart 🛒`);
  };

  // ✅ Handle view details
  const handleViewDetails = (item: Product) => {
    const itemId = getSafeProductId(item);
    router.push(`/products/${itemId}`);
  };

  // ✅ Handle remove with confirmation
  const handleRemoveWithAlert = (item: Product) => {
    if (window.confirm(`Remove "${item.name}" from wishlist?`)) {
      handleRemove(item);
      alert(`${item.name} removed from wishlist ❤️`);
    }
  };

  // ✅ Calculate totals
  const cartItemCount = cartItems.length;
  const totalWishlistValue = wishlistItems.reduce(
    (total, item) => total + (item.price || 0),
    0
  );
  const inStockCount = wishlistItems.filter(
    (item) => item.inStock !== false
  ).length;
  const inCartCount = wishlistItems.filter((item) => isInCart(item)).length;

  // ✅ Render stars function
  const renderStars = (rating: number) => {
    const safeRating = rating ?? 0;
    return (
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <span className="text-yellow-500">★</span>
        <span className="font-medium">{safeRating.toFixed(1)}/5</span>
      </div>
    );
  };

  return (
    <div
      className="pt-32 min-h-screen py-10 px-4 sm:px-10"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 flex-wrap border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-pink-700 flex items-center gap-2">
            <FaHeart className="text-pink-600" />
            My Wishlist
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Showing{" "}
            <span className="font-semibold">{wishlistItems.length}</span> items
            • Total value:{" "}
            <span className="font-semibold">
              ₹{totalWishlistValue.toFixed(2)}
            </span>
          </p>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => router.push("/cart")}
          className="relative px-5 py-3 bg-pink-600 text-white rounded-xl font-semibold shadow-md hover:bg-pink-700 transition-all flex items-center gap-2"
        >
          <FaShoppingCart />
          View Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartItemCount > 9 ? "9+" : cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto">
        {wishlistItems.length > 0 ? (
          <div className="bg-white shadow-lg rounded-2xl p-6">
            {/* Summary Stats */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Status:</span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {inStockCount} in stock
                  </span>
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {inCartCount} in cart
                  </span>
                  <span className="text-sm bg-pink-100 text-pink-700 px-3 py-1 rounded-full">
                    {wishlistItems.length - inCartCount} not in cart
                  </span>
                </div>
              </div>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {wishlistItems.map((item, index) => {
                const itemInCart = isInCart(item);
                const productId = getSafeProductId(item);
                
                // ✅ FIXED: Products component की तरह calculation
                const originalPrice = item.originalPrice || 0;
                const sellingPrice = item.price || 0;

                // ✅ FIXED: Check if originalPrice actually exists and is greater than 0
                const discountPercent = 
                  originalPrice > 0 && 
                  originalPrice > sellingPrice && 
                  originalPrice > 0
                    ? Math.round(
                        ((originalPrice - sellingPrice) / originalPrice) * 100
                      )
                    : 0;

                console.log("check discountPercent", discountPercent);
                console.log("check originalPrice", originalPrice);
                console.log("check sellingPrice", sellingPrice);
                console.log("check item.originalPrice", item.originalPrice);
                console.log("check item:", {
                  name: item.name,
                  hasOriginalPrice: !!item.originalPrice,
                  originalPrice: item.originalPrice,
                  price: item.price
                });

                return (
                  <div
                    key={`${productId}-${index}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 p-4"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Product Image */}
                      <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-xl overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.jpg"}
                          alt={item.name || "Product"}
                          fill
                          sizes="(max-width: 640px) 100vw, 128px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {item.isNew && (
                            <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium">
                              NEW
                            </span>
                          )}
                          {/* ✅ Only show discount badge if there's actually a discount */}
                          {discountPercent > 0 && originalPrice > 0 && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                              {discountPercent}% OFF
                            </span>
                          )}
                          {item.inStock === false && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                              OUT OF STOCK
                            </span>
                          )}
                          {itemInCart && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                              IN CART
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1">
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 uppercase font-medium">
                            {item.brand || "Brand"}
                          </p>
                          <h3 className="font-medium text-gray-900 text-base mb-1">
                            {item.name || "Product Name"}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center gap-2 mb-2">
                            {renderStars(item.rating || 0)}
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-3">
                            <span className="text-lg font-bold text-gray-900">
                              ₹{(item.price || 0).toFixed(2)}
                            </span>
                            {/* ✅ Only show original price if it actually exists and is greater than current price */}
                            {item.originalPrice && 
                             item.originalPrice > 0 && 
                             item.originalPrice > (item.price || 0) && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{item.originalPrice.toFixed(2)}
                                </span>
                              )}
                          </div>

                          {/* Category & Gender Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.category && (
                              <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded">
                                {item.category}
                              </span>
                            )}
                            {Array.isArray(item.gender) &&
                              item.gender.map((g) => (
                                <span
                                  key={g}
                                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                >
                                  {g}
                                </span>
                              ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {/* View Details Button */}
                          <button
                            onClick={() => handleViewDetails(item)}
                            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl text-sm font-semibold shadow-md hover:scale-105 transition-all flex items-center gap-2"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View Details
                          </button>

                          {/* Add to Cart Button */}
                          <button
                            disabled={item.inStock === false || itemInCart}
                            onClick={() => handleAddToCart(item)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all flex items-center gap-2 ${
                              itemInCart
                                ? "bg-green-500 text-white cursor-not-allowed"
                                : item.inStock !== false
                                ? "bg-pink-600 hover:bg-pink-700 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {itemInCart ? (
                              <>
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                                Added to Cart
                              </>
                            ) : (
                              <>
                                <FaShoppingCart className="w-4 h-4" />
                                Add to Cart
                              </>
                            )}
                          </button>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveWithAlert(item)}
                            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl text-sm font-semibold shadow-md transition-all flex items-center gap-2"
                            title="Remove from wishlist"
                          >
                            <FaTrash className="w-4 h-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Empty State
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="text-5xl mb-4">💔</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Add items you love to your wishlist for easy access later!
            </p>
            <button
              onClick={() => router.push("/products")}
              className="px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold shadow-md hover:bg-pink-700 transition-all flex items-center gap-2 mx-auto"
            >
              <FaShoppingCart className="inline" />
              Browse Products
            </button>
          </div>
        )}

        {/* Footer Actions */}
        {wishlistItems.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">
              <p>
                <span className="font-semibold">{wishlistItems.length}</span>{" "}
                items •{" "}
                <span className="font-semibold">
                  ₹{totalWishlistValue.toFixed(2)}
                </span>{" "}
                total value
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push("/products")}
                className="px-5 py-2 border-2 border-pink-500 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-all"
              >
                Continue Shopping
              </button>

              <button
                onClick={() => router.push("/cart")}
                className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition-all"
              >
                Go to Cart ({cartItemCount})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;