"use client";
import React, { useState } from "react";

const Notifications = () => {
  // Sample notifications data with state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      title: "Order Shipped Successfully!",
      message:
        "Your order #ORD-78945 has been shipped and is on its way to you.",
      time: "2 minutes ago",
      isRead: false,
      icon: "🚚",
    },
    {
      id: 2,
      type: "promotion",
      title: "Special Discount Just for You!",
      message: "Get 30% off on all beauty products. Limited time offer!",
      time: "1 hour ago",
      isRead: false,
      icon: "🎁",
    },
    {
      id: 3,
      type: "order",
      title: "Order Delivered",
      message: "Your order #ORD-78942 has been successfully delivered.",
      time: "3 hours ago",
      isRead: true,
      icon: "📦",
    },
    {
      id: 4,
      type: "system",
      title: "Payment Confirmed",
      message:
        "Your payment of $149.99 for order #ORD-78941 has been confirmed.",
      time: "5 hours ago",
      isRead: true,
      icon: "💳",
    },
    {
      id: 5,
      type: "promotion",
      title: "Flash Sale Live Now!",
      message: "Don't miss out on our hourly flash sale. Up to 60% off!",
      time: "1 day ago",
      isRead: true,
      icon: "⚡",
    },
    {
      id: 6,
      type: "system",
      title: "Welcome to Our Store!",
      message: "Thank you for joining us. Get 15% off on your first order.",
      time: "2 days ago",
      isRead: true,
      icon: "👋",
    },
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    systemAlerts: true,
    emailNotifications: false,
    pushNotifications: true,
  });

  // Calculate unread count
  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  };

  // Mark single notification as read
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  // Delete single notification
  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Load more notifications (static demo)
  const loadMoreNotifications = () => {
    const newNotifications = [
      {
        id: notifications.length + 1,
        type: "promotion",
        title: "New Arrivals Alert!",
        message: "Check out our latest collection of summer fashion.",
        time: "Just now",
        isRead: false,
        icon: "🛍️",
      },
      {
        id: notifications.length + 2,
        type: "order",
        title: "Order Processing",
        message: "Your order #ORD-78946 is being processed.",
        time: "Just now",
        isRead: false,
        icon: "⏳",
      },
    ];
    setNotifications([...notifications, ...newNotifications]);
  };

  // Toggle notification settings
  const toggleSetting = (setting: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof notificationSettings],
    }));
  };

  // Filter notifications by type
  const filterNotifications = (type: string) => {
    if (type === "all") return notifications;
    return notifications.filter((notification) => notification.type === type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Notifications
          </h1>
          <p className="text-gray-600 text-lg">
            Stay updated with your orders and promotions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Unread</p>
                <p className="text-3xl font-bold text-gray-800">
                  {unreadCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔔</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total</p>
                <p className="text-3xl font-bold text-gray-800">
                  {notifications.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Orders</p>
                <p className="text-3xl font-bold text-gray-800">
                  {notifications.filter((n) => n.type === "order").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={markAllAsRead}
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Mark All as Read
          </button>
          <button
            onClick={clearAllNotifications}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Clear All
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </button>
        </div>

        {/* Notification Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Notification Settings
                  </h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
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

                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <button
                        onClick={() => toggleSetting(key)}
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

                <div className="flex space-x-3 pt-6">
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium"
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* List Header */}
          <div className="bg-gradient-to-r from-pink-500 to-amber-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">
                Recent Notifications
              </h2>
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                {unreadCount} unread
              </span>
            </div>
          </div>

          {/* Notifications */}
          <div className="divide-y divide-gray-100">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-6 transition-all duration-300 hover:bg-gray-50 animate-slide-up ${
                    !notification.isRead
                      ? "bg-pink-50 border-l-4 border-pink-500"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        !notification.isRead
                          ? "bg-gradient-to-r from-pink-500 to-amber-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {notification.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3
                          className={`font-semibold text-lg ${
                            !notification.isRead
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {notification.message}
                      </p>
                      <div className="flex items-center space-x-4">
                        <button className="text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors duration-200">
                          View Details
                        </button>
                        {!notification.isRead && (
                          <span className="inline-block w-2 h-2 bg-pink-500 rounded-full"></span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-2">
                      {!notification.isRead && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors duration-200"
                          title="Mark as read"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="w-8 h-8 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                        title="Delete notification"
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
              ))
            ) : (
              /* Empty State */
              <div className="text-center py-16">
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  No Notifications
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  You&rsquo;re all caught up! New notifications will appear
                  here.
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {notifications.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 text-center">
              <button
                onClick={loadMoreNotifications}
                className="text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
              >
                Load More Notifications
              </button>
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
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Notifications;
