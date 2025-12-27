// shared/types/product.ts
export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface Product {
  id: string | number;
  _id?: string;
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