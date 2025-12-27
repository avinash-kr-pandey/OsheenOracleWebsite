"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  RefreshCw,
  FileText,
  X,
  Download,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { fetchData } from "@/utils/api/api";
import { useAuth } from "@/contexts/AuthContext";

interface OrderItem {
  product: {
    name: string;
    images: string[];
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated, user } = useAuth();

  // Modal states
  const [trackingModal, setTrackingModal] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });
  const [invoiceModal, setInvoiceModal] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });
  const [returnModal, setReturnModal] = useState<{
    open: boolean;
    orderId: string;
  }>({ open: false, orderId: "" });

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchOrders();
    }
  }, [isAuthenticated, token]);

  const fetchOrders = async () => {
    if (!isAuthenticated || !token) {
      toast.error("Please login to view orders");
      return;
    }

    try {
      setLoading(true);
      const response = await fetchData("/orders/my-orders");
      console.log("Orders response:", response);

      if (response && Array.isArray(response)) {
        setOrders(response);
      } else {
        setOrders([]);
        toast.error("No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      const err = error as { response?: { status?: number } };
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to load orders");
      }
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDeliveryDate = (orderDate: string, status: string) => {
    const date = new Date(orderDate);
    if (status === "delivered") {
      date.setDate(date.getDate() + 3);
      return `Delivered on ${formatDate(date.toISOString())}`;
    } else if (status === "shipped") {
      date.setDate(date.getDate() + 5);
      return `Expected by ${formatDate(date.toISOString())}`;
    } else {
      return "Will update soon";
    }
  };

  // Modal handlers
  const handleTrack = (id: string) =>
    setTrackingModal({ open: true, orderId: id });
  const handleInvoice = (id: string) =>
    setInvoiceModal({ open: true, orderId: id });
  const handleReturn = (id: string) =>
    setReturnModal({ open: true, orderId: id });

  // Close modals
  const closeModals = () => {
    setTrackingModal({ open: false, orderId: "" });
    setInvoiceModal({ open: false, orderId: "" });
    setReturnModal({ open: false, orderId: "" });
  };

  // Get current order for modals
  const currentOrder = orders.find(
    (order) =>
      order._id === trackingModal.orderId ||
      order._id === invoiceModal.orderId ||
      order._id === returnModal.orderId
  );

  // Tracking steps based on order status
  const getTrackingSteps = (order: Order) => {
    const steps = [
      { status: "Order Placed", completed: true },
      { status: "Order Confirmed", completed: true },
      { status: "Processing", completed: order.status !== "pending" },
      {
        status: "Shipped",
        completed: ["shipped", "delivered"].includes(order.status),
      },
      { status: "Delivered", completed: order.status === "delivered" },
    ];
    return steps;
  };

  if (!isAuthenticated) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-12 px-4 flex flex-col items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-pink-600">🔒</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Login Required
          </h2>
          <p className="text-gray-600 mb-6">Please login to view your orders</p>
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

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-12 px-4 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
          My Orders 🛍️
        </h1>
        <p className="text-gray-600 text-lg">
          View, track, and manage all your past orders in one place.
        </p>
      </div>

      <div className="w-full max-w-5xl space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between border-l-4 border-pink-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 w-full md:w-2/3">
              <div className="relative">
                <Image
                  src={order.items[0]?.product.images[0] || "/placeholder.jpg"}
                  alt={order.items[0]?.product.name || "Product"}
                  className="w-24 h-24 object-cover rounded-xl border-2 border-pink-200 shadow-md"
                  width={200}
                  height={200}
                />
                <div
                  className={`absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full shadow-lg border ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status.toUpperCase()}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {order.items[0]?.product.name || "Product"}
                  {order.items.length > 1 && ` +${order.items.length - 1} more`}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Order ID: {order._id.slice(-8).toUpperCase()}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar size={14} /> Ordered on:{" "}
                  {formatDate(order.createdAt)}
                </p>
                <p className="text-sm font-semibold mt-2 flex items-center gap-1 text-gray-600">
                  <MapPin size={14} />
                  {order.shippingAddress.city}, {order.shippingAddress.state}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {getDeliveryDate(order.createdAt, order.status)}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <span className="text-2xl font-bold text-pink-600 bg-pink-50 px-4 py-2 rounded-xl shadow-sm">
                ₹{order.totalAmount.toLocaleString()}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() => handleTrack(order._id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Truck size={18} /> Track Order
                </button>
                <button
                  onClick={() => handleInvoice(order._id)}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:from-yellow-500 hover:to-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FileText size={18} /> Get Invoice
                </button>
                {order.status === "delivered" && (
                  <button
                    onClick={() => handleReturn(order._id)}
                    className="flex items-center gap-2 bg-gradient-to-r from-pink-100 to-pink-50 text-pink-700 border-2 border-pink-200 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-pink-200 hover:border-pink-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    <RefreshCw size={18} /> Return
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && !loading && (
        <div className="text-center text-gray-600 mt-16">
          <Package className="w-16 h-16 text-pink-400 mx-auto mb-3" />
          <p className="text-lg">You have no orders yet. Start shopping now!</p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="mt-4 bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl"
          >
            Shop Now
          </button>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModal.open && currentOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Order Tracking
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
              <p className="font-semibold text-gray-800">
                {currentOrder.items[0]?.product.name || "Product"}
                {currentOrder.items.length > 1 &&
                  ` +${currentOrder.items.length - 1} more`}
              </p>
              <p className="text-sm text-gray-600">
                Order ID: {currentOrder._id.slice(-8).toUpperCase()}
              </p>
            </div>

            <div className="space-y-4">
              {getTrackingSteps(currentOrder).map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {step.completed ? <CheckCircle size={16} /> : index + 1}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        step.completed ? "text-gray-800" : "text-gray-500"
                      }`}
                    >
                      {step.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={closeModals}
              className="w-full mt-6 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceModal.open && currentOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Order Invoice</h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              {currentOrder.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <Image
                    src={item.product.images[0] || "/placeholder.jpg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-yellow-300"
                    width={80}
                    height={80}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <span className="font-bold">
                    ₹{item.quantity * item.price}
                  </span>
                </div>
              ))}

              <div className="space-y-2 text-sm mt-4 pt-4 border-t border-yellow-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">
                    {formatDate(currentOrder.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span
                    className={`font-medium ${
                      currentOrder.status === "delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {currentOrder.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="font-medium">
                    {currentOrder.paymentMethod} - {currentOrder.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-yellow-200">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-pink-600">
                    ₹{currentOrder.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  alert(`Invoice downloaded for ${currentOrder._id}`)
                }
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white py-3 rounded-xl font-semibold hover:from-yellow-500 hover:to-orange-500 transition"
              >
                <Download size={18} /> Download PDF
              </button>
              <button
                onClick={closeModals}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Return Modal */}
      {returnModal.open && currentOrder && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Return Request
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
              <p className="font-semibold text-gray-800 mb-2">
                {currentOrder.items[0]?.product.name || "Product"}
              </p>
              <p className="text-sm text-gray-600">
                Order ID: {currentOrder._id.slice(-8).toUpperCase()}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Item to Return
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                  {currentOrder.items.map((item, index) => (
                    <option key={index} value={index}>
                      {item.product.name} (Qty: {item.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Reason
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                  <option>Product damaged</option>
                  <option>Wrong item received</option>
                  <option>Size doesn&rsquo;t fit</option>
                  <option>Quality issues</option>
                  <option>Changed my mind</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  rows={3}
                  placeholder="Please provide more details about your return request..."
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  toast.success(
                    `Return request submitted for order ${currentOrder._id
                      .slice(-8)
                      .toUpperCase()}`
                  );
                  closeModals();
                }}
                className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
              >
                Submit Return Request
              </button>
              <button
                onClick={closeModals}
                className="px-6 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
