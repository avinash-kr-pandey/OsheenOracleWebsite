import {
  Address,
  Order,
  PaymentMethod,
  User,
  Notification,
  OrderStats,
  WishlistItem,
  NotificationSettings,
  PrivacySettings,
} from "./types";

// data.ts - All static data
export const userData: User = {
  id: 1,
  name: "Priya Sharma",
  email: "priya.sharma@example.com",
  phone: "+91 98765 43210",
  joinDate: "January 15, 2023",
  membership: "Gold Member",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
};

export const addresses: Address[] = [
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
  {
    id: 3,
    type: "other",
    name: "Priya Sharma",
    address: "45 Green Valley, Near Central Mall",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    phone: "+91 98765 43210",
    isDefault: false,
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: 1,
    type: "card",
    name: "Visa Classic",
    number: "**** **** **** 4242",
    expiry: "12/25",
    isDefault: true,
    provider: "Visa",
  },
  {
    id: 2,
    type: "upi",
    name: "Google Pay",
    number: "priya.sharma@okicici",
    isDefault: false,
    provider: "Google Pay",
  },
  {
    id: 3,
    type: "card",
    name: "MasterCard Gold",
    number: "**** **** **** 5678",
    expiry: "09/24",
    isDefault: false,
    provider: "MasterCard",
  },
  {
    id: 4,
    type: "wallet",
    name: "PayPal Account",
    number: "user@example.com",
    isDefault: false,
    provider: "PayPal",
  },
];

export const orders: Order[] = [
  {
    id: 1,
    productName: "Golden Floral Handbag",
    price: "₹1,499",
    originalPrice: "₹2,499",
    date: "Oct 25, 2025",
    status: "delivered",
    reason: "Successfully delivered to your address.",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop",
    quantity: 1,
    trackingId: "TRK123456789",
    deliveryDate: "Oct 28, 2025",
    size: "One Size",
    color: "Golden",
    category: "Fashion",
  },
  {
    id: 2,
    productName: "Pink Velvet Dress",
    price: "₹2,299",
    originalPrice: "₹3,299",
    date: "Oct 29, 2025",
    status: "shipped",
    reason: "Expected delivery by Nov 5, 2025.",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
    quantity: 1,
    trackingId: "TRK987654321",
    deliveryDate: "Nov 5, 2025",
    size: "M",
    color: "Pink",
    category: "Fashion",
  },
  {
    id: 3,
    productName: "Golden Earrings Set",
    price: "₹899",
    originalPrice: "₹1,499",
    date: "Nov 1, 2025",
    status: "cancelled",
    reason: "Cancelled by user due to change in preference.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop",
    quantity: 2,
    trackingId: "TRK456789123",
    deliveryDate: "Nov 4, 2025",
    size: "Standard",
    color: "Gold",
    category: "Jewelry",
  },
  {
    id: 4,
    productName: "Designer Sunglasses",
    price: "₹1,799",
    originalPrice: "₹2,799",
    date: "Nov 3, 2025",
    status: "processing",
    reason: "Your order is being processed and will be shipped soon.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    quantity: 1,
    trackingId: "TRK789123456",
    deliveryDate: "Nov 8, 2025",
    size: "One Size",
    color: "Black",
    category: "Accessories",
  },
  {
    id: 5,
    productName: "Wireless Bluetooth Headphones",
    price: "₹3,499",
    originalPrice: "₹4,999",
    date: "Nov 5, 2025",
    status: "delivered",
    reason: "Delivered and received successfully.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    quantity: 1,
    trackingId: "TRK321654987",
    deliveryDate: "Nov 7, 2025",
    size: "One Size",
    color: "White",
    category: "Electronics",
  },
];

export const notifications: Notification[] = [
  {
    id: 1,
    type: "order",
    title: "Order Shipped Successfully!",
    message: "Your order #ORD-78945 has been shipped and is on its way to you.",
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
    message: "Your payment of $149.99 for order #ORD-78941 has been confirmed.",
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
];

export const orderStats: OrderStats = {
  totalOrders: 47,
  pending: 2,
  delivered: 42,
  cancelled: 3,
  totalSpent: "₹89,499",
};

// Additional data for different pages
export const productCategories: string[] = [
  "Fashion",
  "Electronics",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Automotive",
];

export const recentSearches: string[] = [
  "wireless headphones",
  "summer dresses",
  "smart watch",
  "kitchen appliances",
  "fitness tracker",
];

export const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Designer Handbag",
    price: "₹2,999",
    originalPrice: "₹4,999",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&h=200&fit=crop",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: "₹12,999",
    originalPrice: "₹15,999",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    inStock: true,
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    price: "₹3,499",
    originalPrice: "₹4,999",
    image:
      "https://images.unsplash.com/photo-1590658165737-15a047b8b5e4?w=200&h=200&fit=crop",
    inStock: false,
  },
];

// Settings related data
export const notificationSettings: NotificationSettings = {
  email: true,
  push: true,
  sms: false,
  orderUpdates: true,
  promotions: true,
  securityAlerts: true,
};

export const privacySettings: PrivacySettings = {
  profileVisibility: "public",
  searchVisibility: true,
  dataSharing: false,
  personalizedAds: true,
};

// Export all data as a single object for easy importing
export const allData = {
  userData,
  addresses,
  paymentMethods,
  orders,
  notifications,
  orderStats,
  productCategories,
  recentSearches,
  wishlistItems,
  notificationSettings,
  privacySettings,
};

export default allData;
