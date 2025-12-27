"use client";
import React, { useState, useMemo, useEffect } from "react";
import Products from "./Products";
import Filters from "./Filters";
import CommonPageHeader from "../CommonPages/CommonPageHeader";
import { fetchProducts } from "@/utils/api/api";

export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  brand: string;
  gender: string[];
  isNew: boolean;
  rating: number;
  size?: string[];
  color?: string[];
  description?: string;
  reviews?: Review[];
  features?: {
    freeShipping: boolean;
    returns: string;
    warranty: string;
    authentic: boolean;
  };
  shippingInfo?: {
    delivery: string;
    returnPolicy: string;
    securePayment: boolean;
  };
}

const ProductListing: React.FC = () => {
  // State for all products from API
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProductCatalogues, setSelectedProductCatalogues] = useState<
    string[]
  >([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [sortOption, setSortOption] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Fetch products from API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchProducts();

        console.log("API Response:", response); // ✅ Debug log

        // ✅ SAFETY: always convert to array with ID validation
        let productList: Product[] = [];

        if (Array.isArray(response)) {
          productList = response;
        } else if (response && typeof response === "object") {
          // Check common response patterns
          const responseObj = response as Record<string, unknown>;
          if (Array.isArray(responseObj.data)) {
            productList = responseObj.data;
          } else if (Array.isArray(responseObj.products)) {
            productList = responseObj.products;
          } else if (Array.isArray(responseObj.items)) {
            productList = responseObj.items;
          } else if (Array.isArray(responseObj.result)) {
            productList = responseObj.result;
          }
        }

        // ✅ Validate and fix IDs if missing
        productList = productList.map((product, index) => {
          // If product doesn't exist, return empty object
          if (!product || typeof product !== "object") {
            return {
              id: index + 1,
              name: "Unknown Product",
              price: 0,
              image: "/placeholder.jpg",
              images: [],
              category: "Uncategorized",
              brand: "Unknown",
              gender: [],
              isNew: false,
              rating: 0,
            } as Product;
          }

          // If ID is missing, generate one
          if (!product.id || product.id === undefined || product.id === null) {
            console.warn(`Product missing ID at index ${index}:`, product);
            return {
              ...product,
              id: index + 1, // Generate ID
            };
          }

          return product;
        });

        console.log("Processed Products:", productList); // ✅ Debug
        setAllProducts(productList);
      } catch (error) {
        console.error("Error loading products:", error);
        setError("Failed to load products. Please try again.");
        setAllProducts([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Extract unique brands, categories, etc. from fetched products
  const uniqueBrands = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    const brands = allProducts
      .map((p) => p.brand)
      .filter((brand): brand is string => Boolean(brand));
    return [...new Set(brands)].sort();
  }, [allProducts]);

  const uniqueCategories = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    const categories = allProducts
      .map((product) => product.category)
      .filter((category): category is string => Boolean(category));
    return Array.from(new Set(categories)).sort();
  }, [allProducts]);

  const uniqueGenders = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    const allGenders = allProducts.flatMap((product) => product.gender || []);
    return Array.from(new Set(allGenders)).sort();
  }, [allProducts]);

  const uniqueSizes = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];
    const allSizes = allProducts.flatMap((product) => product.size || []);
    return Array.from(new Set(allSizes)).sort();
  }, [allProducts]);

  // Filter logic
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(allProducts)) return [];

    const filtered = allProducts.filter((product) => {
      // Safety check
      if (!product) return false;

      // Price filter
      if (product.price > priceRange) return false;

      // Gender filter
      if (
        selectedGenders.length > 0 &&
        (!product.gender ||
          !selectedGenders.some((g) => product.gender.includes(g)))
      )
        return false;

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
        return false;

      // Size filter
      if (
        selectedSizes.length > 0 &&
        (!product.size || !product.size.some((s) => selectedSizes.includes(s)))
      )
        return false;

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes(product.category)
      )
        return false;

      return true;
    });

    // Sorting
    switch (sortOption) {
      case "price-low":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "newest":
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default sorting (newest first)
        filtered.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return filtered;
  }, [
    allProducts,
    priceRange,
    selectedGenders,
    selectedBrands,
    selectedSizes,
    selectedCategories,
    sortOption,
  ]);

  // Handlers
  const handleGenderChange = (gender: string) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSizeChange = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleProductCatalogueChange = (catalogue: string) => {
    setSelectedProductCatalogues((prev) =>
      prev.includes(catalogue)
        ? prev.filter((c) => c !== catalogue)
        : [...prev, catalogue]
    );
  };

  const handleSubCategoryChange = (subCategory: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((s) => s !== subCategory)
        : [...prev, subCategory]
    );
  };

  const handleSortChange = (option: string) => setSortOption(option);

  const clearAllFilters = () => {
    setPriceRange(10000);
    setSelectedGenders([]);
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedCategories([]);
    setSelectedProductCatalogues([]);
    setSelectedSubCategories([]);
    setSortOption("newest");
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#C4F9FF]">
        <CommonPageHeader title="Products" subtitle="Home - Products" />
        <div className="flex justify-center items-center flex-grow">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-[#C4F9FF]">
        <CommonPageHeader title="Products" subtitle="Home - Products" />
        <div className="flex justify-center items-center flex-grow">
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {error}
            </h3>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No products state
  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-[#C4F9FF]">
        <CommonPageHeader title="Products" subtitle="Home - Products" />
        <div className="flex justify-center items-center flex-grow">
          <div className="text-center p-8 bg-white rounded-xl shadow-md">
            <div className="text-5xl mb-4">😔</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No products available
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Check back later or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#C4F9FF] ">
      <CommonPageHeader title="Products" subtitle="Home - Products" />

      {/* Mobile Filter Toggle */}
      <div className="md:hidden border-b border-gray-200 flex justify-between items-center px-4 sticky top-0 z-20 py-2">
        <h2 className="text-lg font-semibold">All Products</h2>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 bg-black text-white text-sm rounded-lg"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row flex-grow border-t border-gray-300 ">
        {/* Filters */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block w-full md:w-1/4 md:sticky md:top-0 z-10 py-0 bg-[#C4F9FF]`}
        >
          <div className="h-full min-h-screen border-r border-gray-300">
            <Filters
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedGenders={selectedGenders}
              onGenderChange={handleGenderChange}
              selectedBrands={selectedBrands}
              onBrandChange={handleBrandChange}
              selectedSizes={selectedSizes}
              onSizeChange={handleSizeChange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              selectedProductCatalogues={selectedProductCatalogues}
              onProductCatalogueChange={handleProductCatalogueChange}
              selectedSubCategories={selectedSubCategories}
              onSubCategoryChange={handleSubCategoryChange}
              onClearFilters={clearAllFilters}
              // Pass dynamic data to Filters component
              availableBrands={uniqueBrands}
              availableCategories={uniqueCategories}
              availableGenders={uniqueGenders}
              availableSizes={uniqueSizes}
            />
          </div>
        </div>

        {/* Products */}
        <div className="flex-1 bg-gray-50">
          <Products
            products={filteredProducts}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            totalProducts={filteredProducts.length}
            allProductsCount={allProducts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
