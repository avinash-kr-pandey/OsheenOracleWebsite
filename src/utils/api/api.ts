// src/utils/api/api.ts - FINAL VERSION
import axios, { AxiosError, AxiosResponse } from "axios";
import { Product, Review, isProduct, normalizeProduct } from "@/types/product";

const API_BASE_URL = "https://osheenoraclebackend-1.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Set token dynamically
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/* =======================
   GET
======================= */
export const fetchData = async <T = unknown>(
  endpoint: string,
  params?: object,
  noCache: boolean = true
): Promise<T> => {
  try {
    const headers = noCache
      ? {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        }
      : undefined;

    const response: AxiosResponse<T> = await api.get(endpoint, {
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      `GET Error (${endpoint}):`,
      err.response?.data || err.message
    );
    throw err;
  }
};

/* =======================
   POST
======================= */
export const postData = async <T = unknown>(
  endpoint: string,
  data: object | FormData
): Promise<T> => {
  try {
    const headers =
      data instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined;

    const response: AxiosResponse<T> = await api.post(endpoint, data, {
      headers,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      `POST Error (${endpoint}):`,
      err.response?.data || err.message
    );
    throw err;
  }
};

/* =======================
   PUT
======================= */
export const putData = async <T = unknown>(
  endpoint: string,
  data: object
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      `PUT Error (${endpoint}):`,
      err.response?.data || err.message
    );
    throw err;
  }
};

/* =======================
   DELETE
======================= */
export const deleteData = async <T = unknown>(endpoint: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      `DELETE Error (${endpoint}):`,
      err.response?.data || err.message
    );
    throw err;
  }
};

/* =======================
   Universal API Request
======================= */
export const apiRequest = async <T = unknown>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: object | FormData,
  params?: object,
  noCache: boolean = true
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};

    if (method === "GET" && noCache) {
      headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
      headers["Pragma"] = "no-cache";
      headers["Expires"] = "0";
    }

    if (data instanceof FormData) {
      headers["Content-Type"] = "multipart/form-data";
    }

    const response: AxiosResponse<T> = await api({
      url: endpoint,
      method,
      data,
      params,
      headers,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    console.error(
      `${method} Error on ${endpoint}:`,
      err.response?.data || err.message
    );
    throw err;
  }
};

/* =======================
   PRODUCT-SPECIFIC APIs
======================= */

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log("🔍 Fetching products from API...");

    const response = await fetchData<unknown>("/products");
    console.log("🔍 API Response type:", typeof response);

    if (Array.isArray(response)) {
      console.log("✅ Products received as array");
      // Normalize each product
      return response.map(normalizeProduct);
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, unknown>;
      
      let productsArray: any[] = [];
      
      // Check for common response formats
      if (Array.isArray(responseObj.data)) {
        console.log("✅ Products found in response.data");
        productsArray = responseObj.data;
      } else if (Array.isArray(responseObj.products)) {
        console.log("✅ Products found in response.products");
        productsArray = responseObj.products;
      } else if (Array.isArray(responseObj.items)) {
        console.log("✅ Products found in response.items");
        productsArray = responseObj.items;
      } else if (Array.isArray(responseObj.result)) {
        console.log("✅ Products found in response.result");
        productsArray = responseObj.result;
      } else {
        console.warn("⚠️ Unexpected response format:", response);
        return [];
      }
      
      // Normalize all products
      return productsArray.map(normalizeProduct);
    }

    console.error("❌ Invalid response format");
    return [];
  } catch (error: unknown) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};

