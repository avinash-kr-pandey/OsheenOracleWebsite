"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Product } from "./ProductListing";
import Link from "next/link";

interface ProductsProps {
  products: Product[];
  sortOption: string;
  onSortChange: (option: string) => void;
  totalProducts: number;
  allProductsCount: number;
}

const Products: React.FC<ProductsProps> = ({
  products,
  sortOption,
  onSortChange,
  totalProducts,
  allProductsCount,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // ✅ Initialize with safe products
  useEffect(() => {
    console.log("Products received in Products component:", products);

    // Validate and filter products
    const validProducts = Array.isArray(products)
      ? products.filter(
          (product) =>
            product &&
            typeof product === "object" &&
            product.id !== undefined &&
            product.id !== null
        )
      : [];

    console.log("Valid products count:", validProducts.length);
    setFilteredProducts(validProducts);
  }, [products]);

  // All unique product names (only from valid products)
  const allProductNames = Array.from(
    new Set(filteredProducts.map((item) => item.name).filter(Boolean))
  );

  // Suggestions (max 10)
  const filteredSuggestions = allProductNames
    .filter((name) => name.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 10);

  // Click outside → close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle input typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setSelectedSuggestionIndex(-1);

    // Live filter (show related products as typing)
    const results = filteredProducts.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProducts(results);
  };

  // Handle suggestion click → show only that product
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);

    const results = filteredProducts.filter(
      (item) => item.name.toLowerCase() === suggestion.toLowerCase()
    );
    setFilteredProducts(results);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedSuggestionIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex]);
      } else {
        const results = filteredProducts.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(results);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  // Reset search and show all products
  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredProducts(Array.isArray(products) ? products : []);
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-gray-500 text-xs ml-1">({rating || 0})</span>
    </div>
  );

  return (
    <div className="w-full p-6 bg-[#C4F9FF]">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4 flex-wrap border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <p className="text-gray-600 text-sm">
            Showing{" "}
            <span className="font-semibold">{filteredProducts.length}</span> of{" "}
            <span className="font-semibold">{allProductsCount}</span> products
          </p>

          {searchTerm && (
            <button
              onClick={handleResetSearch}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Search + Sort Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          {/* Search Field */}
          <div ref={searchRef} className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="🔍 Search products..."
              value={searchTerm}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-4 text-sm border border-gray-200 rounded-xl shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
            />

            {/* Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    type="button"
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                      index === selectedSuggestionIndex
                        ? "bg-blue-50 border-blue-200"
                        : ""
                    } ${index === 0 ? "rounded-t-xl" : ""} ${
                      index === filteredSuggestions.length - 1
                        ? "rounded-b-xl"
                        : ""
                    }`}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm">🔍</span>
                      <span className="text-sm text-gray-700">
                        {suggestion}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 md:gap-3 bg-white shadow-sm border border-gray-100 px-3 py-2 rounded-xl hover:shadow-md transition-all duration-300">
            <label
              htmlFor="sort-select"
              className="text-gray-600 text-sm font-medium whitespace-nowrap"
            >
              Sort by:
            </label>
            <div className="relative w-44">
              <select
                id="sort-select"
                value={sortOption}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none w-full px-3 py-2 text-sm bg-white cursor-pointer"
              >
                <option value="newest">🆕 New Arrivals</option>
                <option value="price-low">⬇️ Price: Low to High</option>
                <option value="price-high">⬆️ Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
              </select>
              <svg
                className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {!Array.isArray(filteredProducts) || filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">😔</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            {searchTerm
              ? "No products found for your search"
              : "No products available"}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {searchTerm
              ? "Try a different search term or clear your search."
              : "Try adjusting your filters or check back later."}
          </p>
          {searchTerm && (
            <button
              onClick={handleResetSearch}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((item, index) => {
            // ✅ Final safety check before rendering
            if (!item || !item.id) {
              console.warn(`Invalid product at index ${index}:`, item);
              return null;
            }

            const productId = item.id;

            return (
              <Link
                key={productId}
                href={`/products/${productId}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-64 bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name || "Product"}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute top-3 left-3 flex gap-2">
                    {item.isNew && (
                      <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium">
                        NEW
                      </span>
                    )}
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      20% OFF
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase font-medium mb-1">
                    {item.brand || "Brand"}
                  </p>
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 h-10">
                    {item.name || "Product Name"}
                  </h3>
                  <div className="mb-3">{renderStars(item.rating || 0)}</div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        Rs. {(item.price || 0).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        Rs. {((item.price || 0) * 1.2).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
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
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
