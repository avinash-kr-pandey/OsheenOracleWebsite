"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaAppleAlt, FaArrowLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast, Toaster } from "react-hot-toast";
import { postData } from "../../utils/api/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

// Define types for API responses
interface AuthResponse {
  success?: boolean;
  token?: string;
  user?: UserData;
  message?: string;
  resetToken?: string;
  otpId?: string;
  verified?: boolean;
  requiresOtp?: boolean;
  data?: {
    token?: string;
    user?: UserData;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  joinDate?: string;
  membership?: string;
  loyaltyPoints?: number;
  dateOfBirth?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message: string;
      requiresOtp?: boolean;
      otpId?: string;
    };
  };
  message?: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authStep, setAuthStep] = useState<
    "login" | "otp" | "forgot" | "reset" | "newPassword"
  >("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [otpId, setOtpId] = useState("");

  const router = useRouter();
  const {
    user,
    isAuthenticated,
    loading: authLoading,
    login,
    checkAuth,
  } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User already authenticated, redirecting...");
      router.push("/");
    }
  }, [isAuthenticated, user, router]);

  // Handle OTP input
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  // Handle back navigation
  const handleBack = () => {
    if (authStep === "otp") {
      setAuthStep("login");
      setOtp(["", "", "", "", "", ""]);
    } else if (authStep === "forgot") {
      setAuthStep("login");
    } else if (authStep === "reset") {
      setAuthStep("forgot");
      setOtp(["", "", "", "", "", ""]);
    } else if (authStep === "newPassword") {
      setAuthStep("reset");
    }
  };

  // Handle Login - UPDATED WITH AUTH CONTEXT
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = (await postData("/auth/login", {
        email,
        password,
      })) as AuthResponse;

      console.log("Login API Response:", response);

      // Handle different response formats
      let token: string | undefined;
      let userData: UserData | undefined;

      if (response.token && response.user) {
        // Format 1: Direct token and user in response
        token = response.token;
        userData = response.user;
      } else if (response.data?.token && response.data?.user) {
        // Format 2: Nested in data object
        token = response.data.token;
        userData = response.data.user;
      } else if (response.success && response.token) {
        // Format 3: Success with token
        token = response.token;
        userData = response.user;
      }

      if (token && userData) {
        // Call AuthContext login function
        login(token, userData);

        toast.success("Login successful!");

        // Check auth state and redirect
        setTimeout(() => {
          checkAuth();
          router.push("/");
        }, 500);
      } else if (response.requiresOtp) {
        // Handle OTP requirement
        if (response.otpId) {
          setOtpId(response.otpId);
        }
        setAuthStep("otp");
        toast.success("OTP sent to your email!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      console.error("Login error:", err);

      // Check if error is due to OTP requirement
      if (err.response?.data?.requiresOtp) {
        if (err.response.data.otpId) {
          setOtpId(err.response.data.otpId);
        }
        setAuthStep("otp");
        toast.success("OTP sent to your email!");
      } else {
        toast.error(
          err.response?.data?.message || err.message || "Login failed"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Registration - UPDATED
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Combine first and last name
    const fullName = `${firstName} ${lastName}`.trim();

    if (!fullName || !email || !password) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = (await postData("/auth/register", {
        name: fullName,
        email,
        password,
      })) as AuthResponse;

      console.log("Register API Response:", response);

      // Auto-login after successful registration if token is returned
      if (response.token && response.user) {
        login(response.token, response.user);
        toast.success("Registration successful! You are now logged in.");

        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
      }

      // Clear form
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      const response = (await postData("/auth/forgot-password", {
        email,
      })) as AuthResponse;

      // If backend returns an OTP ID, store it
      if (response.otpId) {
        setOtpId(response.otpId);
      }

      toast.success("OTP sent to your email!");
      setAuthStep("reset");
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification for Login - UPDATED
  const handleLoginOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      setIsLoading(false);
      return;
    }

    try {
      const response = (await postData("/auth/verify-otp", {
        email,
        otp: enteredOtp,
        otpId,
      })) as AuthResponse;

      if (response.verified && response.token && response.user) {
        // Login after OTP verification
        login(response.token, response.user);

        toast.success("Login successful!");

        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        throw new Error("OTP verification failed");
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP Verification for Password Reset
  const handleResetOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      setIsLoading(false);
      return;
    }

    try {
      const response = (await postData("/auth/verify-reset-otp", {
        email,
        otp: enteredOtp,
        otpId,
      })) as AuthResponse;

      if (response.verified && response.resetToken) {
        setResetToken(response.resetToken);
        setAuthStep("newPassword");
        toast.success("OTP verified! Now set your new password.");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Password Reset
  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const response = (await postData(
        `/auth/reset-password/${resetToken || "demo-token"}`,
        {
          password: newPassword,
        }
      )) as AuthResponse;

      toast.success("Password reset successful!");
      setAuthStep("login");
      setNewPassword("");
      setConfirmPassword("");
      setOtp(["", "", "", "", "", ""]);
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message || err.message || "Failed to reset password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    toast.loading("Redirecting to Google...");
    // Implement Google OAuth here
    // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  // Handle Apple Login
  const handleAppleLogin = () => {
    toast.loading("Redirecting to Apple...");
    // Implement Apple OAuth here
    // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/apple`;
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      if (authStep === "reset") {
        // For password reset
        await postData("/auth/forgot-password", { email });
        toast.success("OTP resent to your email!");
      } else if (authStep === "otp") {
        // For login OTP
        await postData("/auth/resend-otp", { email });
        toast.success("OTP resent to your email!");
      }
    } catch (error: unknown) {
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message || err.message || "Failed to resend OTP"
      );
    }
  };

  // Render OTP form based on context
  const renderOtpForm = (context: "login" | "reset") => (
    <form
      onSubmit={
        context === "login" ? handleLoginOtpSubmit : handleResetOtpSubmit
      }
      className="space-y-4 md:space-y-6"
    >
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          Enter OTP
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          We sent a verification code to
        </p>
        <p className="font-semibold text-gray-800 text-sm md:text-base">
          {email}
        </p>
      </div>

      <div className="flex justify-center gap-2 md:gap-3 mb-4 md:mb-6">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={data}
            onChange={(e) =>
              handleOtpChange(e.target as HTMLInputElement, index)
            }
            onFocus={(e) => e.target.select()}
            className="w-10 h-10 md:w-12 md:h-12 text-center text-lg md:text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.some((digit) => digit === "")}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Verifying...
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      <div className="text-center">
        <p className="text-gray-600 text-xs md:text-sm">
          Didn&apos;t receive the code?{" "}
          <button
            type="button"
            onClick={handleResendOtp}
            className="text-gray-800 font-semibold hover:underline cursor-pointer transition-all duration-300"
            disabled={isLoading}
          >
            Resend
          </button>
        </p>
      </div>
    </form>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold pb-2 text-center text-gray-700">
        Sign in
      </h1>

      <div className="flex flex-col gap-4 md:gap-6">
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <button
            type="button"
            onClick={() => setAuthStep("forgot")}
            className="text-sm text-gray-600 hover:underline transition-all duration-300 text-left"
          >
            Forgot password?
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </div>

        <div className="text-center mt-2 md:mt-4">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="text-gray-800 font-semibold hover:underline focus:outline-none cursor-pointer transition-all duration-300"
            >
              Sign up
            </button>
          </p>
        </div>

        <div className="relative my-2 md:my-4 text-center">
          <span className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></span>
          <span className="relative bg-white/40 px-3 text-gray-600 text-sm">
            or
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FcGoogle size={18} className="md:size-[20px]" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FaAppleAlt size={16} className="text-[#0078D4] md:size-[18px]" />
            <span>Apple</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4 md:mt-6 leading-5">
          Protected by reCAPTCHA and subject to the{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          Reset Password
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          Enter your email address and we&apos;ll send you an OTP to reset your
          password.
        </p>
      </div>

      <input
        placeholder="Email address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending OTP...
          </>
        ) : (
          "Send OTP"
        )}
      </button>
    </form>
  );

  const renderNewPasswordForm = () => (
    <form onSubmit={handlePasswordReset} className="space-y-4 md:space-y-6">
      <div className="flex items-center justify-between mb-2 md:mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all duration-300 text-sm md:text-base"
        >
          <FaArrowLeft size={14} className="md:size-[16px]" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-700 flex-1">
          New Password
        </h1>
        <div className="w-6 md:w-8"></div>
      </div>

      <div className="text-center mb-4 md:mb-6">
        <p className="text-gray-600 text-sm md:text-base">
          Create your new password
        </p>
      </div>

      {/* Show the email that was entered */}
      <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
        <p className="text-xs md:text-sm text-gray-600">Email</p>
        <p className="font-semibold text-gray-800 text-sm md:text-base">
          {email}
        </p>
      </div>

      <input
        placeholder="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
        required
      />

      <input
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
        required
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleRegister} className="space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold pb-2 md:pb-6 text-center text-gray-700">
        Create account
      </h1>

      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 transition-all duration-300 text-sm md:text-base"
            required
          />
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 transition-all duration-300 text-sm md:text-base"
            required
          />
        </div>
        <input
          placeholder="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />
        <input
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-sm md:text-base"
          required
        />

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300 mt-1"
            required
          />
          <label htmlFor="terms" className="text-xs md:text-sm text-gray-600">
            I agree to the{" "}
            <a
              href="#"
              className="underline text-black hover:text-gray-700 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline text-black hover:text-gray-700 transition-colors"
            >
              Privacy Policy
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="text-center mt-1 md:mt-2">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className="text-gray-800 font-semibold hover:underline focus:outline-none cursor-pointer transition-all duration-300"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="relative my-2 md:my-4 text-center">
          <span className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></span>
          <span className="relative bg-white/40 px-3 text-gray-600 text-sm">
            or
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FcGoogle size={18} className="md:size-[20px]" />
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleAppleLogin}
            className="flex items-center justify-center gap-2 w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm md:text-base"
          >
            <FaAppleAlt size={16} className="text-[#0078D4] md:size-[18px]" />
            <span>Apple</span>
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4 md:mt-6 leading-5">
          Protected by reCAPTCHA and subject to the{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="underline text-black hover:text-gray-700 transition-colors"
          >
            Terms of Service
          </a>
          .
        </p>
      </div>
    </form>
  );

  // If user is already authenticated, show loading or redirect
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#FBB5E7] to-[#C4F9FF] relative overflow-hidden">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10B981",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "#EF4444",
            },
          },
          loading: {
            duration: Infinity,
          },
        }}
      />

      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <Image
          src="/logo.png"
          alt="logo"
          width={80}
          height={80}
          className="md:w-[130px] md:h-[120px]"
        />
      </div>

      {/* Main Section */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 md:px-16 py-6 md:py-10 gap-8 md:gap-0 md:pt-0 pt-30">
        {/* Background circular image */}
        <Image
          src="/images/roundimage.png"
          alt="background illustration"
          width={650}
          height={650}
          className="absolute opacity-80 md:opacity-70 md:pt-10 pt-0 rotate-slow rounded-full"
        />

        {/* Text content - Hidden on small screens, visible on medium and above */}
        <div className="relative z-10 px-4 lg:px-6 text-center md:text-left w-full lg:w-auto md:h-auto h-[60vh]">
          <div className="lg:block pt-20">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#636363] mb-3 lg:mb-4">
              One tool for your
            </h1>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#636363] mb-4 lg:mb-6">
              whole team needs
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-4 lg:mb-6">
              We are lorem ipsum team dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>

            {/* Avatars + text */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-3 sm:space-y-0 sm:space-x-3 mt-4">
              <div className="flex -space-x-3">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSoKn8IQb33N82TB_LkwVNhgHmlqTuZTcWA&s"
                  alt="user1"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSoKn8IQb33N82TB_LkwVNhgHmlqTuZTcWA&s"
                  alt="user2"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjSoKn8IQb33N82TB_LkwVNhgHmlqTuZTcWA&s"
                  alt="user3"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white transition-all duration-300 hover:scale-110 w-8 h-8 sm:w-10 sm:h-10"
                />
              </div>
              <span className="text-gray-700 text-xs sm:text-sm font-medium">
                3k+ people joined us, now it&apos;s your turn
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="w-full max-w-md lg:max-w-none lg:w-auto">
          <div className="bg-white/40 backdrop-blur-md p-6 sm:p-8 md:p-10 md:px-14 rounded-2xl md:rounded-3xl shadow-2xl w-full lg:w-[550px] h-auto max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {isLogin ? (
              <>
                {authStep === "login" && renderLoginForm()}
                {authStep === "otp" && renderOtpForm("login")}
                {authStep === "forgot" && renderForgotPasswordForm()}
                {authStep === "reset" && renderOtpForm("reset")}
                {authStep === "newPassword" && renderNewPasswordForm()}
              </>
            ) : (
              renderSignupForm()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