// Fetch product by ID
export const fetchProductById = async (
  id: number | string
): Promise<Product> => {
  try {
    const _id = typeof id === "string" ? id : id.toString();
    console.log("🔄 Fetching product with ID:", _id);
    
    // Fetch data
    const response = await fetchData<any>(`/products/${_id}`);
    console.log("🔍 Full API Response:", response);
    
    // Extract product data - handle different response structures
    let productData;
    if (response && typeof response === 'object') {
      // Check for nested product data
      if (response.data && typeof response.data === 'object') {
        productData = response.data;
      } else if (response.product && typeof response.product === 'object') {
        productData = response.product;
      } else if (response.item && typeof response.item === 'object') {
        productData = response.item;
      } else if (response.result && typeof response.result === 'object') {
        productData = response.result;
      } else {
        // Use response directly
        productData = response;
      }
    } else {
      productData = response;
    }
    
    console.log("📦 Extracted product data:", productData);
    
    if (!productData) {
      console.error("❌ No product data in response");
      throw new Error("Product data not found in API response");
    }
    
    // Normalize the product data
    const product = normalizeProduct(productData);
    
    // Validate with isProduct type guard
    if (!isProduct(product)) {
      console.error("❌ Invalid product data structure:", product);
      throw new Error("Invalid product data structure received");
    }
    
    console.log("✅ Final product object:", {
      _id: product._id,
      id: product.id,
      name: product.name,
      price: product.price
    });
    
    return product;
  } catch (error) {
    console.error(`❌ Error fetching product ${id}:`, error);
    throw error;
  }
};

// Search products by name or keyword
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetchData<any>("/products/search", { q: query });
    
    let productsArray: any[] = [];
    if (Array.isArray(response)) {
      productsArray = response;
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, any>;
      if (Array.isArray(responseObj.data)) {
        productsArray = responseObj.data;
      } else if (Array.isArray(responseObj.products)) {
        productsArray = responseObj.products;
      } else if (Array.isArray(responseObj.items)) {
        productsArray = responseObj.items;
      } else if (Array.isArray(responseObj.result)) {
        productsArray = responseObj.result;
      }
    }
    
    return productsArray.map(normalizeProduct);
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    throw error;
  }
};

// Get products by category
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await fetchData<any>("/products/category", { category });
    
    let productsArray: any[] = [];
    if (Array.isArray(response)) {
      productsArray = response;
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, any>;
      if (Array.isArray(responseObj.data)) {
        productsArray = responseObj.data;
      } else if (Array.isArray(responseObj.products)) {
        productsArray = responseObj.products;
      } else if (Array.isArray(responseObj.items)) {
        productsArray = responseObj.items;
      }
    }
    
    return productsArray.map(normalizeProduct);
  } catch (error) {
    console.error(`Error fetching products by category ${category}:`, error);
    throw error;
  }
};

// Get products by brand
export const fetchProductsByBrand = async (
  brand: string
): Promise<Product[]> => {
  try {
    const response = await fetchData<any>("/products/brand", { brand });
    
    let productsArray: any[] = [];
    if (Array.isArray(response)) {
      productsArray = response;
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, any>;
      if (Array.isArray(responseObj.data)) {
        productsArray = responseObj.data;
      } else if (Array.isArray(responseObj.products)) {
        productsArray = responseObj.products;
      }
    }
    
    return productsArray.map(normalizeProduct);
  } catch (error) {
    console.error(`Error fetching products by brand ${brand}:`, error);
    throw error;
  }
};

