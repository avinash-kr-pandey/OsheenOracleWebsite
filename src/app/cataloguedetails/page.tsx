"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodiacData } from "@/utils/AstroData";
import CommonPageHeader from "@/components/CommonPages/CommonPageHeader";

// Updated Types to match your actual data structure
interface Zodiac {
  id: number; // Changed from string to number
  name: string;
  description: string;
  image: string;
  category?: string;
  rating?: number;
  price?: number;
  // Include other properties from your actual data if needed
  date?: string;
  traits?: string[];
  element?: string;
  planet?: string;
  symbol?: string;
  luckyColor?: string;
  strengths?: string[];
  challenges?: string[];
}

interface FilterState {
  category: string;
  minRating: number;
  sortBy: string;
}

const CataloguePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    minRating: 0,
    sortBy: "name",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();

  // Enhanced zodiac data with additional properties - FIXED TYPE ISSUE
  const enhancedZodiacData: Zodiac[] = zodiacData.map((zodiac, index) => ({
    ...zodiac, // This now includes all properties from your original data
    category: ["Love", "Career", "Personal", "Spiritual"][index % 4],
    rating: Math.random() * 2 + 3, // Random rating between 3-5
    price: Math.floor(Math.random() * 100) + 50, // Random price between 50-150
  }));

  // Get unique categories
  const categories = [
    "all",
    ...new Set(enhancedZodiacData.map((item) => item.category!)),
  ];

  // Filter and search logic
  const filteredData = enhancedZodiacData
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (item) => filters.category === "all" || item.category === filters.category
    )
    .filter((item) => item.rating! >= filters.minRating)
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating! - a.rating!;
        case "price-low":
          return a.price! - b.price!;
        case "price-high":
          return b.price! - a.price!;
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const handleFilterChange = (
    key: keyof FilterState,
    value: string | number
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: "all",
      minRating: 0,
      sortBy: "name",
    });
    setSearchTerm("");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : star === Math.ceil(rating) && rating % 1 > 0
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  // Update the booking route to handle number ID
  const handleBookNow = (zodiacId: number) => {
    router.push(`/booking/${zodiacId}`);
  };

  return (
    <div>
      <CommonPageHeader
        title="Astrology Catalogue"
        subtitle="Discover personalized astrological guidance tailored to your journey. Explore our comprehensive collection of readings and services."
      />
      <div className="min-h-screen pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search Input */}
              <div className="relative flex-1 w-full lg:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Sort Select */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white transition-all"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                {/* Filter Toggle Button */}
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <Filter className="w-5 h-5" />
                  Filters
                  {(filters.category !== "all" || filters.minRating > 0) && (
                    <span className="bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {
                        [
                          filters.category !== "all",
                          filters.minRating > 0,
                        ].filter(Boolean).length
                      }
                    </span>
                  )}
                </button>

                {/* Clear Filters */}
                {(searchTerm ||
                  filters.category !== "all" ||
                  filters.minRating > 0) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-3 text-gray-600 hover:text-gray-800 transition-all underline"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Expanded Filters */}
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() =>
                            handleFilterChange("category", category)
                          }
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filters.category === category
                              ? "bg-purple-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Minimum Rating
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            handleFilterChange("minRating", rating)
                          }
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filters.minRating === rating
                              ? "bg-purple-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                          {rating === 0 ? "Any" : `${rating}+ Stars`}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <p
              className="text-gray-600"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Showing {filteredData.length} of {enhancedZodiacData.length}{" "}
              readings
            </p>
          </motion.div>

          {/* Catalogue Grid */}
          {paginatedData.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              {paginatedData.map((zodiac, index) => (
                <motion.div
                  key={`${zodiac.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={zodiac.image}
                      alt={zodiac.name}
                      fill
                      className="object-cover transform transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {zodiac.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div>
                      <h3
                        className="text-xl font-semibold text-[#3D2E4F] mb-2"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        {zodiac.name}
                      </h3>

                      <div className="flex items-center justify-between mb-3">
                        {renderStars(zodiac.rating!)}
                        <span className="text-lg font-bold text-purple-600">
                          ${zodiac.price}
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {zodiac.description}
                      </p>
                    </div>

                    {/* Book Now button pinned to bottom */}
                    <button
                      onClick={() => handleBookNow(zodiac.id)}
                      className="mt-auto w-full bg-black text-white font-medium py-3 px-6 rounded-xl hover:bg-gray-800 transition-all cursor-pointer text-center"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      Book Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No readings found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search or filters to find what you&rsquo;re
                looking for.
              </p>
              <button
                onClick={clearFilters}
                className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-all"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                Clear All Filters
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${
                        currentPage === page
                          ? "bg-purple-500 text-white"
                          : "border border-gray-200 hover:bg-gray-50"
                      }`}
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CataloguePage;
