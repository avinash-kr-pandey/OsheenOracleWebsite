"use client";

import React, { useState, useEffect } from "react";
import {
  fetchData,
  postData,
  putData,
  deleteData,
  setAuthToken,
} from "@/utils/api/api";
import { toast } from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

// Define TypeScript interfaces based on your backend API
interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // Note: Backend doesn't have name, phone, type, isDefault based on Swagger
}

interface FormData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  // Added for UI only (not sent to backend)
  name?: string;
  phone?: string;
  addressType?: "home" | "work" | "other";
  isDefault?: boolean;
}

interface ApiAddress {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  user?: string;
}

// Proper error interface
interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
  request?: unknown;
  message?: string;
}

const AddressPage = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "India",
    // UI-only fields
    name: "",
    phone: "",
    addressType: "home",
    isDefault: false,
  });

  // Get authentication state
  const { token, isAuthenticated, user } = useAuth();

  // Set auth token when component mounts or token changes
  useEffect(() => {
    console.log("Token in AddressPage:", token ? "Available" : "No token");

    if (token) {
      setAuthToken(token);
      console.log("Auth token set successfully");
    }
  }, [token]);

  // Fetch addresses when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      console.log("Fetching addresses for user:", user?.email);
      fetchAddresses();
    }
  }, [isAuthenticated, token, user]);

  const fetchAddresses = async () => {
    if (!isAuthenticated || !token) {
      console.warn("Not authenticated, skipping address fetch");
      toast.error("Please login to view addresses");
      return;
    }

    try {
      setLoading(true);
      console.log("Making API request to /addresses...");

      // Make API call
      const response = await fetchData("/addresses");
      console.log("API Response received:", response);

      if (response && Array.isArray(response)) {
        // Transform API response to match our interface
        const formattedAddresses = response.map((addr: ApiAddress) => ({
          id: addr._id,
          street: addr.street || "",
          city: addr.city || "",
          state: addr.state || "",
          postalCode: addr.postalCode || "",
          country: addr.country || "India",
        }));

        console.log("Formatted addresses:", formattedAddresses);
        setAddresses(formattedAddresses);
        toast.success(`Loaded ${formattedAddresses.length} address(es)`);
      } else {
        console.warn("Unexpected response format:", response);
        toast.error("No addresses found or invalid response");
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      const err = error as ApiError;

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (err.response?.status === 403) {
        toast.error("You don't have permission to view addresses");
      } else if (err.response?.status === 404) {
        toast.error("Addresses endpoint not found");
      } else if (err.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("Failed to load addresses");
      }

      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check authentication
    if (!isAuthenticated || !token) {
      toast.error("Please login to save address");
      return;
    }

    // Form validation for backend required fields
    if (
      !formData.street.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.postalCode.trim() ||
      !formData.country.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Prepare data for API - ONLY send what backend expects
   const apiData = {
     street: formData.street,
     city: formData.city,
     state: formData.state,
     postalCode: formData.postalCode,
     country: formData.country,
     type: formData.addressType || "home", // ✅ REQUIRED FIELD
   };

      console.log("Submitting address data to backend:", apiData);

      if (editingAddress) {
        // Update existing address
        await putData(`/addresses/${editingAddress.id}`, apiData);
        toast.success("Address updated successfully!");
      } else {
        // Add new address
        await postData("/addresses", apiData);
        toast.success("Address added successfully!");
      }

      fetchAddresses(); // Refresh list
      resetForm();
    } catch (error) {
      console.error("Error saving address:", error);
      const err = error as ApiError;

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else if (err.response?.status === 400) {
        const errorMsg = err.response.data?.message || "Invalid address data";
        toast.error(`Validation error: ${errorMsg}`);
      } else {
        toast.error(
          editingAddress ? "Failed to update address" : "Failed to add address"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
      name: "",
      phone: "",
      addressType: "home",
      isDefault: false,
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      // UI-only fields with defaults
      name: "",
      phone: "",
      addressType: "home",
      isDefault: false,
    });
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!isAuthenticated || !token) {
      toast.error("Please login to delete address");
      return;
    }

    try {
      await deleteData(`/addresses/${id}`);
      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully!");
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting address:", error);
      const err = error as ApiError;

      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to delete address");
      }
    }
  };

  // Remove setAsDefault function since backend doesn't support it
  const getAddressTypeIcon = (type: "home" | "work" | "other"): string => {
    switch (type) {
      case "home":
        return "🏠";
      case "work":
        return "💼";
      case "other":
        return "📍";
      default:
        return "📍";
    }
  };

  const handleAddressTypeSelect = (type: "home" | "work" | "other") => {
    setFormData((prev) => ({ ...prev, addressType: type }));
  };

  // Show loading state
  if (loading && addresses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 pt-30 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading addresses...</p>
        </div>
      </div>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 pt-30 pb-12 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-pink-600">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please login to view and manage your addresses
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 pt-30 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header with Animation */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-4">
            My Addresses
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto text-lg">
            Manage your delivery addresses for faster checkout and order
            tracking
          </p>
        </div>

        {/* Add New Address Button */}
        <div className="flex justify-end mb-8 animate-slide-up">
          <button
            onClick={() => setShowAddForm(true)}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Address
          </button>
        </div>

        {/* Debug Info */}
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          <p>
            <strong>Debug Info:</strong> User: {user?.email}, Authenticated:{" "}
            {isAuthenticated ? "Yes" : "No"}, Token:{" "}
            {token ? "Present" : "Missing"}
          </p>
          <p>Total Addresses: {addresses.length}</p>
        </div>

        {/* Add/Edit Address Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {editingAddress ? "Edit Address" : "Add New Address"}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Note: Name and Phone are UI-only, not sent to backend */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name (Optional)
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                      placeholder="Enter your full name (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                      placeholder="+91 98765 43210 (optional)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                      placeholder="House no, Street, Area"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                        placeholder="PIN Code"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type (UI Only)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["home", "work", "other"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => handleAddressTypeSelect(type)}
                          disabled={loading}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 disabled:opacity-50 ${
                            formData.addressType === type
                              ? `border-pink-500 bg-pink-50 text-pink-700`
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <span className="block text-lg mb-1">
                            {getAddressTypeIcon(type)}
                          </span>
                          <span className="block text-sm font-medium capitalize">
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Note: isDefault is UI-only, not sent to backend */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded disabled:opacity-50"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Set as default address (UI Only)
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={resetForm}
                      disabled={loading}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                    >
                      {loading
                        ? "Saving..."
                        : editingAddress
                        ? "Update Address"
                        : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-scale-in">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 011.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Delete Address?
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this address? This action
                  cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {addresses.map((address, index) => (
            <div
              key={address.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2 animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📍</span>
                    <span className="text-sm font-medium text-gray-600 capitalize">
                      Address
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-pink-500 hover:bg-pink-50 rounded-lg transition-colors duration-300"
                      title="Edit address"
                      disabled={loading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(address.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      title="Delete address"
                      disabled={loading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Contact Info - UI only since backend doesn't have name/phone */}
                {formData.name && (
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-800">
                      {formData.name}
                    </h3>
                    {formData.phone && (
                      <p className="text-gray-600">{formData.phone}</p>
                    )}
                  </div>
                )}

                {/* Address Details */}
                <div className="text-gray-600 mb-6 space-y-1">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.postalCode}
                  </p>
                  <p>{address.country}</p>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-pink-50 text-pink-600 rounded-xl font-medium hover:bg-pink-100 transition-all duration-300">
                  Deliver to this Address
                </button>
              </div>
            </div>
          ))}

          {/* Empty State Card for Adding New Address */}
          <div
            onClick={() => !loading && setShowAddForm(true)}
            className="bg-gradient-to-br from-pink-50 to-amber-50 rounded-2xl border-2 border-dashed border-pink-300 overflow-hidden flex flex-col items-center justify-center p-8 text-center transition-all duration-500 hover:border-pink-400 hover:shadow-lg cursor-pointer transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: `${addresses.length * 100}ms` }}
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-400 to-amber-400 flex items-center justify-center mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add New Address
            </h3>
            <p className="text-gray-600 max-w-xs">
              Save a new delivery address for faster checkout
            </p>
          </div>
        </div>

        {/* Empty State */}
        {addresses.length === 0 && !showAddForm && !loading && (
          <div className="text-center py-16 animate-fade-in">
            <div className="w-32 h-32 bg-gradient-to-r from-pink-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-pink-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No Addresses Yet
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven&rsquo;t added any delivery addresses yet. Add your first
              address to get started with faster checkout.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-medium py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Your First Address
            </button>
          </div>
        )}
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddressPage;
