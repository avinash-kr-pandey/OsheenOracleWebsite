"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { fetchData } from "@/utils/api/api";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define TypeScript interfaces
interface Order {
  id: number;
  productName: string;
  price: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  image: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  discount: string;
}

interface Address {
  id: number;
  type: string;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface PaymentMethod {
  id: number;
  type: string;
  name: string;
  details: string;
  isDefault: boolean;
}

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const { user, isAuthenticated, updateUser } = useAuth();
  const router = useRouter();

  // Form state for editing
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dateOfBirth: user?.dateOfBirth || "",
  });

  // Load user data on component mount
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        dateOfBirth: user.dateOfBirth || "",
      });
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch orders
      const ordersData = await fetchData("/orders");
      if (ordersData && Array.isArray(ordersData.data)) {
        setOrders(ordersData.data);
      } else {
        setOrders([]);
      }

      // Fetch addresses
      const addressesData = await fetchData("/addresses");
      if (addressesData && Array.isArray(addressesData.data)) {
        setAddresses(addressesData.data);
      } else {
        setAddresses([]);
      }

      // For wishlist and payment methods, we'll use mock data for now
      // You can integrate APIs when available
      setPaymentMethods([
        {
          id: 1,
          type: "Visa",
          name: "Visa Card",
          details: "**** **** **** 4242",
          isDefault: true,
        },
        {
          id: 2,
          type: "PayPal",
          name: "PayPal Account",
          details: "john@example.com",
          isDefault: false,
        },
      ]);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  // Handle profile edit
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Handle profile save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Update profile API call
      const updatedUser = await fetchData("/auth/update-profile", {
        method: "PUT",
        data: formData,
      });

      // Update user in context
      if (updatedUser) {
        updateUser(updatedUser);
        toast.success("Profile updated successfully!");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Delete address
  const deleteAddress = async (id: number) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      await fetchData(`/addresses/${id}`, {
        method: "DELETE",
      });

      setAddresses((prev) => prev.filter((addr) => addr.id !== id));
      toast.success("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address");
    }
  };

  // Set default address
  const setDefaultAddress = async (id: number) => {
    try {
      const updatedAddress = await fetchData(`/addresses/${id}`, {
        method: "PUT",
        data: { ...addresses.find((addr) => addr.id === id), isDefault: true },
      });

      if (updatedAddress) {
        setAddresses((prev) =>
          prev.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          }))
        );
        toast.success("Default address updated!");
      }
    } catch (error) {
      console.error("Error setting default address:", error);
      toast.error("Failed to update default address");
    }
  };

  // Delete payment method
  const deletePaymentMethod = async (id: number) => {
    if (!confirm("Are you sure you want to delete this payment method?"))
      return;

    try {
      setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
      toast.success("Payment method deleted successfully!");
    } catch (error) {
      console.error("Error deleting payment method:", error);
      toast.error("Failed to delete payment method");
    }
  };

  // Set default payment method
  const setDefaultPayment = async (id: number) => {
    try {
      setPaymentMethods((prev) =>
        prev.map((pm) => ({
          ...pm,
          isDefault: pm.id === id,
        }))
      );
      toast.success("Default payment method updated!");
    } catch (error) {
      console.error("Error setting default payment:", error);
      toast.error("Failed to update default payment method");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "text-green-600 bg-green-100";
      case "Shipped":
        return "text-blue-600 bg-blue-100";
      case "Processing":
        return "text-amber-600 bg-amber-100";
      case "Cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPaymentLogo = (type: string) => {
    switch (type) {
      case "Visa":
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
            Visa
          </div>
        );
      case "PayPal":
        return (
          <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
            PayPal
          </div>
        );
      case "MasterCard":
        return (
          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
            Master
          </div>
        );
      default:
        return (
          <div className="w-12 h-8 bg-gray-600 rounded flex items-center justify-center text-white font-bold text-xs">
            Card
          </div>
        );
    }
  };

  const getAddressTypeIcon = (type: string) => {
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

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-pink-600">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Authentication Required
          </h2>
          <p className="text-gray-600 mb-6">
            Please login to view your profile
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Calculate member since date
  const getMemberSince = () => {
    if (user?.joinDate) return user.joinDate;
    return "January 2024";
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg relative">
              <div className="w-full h-full rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-amber-400">
                <span className="text-white text-2xl font-bold">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)
                    : "U"}
                </span>
              </div>
              <button
                onClick={handleEditProfile}
                className="absolute bottom-0 right-0 w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-pink-700 transition-colors"
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
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-2">
            {user?.name || "User"}
          </h1>
          <p className="text-gray-600 text-lg">{user?.email}</p>
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
              {user?.membership || "Standard Member"}
            </span>
            <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
              {user?.loyaltyPoints || 0} Points
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
            <Link href="/header/orders" className="block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 font-medium">
                    Total Orders
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">
                    {orders.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-lg md:text-2xl">📦</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Wishlist
                </p>
                <p className="text-2xl md:text-3xl font-bold text-gray-800">
                  {0}
                </p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-lg md:text-2xl">❤️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-green-500 transform hover:scale-105 transition-all duration-300">
            <Link href="/header/addresses" className="block">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm text-gray-600 font-medium">
                    Addresses
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">
                    {addresses.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg md:text-2xl">🏠</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs md:text-sm text-gray-600 font-medium">
                  Member Since
                </p>
                <p className="text-sm md:text-lg font-bold text-gray-800">
                  {getMemberSince()}
                </p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg md:text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200">
            {["profile", "orders", "addresses", "payments"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 min-w-32 px-6 py-4 text-sm md:text-base font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "text-pink-600 border-b-2 border-pink-600"
                    : "text-gray-600 hover:text-pink-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Profile Info Tab */}
          {activeTab === "profile" && (
            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Profile Information
                </h2>
                {!isEditing && (
                  <button
                    onClick={handleEditProfile}
                    className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form
                  onSubmit={handleSaveProfile}
                  className="space-y-6 max-w-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Full Name
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.name || "Not set"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Phone
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {user?.phone || "Not set"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Member Since
                      </label>
                      <p className="text-lg font-semibold text-gray-800">
                        {getMemberSince()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Recent Orders
                </h2>
                <Link
                  href="/header/orders"
                  className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
                >
                  View All
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📦</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Orders Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You haven&rsquo;t placed any orders yet.
                  </p>
                  <Link
                    href="/products"
                    className="inline-block bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={order.image}
                            alt={order.productName}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {order.productName}
                          </h3>
                          <p className="text-gray-600 text-sm">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-pink-600">{order.price}</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Saved Addresses
                </h2>
                <Link
                  href="/header/addresses"
                  className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
                >
                  Manage Addresses
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏠</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Addresses Saved
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add your delivery addresses for faster checkout.
                  </p>
                  <Link
                    href="/header/addresses"
                    className="inline-block bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Add Address
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.slice(0, 2).map((address) => (
                    <div
                      key={address.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">
                            {getAddressTypeIcon(address.type)}
                          </span>
                          <span className="font-medium text-gray-800">
                            {address.name}
                          </span>
                          {address.isDefault && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(address.id)}
                              className="text-amber-500 hover:text-amber-600"
                              title="Set as default"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => deleteAddress(address.id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Delete address"
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
                      <div className="text-gray-600 space-y-1">
                        <p>{address.address}</p>
                        <p>{address.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  Payment Methods
                </h2>
                <button
                  className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-2"
                  onClick={() => router.push("/payment-methods")}
                >
                  Add New
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {paymentMethods.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💳</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Payment Methods
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Add your payment methods for faster checkout.
                  </p>
                  <button
                    onClick={() => router.push("/payment-methods")}
                    className="inline-block bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Add Payment Method
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        {getPaymentLogo(method.type)}
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {method.name}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {method.details}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {method.isDefault && (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <div className="flex gap-2">
                          {!method.isDefault && (
                            <button
                              onClick={() => setDefaultPayment(method.id)}
                              className="text-amber-500 hover:text-amber-600"
                              title="Set as default"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => deletePaymentMethod(method.id)}
                            className="text-gray-400 hover:text-red-500"
                            title="Delete payment method"
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
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
