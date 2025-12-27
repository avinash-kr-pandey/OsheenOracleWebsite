import axios, { AxiosError, AxiosResponse } from "axios";

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

// Product Interface
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
  reviews?: Review[];
}

export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const products = await fetchData<Product[]>("/products");
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch single product by ID
export const fetchProductById = async (
  id: number | string
): Promise<Product> => {
  try {
    const product = await fetchData<Product>(`/products/${id}`);
    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Search products by name or keyword
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const products = await fetchData<Product[]>("/products/search", {
      q: query,
    });
    return products;
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
    const products = await fetchData<Product[]>("/products/category", {
      category,
    });
    return products;
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
    const products = await fetchData<Product[]>("/products/brand", { brand });
    return products;
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
    const products = await fetchData<Product[]>("/products/featured", {
      limit,
    });
    return products;
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
    const products = await fetchData<Product[]>("/products/new", { limit });
    return products;
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
    const products = await fetchData<Product[]>("/products/price-range", {
      min: minPrice,
      max: maxPrice,
    });
    return products;
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
    const product = await postData<Product>("/products", productData);
    return product;
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
    const product = await putData<Product>(`/products/${id}`, productData);
    return product;
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
    const product = await postData<Product>(
      `/products/${productId}/reviews`,
      reviewData
    );
    return product;
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
