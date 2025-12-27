"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  id: string | number; // ✅ Yeh string | number hai
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (id: string | number) => void; // ✅ Yeh bhi string | number karo
  isInWishlist: (id: string | number) => boolean; // ✅ Yeh bhi string | number karo
  clearWishlist: () => void;
  getTotalWishlistItems: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems; // Already in wishlist
      } else {
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (id: string | number) => { // ✅ Yeh change karo
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string | number) => { // ✅ Yeh change karo
    return wishlistItems.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const getTotalWishlistItems = () => {
    return wishlistItems.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        getTotalWishlistItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};