"use client";

import Image from "next/image";
import { useState, useRef, useMemo, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";

interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  image: string;
  images: string[];
  isNew: boolean;
  price: number;
  rating: number;
  gender: string[];
  size?: string[];
  description?: string;
  color?: string[];
  reviews?: Review[];
  features?: {
    freeShipping: boolean;
    warranty: string;
    authentic: boolean;
  };
  shippingInfo?: {
    delivery: string;
    securePayment: boolean;
  };
}

interface ProductInfoProps {
  product: Product;
}

// Custom hook for image preloading
const useImagePreloader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    let isMounted = true;
    const promises = imageUrls.map((url) => {
      return new Promise<void>((resolve) => {
        const img = document.createElement('img');
        img.src = url;
        img.onload = () => {
          if (isMounted) {
            setLoadedImages((prev) => new Set([...prev, url]));
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    });

    Promise.all(promises).then(() => {
      console.log("✅ All product images preloaded successfully!");
    });

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return loadedImages;
};


export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Combine main image with images array and memoize
  const allImages = useMemo(
    () => Array.from(new Set([product.image, ...(product.images || [])])),
    [product.image, product.images]
  );

  // Preload all images
  const loadedImages = useImagePreloader(allImages);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !showZoom) return;

    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    // Limit the position to stay within image bounds
    const boundedX = Math.max(0, Math.min(100, x));
    const boundedY = Math.max(0, Math.min(100, y));

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  const handleMouseEnter = () => {
    // Only show zoom if the current image is loaded
    if (loadedImages.has(selectedImage)) {
      setShowZoom(true);
    }
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleImageSelect = (img: string) => {
    setSelectedImage(img);
    // Reset zoom when changing image
    setShowZoom(false);
  };

  const handleAddToCart = () => {
    if (product.size && product.size.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    if (product.color && product.color.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    };

    addToCart(cartItem);

    // Show confirmation
    alert("Product added to cart successfully!");
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to cart page
    window.location.href = "/cart";
  };

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      inStock: true,
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      alert("Product removed from wishlist ❤️");
    } else {
      addToWishlist(wishlistItem);
      alert("Product added to wishlist 💝");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < Math.floor(rating)
            ? "text-yellow-500"
            : index === Math.floor(rating) && rating % 1 >= 0.5
            ? "text-yellow-300"
            : "text-gray-300"
        }`}
      >
        ★
      </span>
    ));
  };

  const discountPrice = product.price * 1.2;

  // Dynamic data from product features
  const features = product.features || {
    freeShipping: true,
    warranty: "2 Year Warranty",
    authentic: true,
  };

  const shippingInfo = product.shippingInfo || {
    delivery: "Delivery in 2-3 days",
    securePayment: true,
  };

  // Calculate reviews count and percentages
  const reviewsCount = product.reviews?.length || 128;
  const averageRating = product.rating;

  // Check if current image is loaded
  const isCurrentImageLoaded = loadedImages.has(selectedImage);

  return (
    <div
      className="min-h-screen w-full overflow-hidden flex items-center justify-center py-8"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      <div className="max-w-7xl w-full">
        {/* Main Product Card */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 md:p-0 p-2 md:pt-8">
            {/* Left: Image Gallery with Zoom */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Thumbnail Gallery - Vertical on left */}
              <div className="flex lg:flex-col gap-2 order-2 lg:order-1 lg:max-h-[90vh] p-2">
                {allImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-1 ${
                      selectedImage === img
                        ? "border-pink-500 ring-2 ring-pink-200 scale-105"
                        : "border-gray-200 hover:border-pink-300"
                    }`}
                    onClick={() => handleImageSelect(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      loading="lazy"
                    />
                    {/* Loading indicator for thumbnails */}
                    {!loadedImages.has(img) && (
                      <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Main Image Container with Amazon-style Zoom */}
              <div className="flex-1 order-1 lg:order-2 relative">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-blue-50 shadow-inner h-[70vh] w-full">
                  {/* Main Image with Lens */}
                  <div
                    ref={imageRef}
                    className="relative w-full h-full cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Image
                      src={selectedImage}
                      alt={product.name}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isCurrentImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      priority
                    />

                    {/* Loading State for Main Image */}
                    {!isCurrentImageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-2xl">
                        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    {/* Zoom Lens - Only show when image is loaded and zoom is active */}
                    {showZoom && isCurrentImageLoaded && (
                      <div
                        className="absolute w-42 h-42 bg-black/40 rounded-full bg-opacity-20 pointer-events-none z-10 border-2 border-white/50 shadow-lg"
                        style={{
                          left: `calc(${zoomPosition.x}% - 64px)`,
                          top: `calc(${zoomPosition.y}% - 64px)`,
                        }}
                      />
                    )}
                  </div>

                  {product.isNew && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg tracking-wide">
                        NEW ARRIVAL
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                    -20%
                  </div>
                </div>

                {/* Zoomed Preview - Right Side Modal - Only show when image is loaded */}
                {showZoom && isCurrentImageLoaded && (
                  <div className="absolute left-full top-0 ml-6 w-140 h-140 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-20">
                    <div
                      className="w-full h-full bg-no-repeat bg-origin-padding transition-all duration-100"
                      style={{
                        backgroundImage: `url(${selectedImage})`,
                        backgroundSize: "200%",
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Category & Brand */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-pink-500/10 text-pink-700 px-3 py-1 rounded-full text-xs font-bold border border-pink-200">
                    {product.category}
                  </span>
                  {product.gender.map((gen) => (
                    <span
                      key={gen}
                      className="bg-blue-500/10 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200"
                    >
                      {gen}
                    </span>
                  ))}
                </div>
                <p className="text-blue-600 font-semibold text-sm tracking-wide">
                  {product.brand}
                </p>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm">
                  {renderStars(product?.rating)}
                </div>
                <span className="text-gray-700 font-medium text-sm">
                  {product?.rating}/5
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600 text-sm">
                  {reviewsCount} Reviews
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-bold text-gray-900">
                    Rs. {product.price.toFixed(2)}
                  </p>
                  <p className="text-xl text-gray-500 line-through">
                    Rs. {discountPrice.toFixed(2)}
                  </p>
                </div>
                <p className="text-green-600 font-semibold text-sm flex items-center gap-1">
                  <span>✓</span>
                  {features?.freeShipping
                    ? "Free shipping available"
                    : "Standard shipping available"}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed border-l-4 border-pink-400 pl-4">
                {product.description ||
                  "Premium quality product designed for ultimate comfort and style. Crafted with sustainable materials and exceptional attention to detail."}
              </p>

              {/* Color Selection */}
              {/* {product.color && product.color.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      COLOR:
                    </h3>
                    {selectedColor ? (
                      <span className="flex items-center gap-2 text-pink-600 font-medium text-sm">
                        <span
                          className="inline-block w-4 h-4 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: selectedColor.toLowerCase(),
                          }}
                        ></span>
                        {selectedColor}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">
                        Select Color
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    {product.color.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 shadow-sm ${
                          selectedColor === color
                            ? "border-pink-500 ring-2 ring-pink-200 scale-110"
                            : "border-gray-300 hover:border-pink-300 hover:scale-105"
                        }`}
                        style={{
                          backgroundColor: color.toLowerCase(),
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )} */}

              {/* Size Selection */}
              {product.size && product.size.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      SELECT SIZE
                    </h3>
                    <button className="text-pink-600 hover:text-pink-700 text-xs font-medium">
                      Size Guide →
                    </button>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {product.size.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2 px-1 border-2 rounded-lg font-semibold text-xs transition-all duration-200 ${
                          selectedSize === s
                            ? "border-pink-500 bg-pink-50 text-pink-700 shadow-md"
                            : "border-gray-200 hover:border-pink-300 hover:bg-pink-25 text-gray-700 hover:shadow-sm"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Actions */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 font-bold text-gray-900 min-w-8 text-center border-l border-r border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🛒</span>
                    ADD TO CART
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleWishlistToggle}
                    className={`border-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                      isInWishlist(product.id)
                        ? "border-red-500 bg-red-50 text-red-600"
                        : "border-amber-500 text-amber-600 hover:bg-amber-50"
                    }`}
                  >
                    <span>{isInWishlist(product.id) ? "❤️" : "🤍"}</span>
                    {isInWishlist(product.id) ? "WISHLISTED" : "WISHLIST"}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>⚡</span>
                    BUY NOW
                  </button>
                </div>
              </div>

              {/* Features - Dynamic from product data */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200">
                {features.freeShipping && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 text-sm">🚚</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">
                        Free Shipping
                      </p>
                    </div>
                  </div>
                )}

                {features.warranty && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-600 text-sm">🛡️</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">
                        {features.warranty}
                      </p>
                    </div>
                  </div>
                )}

                {features.authentic && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">
                        Authentic
                      </p>
                    </div>
                  </div>
                )}

                {shippingInfo.securePayment && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">🔒</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-xs">
                        Secure Payment
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Tabs Section */}
          <div className="mt-8 bg-white  border border-white/50 mx-0 md:rounded-2xl">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-4 sm:space-x-6 md:space-x-8 px-3 sm:px-4 md:px-6 min-w-max">
                {[
                  { id: "description", label: "Description" },
                  { id: "details", label: "Product Details" },
                  { id: "shipping", label: "Shipping" },
                  { id: "reviews", label: "Reviews" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 sm:py-4 px-2 font-medium text-sm sm:text-base border-b-2 whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.id
                        ? "border-pink-500 text-pink-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tabs Content */}
            <div className="p-4 sm:p-6">
              {/* ---------------------- DESCRIPTION TAB ---------------------- */}
              {activeTab === "description" && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Product Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {product.description ||
                      "Discover the perfect blend of style and comfort with our premium product. Meticulously crafted with attention to every detail, this item offers exceptional quality and durability."}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 text-sm sm:text-base">
                    {[
                      "Premium quality materials",
                      "Sustainable production",
                      "Easy to maintain",
                      "Long-lasting durability",
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* ---------------------- DETAILS TAB ---------------------- */}
              {activeTab === "details" && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Product Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3 text-sm sm:text-base">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-600">Brand</span>
                        <span className="text-gray-900">{product.brand}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-600">
                          Category
                        </span>
                        <span className="text-gray-900">
                          {product.category}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-600">
                          Gender
                        </span>
                        <span className="text-gray-900">
                          {product.gender.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm sm:text-base">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-600">
                          Available Sizes
                        </span>
                        <span className="text-gray-900">
                          {product.size?.join(", ") || "One Size"}
                        </span>
                      </div>
                      {product.color && product.color.length > 0 && (
                        <div className="flex justify-between border-b border-gray-100 pb-2 items-center">
                          <span className="font-medium text-gray-600">
                            Colors
                          </span>
                          <div className="flex items-center gap-2">
                            {product.color.map((clr, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: clr.toLowerCase() }}
                                ></span>
                                <span className="text-gray-900 text-sm">
                                  {clr}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium text-gray-600">SKU</span>
                        <span className="text-gray-900">
                          PRD-{product.id.toString().padStart(6, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------- SHIPPING TAB ---------------------- */}
              {activeTab === "shipping" && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Shipping Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm sm:text-base">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">
                        Delivery Options
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <span className="text-blue-500">🚚</span>
                          {shippingInfo.delivery}
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-500">⚡</span>
                          Express delivery available
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-blue-500">📦</span>
                          Delivery within 2–5 business days
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">
                        Service Information
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">🌍</span>
                          International shipping available
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">📞</span>
                          Customer support 24/7
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">🔒</span>
                          Secure payment processing
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------- REVIEWS TAB ---------------------- */}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {averageRating}
                      </div>
                      <div className="flex justify-center gap-1">
                        {renderStars(averageRating)}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        Based on {reviewsCount} reviews
                      </div>
                    </div>
                    <div className="flex-1 w-full space-y-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-sm text-gray-600 w-4">
                            {star}
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{
                                width: `${
                                  star === 5
                                    ? 70
                                    : star === 4
                                    ? 20
                                    : star === 3
                                    ? 5
                                    : star === 2
                                    ? 3
                                    : 2
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {star === 5
                              ? 70
                              : star === 4
                              ? 20
                              : star === 3
                              ? 5
                              : star === 2
                              ? 3
                              : 2}
                            %
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 text-sm sm:text-base"
                        >
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="font-semibold text-gray-900">
                              {review.name}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {review.date}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm sm:text-base">
                            {review.comment}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        No reviews yet. Be the first to review this product!
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Info Section - Dynamic from product data */}
          <div className="bg-gradient-to-r from-pink-50 to-blue-50   mt-8 rounded-2xl ">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8">
              {features.freeShipping && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3">
                    <span className="text-pink-500 text-xl">📦</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Free Shipping
                  </h4>
                  <p className="text-gray-600 text-xs">
                    {shippingInfo.delivery}
                  </p>
                </div>
              )}

              {features.warranty && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3">
                    <span className="text-amber-500 text-xl">🛡️</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    {features.warranty}
                  </h4>
                  <p className="text-gray-600 text-xs">Warranty Included</p>
                </div>
              )}

              {shippingInfo.securePayment && (
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-500 text-xl">🔒</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">
                    Secure Payment
                  </h4>
                  <p className="text-gray-600 text-xs">100% protected</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}