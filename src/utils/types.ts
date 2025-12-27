// types.ts - Complete Type definitions
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  membership: string;
  avatar?: string;
}

export interface Address {
  id: number;
  type: "home" | "work" | "other";
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: number;
  type: "card" | "upi" | "wallet";
  name: string;
  number: string;
  expiry?: string;
  isDefault: boolean;
  provider: string;
}

export interface Order {
  id: number;
  productName: string;
  price: string;
  originalPrice: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  reason: string;
  image: string;
  quantity: number;
  trackingId: string;
  deliveryDate: string;
  size: string;
  color: string;
  category: string;
}

export interface Notification {
  id: number;
  type: "order" | "promotion" | "system";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  icon: string;
}

export interface OrderStats {
  totalOrders: number;
  pending: number;
  delivered: number;
  cancelled: number;
  totalSpent: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  inStock: boolean;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  orderUpdates: boolean;
  promotions: boolean;
  securityAlerts: boolean;
}

export interface PrivacySettings {
  profileVisibility: string;
  searchVisibility: boolean;
  dataSharing: boolean;
  personalizedAds: boolean;
}