// Get featured products
export const fetchFeaturedProducts = async (
  limit: number = 10
): Promise<Product[]> => {
  try {
    const response = await fetchData<any>("/products/featured", { limit });
    
    let productsArray: any[] = [];
    if (Array.isArray(response)) {
      productsArray = response;
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, any>;
      if (Array.isArray(responseObj.data)) {
        productsArray = responseObj.data;
      } else if (Array.isArray(responseObj.products)) {
        productsArray = responseObj.products;
      }
    }
    
    return productsArray.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
};

// Get new arrivals
export const fetchNewArrivals = async (
  limit: number = 10
): Promise<Product[]> => {
  try {
    const response = await fetchData<any>("/products/new", { limit });
    
    let productsArray: any[] = [];
    if (Array.isArray(response)) {
      productsArray = response;
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, any>;
      if (Array.isArray(responseObj.data)) {
        productsArray = responseObj.data;
      } else if (Array.isArray(responseObj.products)) {
        productsArray = responseObj.products;
      }
    }
    
    return productsArray.map(normalizeProduct);
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    throw error;
  }
};

// Get products by price range
export const fetchProductsByPriceRange = async (
  minPrice: number,
  maxPrice: number
): Promise<Product[]> => {
  try {
    const response = await fetchData<any>("/products/price-range", {
      min: minPrice,
      max: maxPrice,
    });
    
    let productsArray: any[] = [];
    if (Array.isArray(response)) {
      productsArray = response;
    } else if (response && typeof response === "object") {
      const responseObj = response as Record<string, any>;
      if (Array.isArray(responseObj.data)) {
        productsArray = responseObj.data;
      }
    }
    
    return productsArray.map(normalizeProduct);
  } catch (error) {
    console.error(
      `Error fetching products in price range ${minPrice}-${maxPrice}:`,
      error
    );
    throw error;
  }
};

// Create new product (admin only)
export const createProduct = async (
  productData: Partial<Product>
): Promise<Product> => {
  try {
    const response = await postData<any>("/products", productData);
    
    let createdProduct;
    if (response && typeof response === 'object') {
      if (response.data && typeof response.data === 'object') {
        createdProduct = response.data;
      } else if (response.product && typeof response.product === 'object') {
        createdProduct = response.product;
      } else {
        createdProduct = response;
      }
    }
    
    return normalizeProduct(createdProduct || response);
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Update product (admin only)
export const updateProduct = async (
  id: number | string,
  productData: Partial<Product>
): Promise<Product> => {
  try {
    const response = await putData<any>(`/products/${id}`, productData);
    
    let updatedProduct;
    if (response && typeof response === 'object') {
      if (response.data && typeof response.data === 'object') {
        updatedProduct = response.data;
      } else if (response.product && typeof response.product === 'object') {
        updatedProduct = response.product;
      } else {
        updatedProduct = response;
      }
    }
    
    return normalizeProduct(updatedProduct || response);
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
};

// Delete product (admin only)
export const deleteProduct = async (id: number | string): Promise<void> => {
  try {
    await deleteData(`/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};

// Add review to product
export const addProductReview = async (
  productId: number | string,
  reviewData: {
    name: string;
    comment: string;
    rating: number;
    avatar?: string;
  }
): Promise<Product> => {
  try {
    const response = await postData<any>(
      `/products/${productId}/reviews`,
      reviewData
    );
    
    let updatedProduct;
    if (response && typeof response === 'object') {
      if (response.data && typeof response.data === 'object') {
        updatedProduct = response.data;
      } else if (response.product && typeof response.product === 'object') {
        updatedProduct = response.product;
      } else {
        updatedProduct = response;
      }
    }
    
    return normalizeProduct(updatedProduct || response);
  } catch (error) {
    console.error(`Error adding review to product ${productId}:`, error);
    throw error;
  }
};

// Get product statistics (admin only)
export const getProductStats = async (): Promise<{
  totalProducts: number;
  totalCategories: number;
  totalBrands: number;
  averagePrice: number;
  averageRating: number;
}> => {
  try {
    const stats = await fetchData<{
      totalProducts: number;
      totalCategories: number;
      totalBrands: number;
      averagePrice: number;
      averageRating: number;
    }>("/products/stats");
    return stats;
  } catch (error) {
    console.error("Error fetching product stats:", error);
    throw error;
  }
};

// Get unique values for filters
export const getFilterOptions = async (): Promise<{
  brands: string[];
  categories: string[];
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
}> => {
  try {
    const options = await fetchData<{
      brands: string[];
      categories: string[];
      sizes: string[];
      colors: string[];
      minPrice: number;
      maxPrice: number;
    }>("/products/filter-options");
    return options;
  } catch (error) {
    console.error("Error fetching filter options:", error);
    throw error;
  }
};

export default api;