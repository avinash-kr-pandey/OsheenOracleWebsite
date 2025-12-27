"use client";
import React, { useState } from "react";
import {
  FaUser,
  FaLock,
  FaBell,
  FaCreditCard,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaPalette,
  FaGlobe,
  FaTrash,
  FaDownload,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    orderUpdates: true,
    promotions: true,
    securityAlerts: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    searchVisibility: true,
    dataSharing: false,
    personalizedAds: true,
  });
  const [theme, setTheme] = useState("light");

  const userData = {
    profile: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
      phone: "+91 98765 43210",
      joinDate: "January 15, 2023",
      membership: "Gold Member",
    },
    addresses: [
      {
        id: 1,
        type: "home",
        name: "Priya Sharma",
        address: "123 Main Street, Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "+91 98765 43210",
        isDefault: true,
      },
      {
        id: 2,
        type: "work",
        name: "Priya Sharma",
        address: "Tech Park, Building A, Floor 7",
        city: "Bangalore",
        state: "Karnataka",
        pincode: "560001",
        phone: "+91 98765 43210",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: 1,
        type: "card",
        name: "Visa Classic",
        number: "**** **** **** 4242",
        expiry: "12/25",
        isDefault: true,
      },
      {
        id: 2,
        type: "upi",
        name: "Google Pay",
        number: "priya.sharma@okicici",
        isDefault: false,
      },
    ],
    orderStats: {
      totalOrders: 47,
      pending: 2,
      delivered: 42,
      cancelled: 3,
      totalSpent: "₹89,499",
    },
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "security", label: "Security", icon: FaLock },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "addresses", label: "Addresses", icon: FaMapMarkerAlt },
    { id: "payments", label: "Payments", icon: FaCreditCard },
    { id: "privacy", label: "Privacy", icon: FaShieldAlt },
    { id: "appearance", label: "Appearance", icon: FaPalette },
  ];

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof notifications],
    }));
  };

  const togglePrivacy = (key: string) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof privacy],
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.profile.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.profile.email}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue={userData.profile.phone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.profile.joinDate}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Update Profile
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Order Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-pink-50 rounded-xl border border-pink-200">
                  <div className="text-2xl font-bold text-pink-600">
                    {userData.orderStats.totalOrders}
                  </div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">
                    {userData.orderStats.pending}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">
                    {userData.orderStats.delivered}
                  </div>
                  <div className="text-sm text-gray-600">Delivered</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">
                    {userData.orderStats.totalSpent}
                  </div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Change Password
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 pr-12"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
              <button className="mt-6 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Update Password
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Two-Factor Authentication
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">
                    SMS Authentication
                  </h4>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300">
                  Enable
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Login Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">
                      Chrome • Windows
                    </p>
                    <p className="text-sm text-gray-600">
                      Mumbai, India • Today, 10:30 AM
                    </p>
                  </div>
                  <span className="text-green-500 text-sm font-medium">
                    Current
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Safari • iPhone</p>
                    <p className="text-sm text-gray-600">
                      Bangalore, India • Yesterday, 8:15 PM
                    </p>
                  </div>
                  <button className="text-red-500 text-sm font-medium hover:text-red-700 cursor-pointer">
                    Log out
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between py-3 border-b border-gray-200"
                  >
                    <div>
                      <h4 className="font-medium text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {key === "email" && "Receive notifications via email"}
                        {key === "push" &&
                          "Receive push notifications on your device"}
                        {key === "sms" && "Receive SMS notifications"}
                        {key === "orderUpdates" &&
                          "Get updates about your orders"}
                        {key === "promotions" &&
                          "Receive promotional offers and discounts"}
                        {key === "securityAlerts" &&
                          "Get alerts about security issues"}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification(key)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                        value ? "bg-pink-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          value ? "translate-x-6" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "addresses":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Saved Addresses
              </h3>
              <div className="space-y-4">
                {userData.addresses.map((address) => (
                  <div
                    key={address.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-800">
                            {address.name}
                          </span>
                          <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded-full capitalize">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-1">{address.address}</p>
                        <p className="text-gray-600 mb-1">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-gray-600">{address.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-pink-600 hover:text-pink-800 p-2">
                          Edit
                        </button>
                        {!address.isDefault && (
                          <button className="text-red-600 hover:text-red-800 p-2">
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Add New Address
              </button>
            </div>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Payment Methods
              </h3>
              <div className="space-y-4">
                {userData.paymentMethods.map((payment) => (
                  <div
                    key={payment.id}
                    className="border border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-colors duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          {payment.type === "card" ? "VISA" : "UPI"}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">
                            {payment.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {payment.number}
                          </p>
                          {payment.expiry && (
                            <p className="text-gray-600 text-sm">
                              Expires {payment.expiry}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {payment.isDefault && (
                          <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                        <button className="text-pink-600 hover:text-pink-800 text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Add Payment Method
              </button>
            </div>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Privacy Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      Profile Visibility
                    </h4>
                    <p className="text-sm text-gray-600">
                      Who can see your profile and activity
                    </p>
                  </div>
                  <select
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    value={privacy.profileVisibility}
                    onChange={(e) =>
                      setPrivacy((prev) => ({
                        ...prev,
                        profileVisibility: e.target.value,
                      }))
                    }
                  >
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                {Object.entries(privacy)
                  .slice(1)
                  .map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3 border-b border-gray-200"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800 capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === "searchVisibility" &&
                            "Allow your profile to appear in search results"}
                          {key === "dataSharing" &&
                            "Share data with trusted partners for better experience"}
                          {key === "personalizedAds" &&
                            "Show personalized advertisements based on your interests"}
                        </p>
                      </div>
                      <button
                        onClick={() => togglePrivacy(key)}
                        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                          value ? "bg-pink-500" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            value ? "translate-x-6" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Data & Privacy
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-pink-300 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <FaDownload className="text-pink-500" />
                    <span className="font-medium text-gray-800">
                      Download Your Data
                    </span>
                  </div>
                  <span className="text-gray-400">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-300 transition-colors duration-300 text-red-600">
                  <div className="flex items-center gap-3">
                    <FaTrash className="text-red-500" />
                    <span className="font-medium">Delete Account</span>
                  </div>
                  <span className="text-red-400">→</span>
                </button>
              </div>
            </div>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Theme & Appearance
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: "light",
                    name: "Light",
                    desc: "Clean and bright interface",
                  },
                  {
                    id: "dark",
                    name: "Dark",
                    desc: "Easy on the eyes in low light",
                  },
                  { id: "auto", name: "Auto", desc: "Follows system settings" },
                ].map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`p-4 border-2 rounded-xl text-left transition-all duration-300 ${
                      theme === themeOption.id
                        ? "border-pink-500 bg-pink-50"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <div className="font-semibold text-gray-800 mb-1">
                      {themeOption.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {themeOption.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Language & Region
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300">
                    <option>English (IN)</option>
                    <option>Hindi</option>
                    <option>Marathi</option>
                    <option>Tamil</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300">
                    <option>Indian Rupee (₹)</option>
                    <option>US Dollar ($)</option>
                    <option>Euro (€)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <FaUser className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Account Settings
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 bg-white rounded-2xl shadow-lg p-6 h-fit">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* User Summary */}
            <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-amber-50 rounded-xl border border-pink-200">
              <h4 className="font-semibold text-gray-800 mb-2">
                {userData.profile.name}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                {userData.profile.email}
              </p>
              <p className="text-sm text-pink-600 font-medium">
                {userData.profile.membership}
              </p>
              <div className="mt-3 text-xs text-gray-500">
                Member since {userData.profile.joinDate}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">{renderContent()}</div>
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
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Settings;
