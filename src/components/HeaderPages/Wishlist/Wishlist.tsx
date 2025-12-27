"use client";
import React from "react";
import Image from "next/image";
import {
  FaHeartBroken,
  FaShoppingCart,
  FaTrash,
  FaHeart,
} from "react-icons/fa";
import { useWishlist, WishlistItem } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = (id: number) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item: WishlistItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    alert(`${item.name} added to cart 🛒`);
  };

  const handleViewDetails = (name: string) => {
    alert(`Viewing details of ${name}`);
  };

  return (
    <div className="pt-32 min-h-screen  py-10 px-4 sm:px-10"
    
     style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}>
      <h1 className="text-3xl font-bold text-center mb-10 text-pink-700">
        My Wishlist <FaHeart className="inline ml-2 text-pink-600" />
      </h1>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row justify-between items-center border-b border-pink-100 pb-5 sm:pb-6"
            >
              <div className="flex items-center space-x-4 w-full sm:w-auto">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-yellow-400"
                />
                <div>
                  <h2 className="text-lg font-semibold text-pink-800">
                    {item.name}
                  </h2>
                  <p className="text-pink-600 font-semibold mt-1">
                    ₹{item.price}
                  </p>
                  <p
                    className={`text-sm mt-1 ${
                      item.inStock ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-4 sm:mt-0">
                <button
                  onClick={() => handleViewDetails(item.name)}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl text-sm font-semibold shadow-md hover:scale-105 transition-all"
                >
                  View
                </button>
                <button
                  disabled={!item.inStock}
                  onClick={() => handleAddToCart(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition-all ${
                    item.inStock
                      ? "bg-pink-600 hover:bg-pink-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <FaShoppingCart className="inline mr-1" />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-xl text-sm shadow-md transition-all"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-16">
            <FaHeartBroken className="text-4xl mx-auto mb-3 text-pink-400" />
            <p className="text-lg">Your wishlist is empty 💔</p>
            <button 
              onClick={() => window.location.href = "/products"}
              className="mt-5 bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 shadow-md transition-all"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;