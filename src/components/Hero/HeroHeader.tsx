"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { MdKeyboardArrowDown } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast";
import {
  FiLogOut,
  FiUser,
  FiSettings,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiBell,
  FiHelpCircle,
  FiLogIn,
} from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "#" },
  { name: "Horoscope", href: "/horoscope" },
  { name: "Blog", href: "/blog" },
];

const servicesLinks = [
  { name: "Spells", href: "/services/spells" },
  { name: "Reading", href: "/services/reading" },
];

interface AuthProfileLink {
  name: string;
  href?: string;
  icon: React.ReactNode;
  action?: () => void;
}

interface UnauthProfileLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function HeroHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0); // ✅ ADD THIS

  const router = useRouter();
  const { getTotalItems, clearCart } = useCart();
  const { getTotalWishlistItems, clearWishlist } = useWishlist();

  // Use Auth Context
  const { user, isAuthenticated, loading, logout, checkAuth } = useAuth(); // ✅ ADD checkAuth

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const servicesTriggerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileServicesButtonRef = useRef<HTMLButtonElement>(null);

  // ✅ ADD: Force re-render when auth state changes
  useEffect(() => {
    console.log("Header - Auth State Changed:", {
      isAuthenticated,
      user: user?.name || user?.email,
      loading,
      forceUpdate,
    });

    // Force re-render when auth state changes
    setForceUpdate((prev) => prev + 1);
  }, [isAuthenticated, user, loading]);

  // ✅ ADD: Listen for storage changes (when login/logout happens)
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("Storage changed in Header, forcing update");
      setForceUpdate((prev) => prev + 1);
      checkAuth?.();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [checkAuth]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close profile dropdown
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }

      // Close desktop services dropdown
      if (
        servicesTriggerRef.current &&
        servicesDropdownRef.current &&
        !servicesTriggerRef.current.contains(event.target as Node) &&
        !servicesDropdownRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }

      // Close mobile services dropdown when clicking outside
      const target = event.target as HTMLElement;
      if (
        menuOpen &&
        !target.closest(".mobile-services-dropdown") &&
        !target.closest(".mobile-services-button")
      ) {
        setMobileServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const navigateToCart = () => {
    router.push("/cart");
  };

const navigateToWishlist = () => {
  // सीधे wishlist page पर redirect करें
  router.push("/header/wishlist");

  // अगर wishlist page में authentication required है,
  // तो वहाँ पर check करें
};
  const handleProfileClick = () => {
    if (isAuthenticated) {
      setProfileDropdownOpen(!profileDropdownOpen);
    } else {
      router.push("/login");
    }
  };

  const handleLogout = async () => {
    try {
      // Clear cart and wishlist
      clearCart();
      clearWishlist();

      // Call logout from auth context
      logout();

      setProfileDropdownOpen(false);
      setMenuOpen(false);

      toast.success("Logged out successfully!");

      // Force update after logout
      setTimeout(() => {
        setForceUpdate((prev) => prev + 1);
        router.push("/");
      }, 100);
    } catch (error) {
      console.error("Logout error:", error);
      toast.success("Logged out successfully!");
      router.push("/");
    }
  };

  const handleProfileNavigation = (href: string) => {
    setProfileDropdownOpen(false);
    if (isAuthenticated) {
      router.push(href);
    } else {
      toast.error("Please login to access this page");
      router.push("/login");
    }
  };

  // Desktop Services dropdown handlers
  const handleServicesMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setServicesDropdownOpen(true);
    }
  };

  const handleServicesMouseLeave = (e: React.MouseEvent) => {
    if (window.innerWidth >= 768) {
      const relatedTarget = e.relatedTarget as Node;
      if (
        servicesDropdownRef.current &&
        servicesDropdownRef.current.contains(relatedTarget)
      ) {
        return;
      }

      setTimeout(() => {
        if (!servicesDropdownRef.current?.contains(document.activeElement)) {
          setServicesDropdownOpen(false);
        }
      }, 100);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setServicesDropdownOpen(true);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (window.innerWidth >= 768) {
      setTimeout(() => {
        setServicesDropdownOpen(false);
      }, 150);
    }
  };

  const handleServicesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.innerWidth < 768) {
      setMobileServicesOpen((prev) => !prev);
    }
  };

  const handleServicesItemClick = (href: string) => {
    router.push(href);
    setMobileServicesOpen(false);
    setMenuOpen(false);
  };

  // Mobile menu close handler
  const handleMobileMenuClose = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .substring(0, 2) || "U"
    );
  };

  const getUserName = () => {
    if (user?.name) return user.name;
    if (user?.email) return user.email.split("@")[0];
    return "User";
  };

  // Profile links for authenticated users
  const getAuthProfileLinks = (): AuthProfileLink[] => [
    {
      name: "View Profile",
      href: "/header/profile",
      icon: <FiUser className="text-lg" />,
    },
    {
      name: "My Orders",
      href: "/header/orders",
      icon: <FiShoppingBag className="text-lg" />,
    },
    { name: "Order History", href: "/header/order-history", icon: "📋" },
    {
      name: "Wishlist",
      href: "/header/wishlist",
      icon: <FiHeart className="text-lg" />,
    },
    {
      name: "Settings",
      href: "/header/settings",
      icon: <FiSettings className="text-lg" />,
    },
    {
      name: "Address Book",
      href: "/header/addresses",
      icon: <FiMapPin className="text-lg" />,
    },
    {
      name: "Notifications",
      href: "/header/notifications",
      icon: <FiBell className="text-lg" />,
    },
    {
      name: "Help & Support",
      href: "/header/support",
      icon: <FiHelpCircle className="text-lg" />,
    },
    {
      name: "Logout",
      icon: <FiLogOut className="text-lg" />,
      action: handleLogout,
    },
  ];

  // Profile links for unauthenticated users
  const getUnauthProfileLinks = (): UnauthProfileLink[] => [
    { name: "Login", href: "/login", icon: <FiLogIn className="text-lg" /> },
    {
      name: "View Products",
      href: "/products",
      icon: <FiShoppingBag className="text-lg" />,
    },
    { name: "Services", href: "#", icon: "🔮" },
    {
      name: "Help & Support",
      href: "/support",
      icon: <FiHelpCircle className="text-lg" />,
    },
  ];

  // ✅ ADD: Show loading skeleton if auth is loading
  if (loading) {
    return (
      <header className="fixed top-0 left-0 w-full z-50 bg-[#FBB5E7] py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="cursor-pointer flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="rounded-full"
              style={{ marginBottom: "-30px" }}
            />
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="w-24 h-8 bg-purple-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-10 bg-yellow-300 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-purple-200 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-purple-200 rounded-full animate-pulse"></div>
            <div className="w-32 h-10 bg-purple-200 rounded-2xl animate-pulse"></div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <div className="w-10 h-10 bg-purple-200 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-purple-200 rounded-full animate-pulse"></div>
            <div className="w-10 h-10 bg-purple-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FBB5E7] py-4" : "bg-[#FBB5E7] py-4"
      }`}
      key={`header-${forceUpdate}`} // ✅ ADD THIS KEY FOR FORCE RE-RENDER
    >
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between relative">
        {/* Logo */}
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => router.push("/")}
        >
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Logo"
              width={scrolled ? 90 : 120}
              height={scrolled ? 90 : 120}
              className="rounded-full transition-all duration-300 hidden sm:block"
              style={{
                marginBottom: scrolled ? "-30px" : "-40px",
              }}
            />
            <Image
              src="/logo.png"
              alt="Logo"
              width={scrolled ? 70 : 80}
              height={scrolled ? 70 : 80}
              className="rounded-full transition-all duration-300 sm:hidden"
              style={{
                marginBottom: scrolled ? "-20px" : "-25px",
              }}
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 lg:space-x-10 items-center">
          {navLinks.map((link) => (
            <div key={link.name} className="relative">
              {link.name === "Services" ? (
                <div
                  className="relative"
                  ref={servicesTriggerRef}
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <button
                    className="text-gray-800 text-sm lg:text-base font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105 flex items-center gap-1 cursor-pointer"
                    onClick={handleServicesClick}
                  >
                    {link.name}
                    <MdKeyboardArrowDown
                      className={`transition-transform duration-300 ${
                        servicesDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    className="absolute top-full left-0 w-full h-2 bg-transparent"
                    style={{ zIndex: 60 }}
                  ></div>

                  <div
                    ref={servicesDropdownRef}
                    className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-purple-100 transition-all duration-300 transform ${
                      servicesDropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                    style={{ zIndex: 50 }}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {servicesLinks.map((service) => (
                      <button
                        key={service.name}
                        onClick={() => handleServicesItemClick(service.href)}
                        className="w-full px-4 py-3 text-left hover:bg-purple-50 transition-all duration-200 text-gray-700 hover:text-purple-600 font-medium first:rounded-t-xl last:rounded-b-xl cursor-pointer"
                      >
                        {service.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  className="text-gray-800 text-sm lg:text-base font-medium hover:text-purple-600 transition-all duration-300 hover:scale-105"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}

          <Link
            href="/products"
            className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-4 py-2 lg:px-5 lg:py-2.5 rounded-lg transition-all duration-300 text-sm lg:text-base hover:scale-105 hover:shadow-lg"
          >
            Buy products
          </Link>

          {/* Wishlist Icon */}
          <button
            onClick={navigateToWishlist}
            className="relative p-2 text-gray-800 hover:text-red-500 transition-all duration-300 hover:scale-105 cursor-pointer"
            title="Wishlist"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isAuthenticated && getTotalWishlistItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalWishlistItems()}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={navigateToCart}
            className="relative p-2 text-gray-800 hover:text-purple-600 transition-all duration-300 hover:scale-105 cursor-pointer"
            title="Cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"
              />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>

          {/* Profile Section */}
          {isAuthenticated ? (
            <div className="relative" ref={profileDropdownRef}>
              <div
                className="cursor-pointer shadow-2xl border rounded-2xl px-4 py-1 hover:shadow-2xl flex items-center gap-2"
                onClick={handleProfileClick}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(getUserName())}
                </div>
                <span className="text-gray-800 font-medium hidden lg:inline">
                  {getUserName()}
                </span>
                <MdKeyboardArrowDown
                  className={`transition-transform duration-300 ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              {/* Authenticated User Dropdown */}
              <div
                className={`absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-purple-100 transition-all duration-300 transform ${
                  profileDropdownOpen
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                }`}
              >
                <div className="p-4 border-b border-purple-50 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                      {getInitials(getUserName())}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {getUserName()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user?.email || "User Account"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {getAuthProfileLinks().map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else if (item.href) {
                          handleProfileNavigation(item.href);
                        }
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-all duration-200 flex items-center space-x-3 group cursor-pointer ${
                        index === getAuthProfileLinks().length - 1
                          ? "border-t border-purple-50"
                          : ""
                      }`}
                    >
                      <span className="text-gray-600 group-hover:text-purple-600">
                        {item.icon}
                      </span>
                      <span className="text-gray-700 group-hover:text-purple-600 font-medium">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 text-gray-700 border border-gyar-700 rounded-lg hover:text-yellow-500 hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FiLogIn />
                <span>Login</span>
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={navigateToWishlist}
            className="relative p-2 text-gray-800"
            title="Wishlist"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {isAuthenticated && getTotalWishlistItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalWishlistItems()}
              </span>
            )}
          </button>

          <button
            onClick={navigateToCart}
            className="relative p-2 text-gray-800"
            title="Cart"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5.5M7 13l2.5 5.5m0 0L17 21m-7.5-2.5h9"
              />
            </svg>
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>

          <button
            className="flex flex-col justify-center items-center w-10 h-10 z-50 relative"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2 bg-white" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 mb-1.5 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2 bg-white" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
          menuOpen
            ? "bg-black/50 backdrop-blur-sm opacity-100"
            : "bg-transparent backdrop-blur-0 opacity-0 pointer-events-none"
        }`}
        onClick={handleMobileMenuClose}
      >
        <div
          ref={mobileMenuRef}
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-purple-900 to-[#FBB5E7] transition-transform duration-500 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {isAuthenticated ? getInitials(getUserName()) : "?"}
                </div>
                <div>
                  <p className="font-semibold text-white text-lg">
                    {isAuthenticated ? getUserName() : "Welcome Guest!"}
                  </p>
                  <p className="text-sm text-white/80">
                    {isAuthenticated
                      ? user?.email || "Manage your account"
                      : "Login to continue"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-6">
              <nav className="flex flex-col px-6 space-y-2 pt-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.name === "Services" ? (
                      <div className="relative">
                        <button
                          ref={mobileServicesButtonRef}
                          className="mobile-services-button w-full text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 flex items-center justify-between"
                          onClick={() =>
                            setMobileServicesOpen(!mobileServicesOpen)
                          }
                        >
                          <span>Services</span>
                          <MdKeyboardArrowDown
                            className={`transition-transform duration-300 ${
                              mobileServicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`mobile-services-dropdown ml-4 mt-1 space-y-1 overflow-hidden transition-[max-height,opacity] duration-400 ease-in-out ${
                            mobileServicesOpen
                              ? "max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          {servicesLinks.map((service) => (
                            <button
                              key={service.name}
                              onClick={() =>
                                handleServicesItemClick(service.href)
                              }
                              className="block w-full text-left text-white/90 text-base font-medium py-2 px-4 rounded-lg hover:bg-white/10 transition-all duration-300"
                            >
                              {service.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          router.push(link.href);
                          handleMobileMenuClose();
                        }}
                        className="text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 text-left"
                      >
                        {link.name}
                      </button>
                    )}
                  </div>
                ))}

                <div className="border-t border-white/20 pt-4 mt-4">
                  <p className="text-white/80 text-sm font-medium mb-3 px-4">
                    {isAuthenticated ? "MY ACCOUNT" : "ACCOUNT"}
                  </p>
                  {isAuthenticated
                    ? getAuthProfileLinks().map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            if (item.action) {
                              item.action();
                            } else if (item.href) {
                              handleProfileNavigation(item.href);
                            }
                            handleMobileMenuClose();
                          }}
                          className="w-full text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 flex items-center space-x-3 text-left"
                        >
                          <span className="text-white/90">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      ))
                    : getUnauthProfileLinks().map((item) => (
                        <button
                          key={item.name}
                          onClick={() => {
                            handleProfileNavigation(item.href);
                            handleMobileMenuClose();
                          }}
                          className="w-full text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2 flex items-center space-x-3 text-left"
                        >
                          <span className="text-white/90">{item.icon}</span>
                          <span>{item.name}</span>
                        </button>
                      ))}
                </div>

                <Link
                  href="/products"
                  className="mt-6 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold px-6 py-4 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 text-center"
                  onClick={handleMobileMenuClose}
                >
                  Shop Now
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
