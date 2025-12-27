"use client";

import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaFacebook, FaArrowLeft } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { postData, setAuthToken } from "../../utils/api/api";

// Define types for API responses
interface AuthResponse {
  token: string;
  user: UserData;
  message?: string;
  resetToken?: string;
}

interface UserData {
  id?: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message: string;
    };
  };
}

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authStep, setAuthStep] = useState<"login" | "forgot" | "reset">(
    "login"
  );
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      router.push("/");
    }
  }, [router]);

  const handleBack = () => {
    if (authStep === "forgot") {
      setAuthStep("login");
    } else if (authStep === "reset") {
      setAuthStep("forgot");
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response: AuthResponse = await postData("/auth/login", {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Set token in axios headers for future requests
      setAuthToken(response.token);

      toast.success("Login successful!");
      setIsAuthenticated(true);

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: unknown) {
      console.error("Login error:", error);
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
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
      const response: AuthResponse = await postData("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Registration successful! Please login.");

      // Switch to login form
      setIsLogin(true);

      // Clear form
      setName("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      const err = error as ErrorResponse;
      toast.error(
        err.response?.data?.message ||
          "Registration failed. Email might already be registered."
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
      const response: AuthResponse = await postData("/auth/forgot-password", {
        email,
      });

      // Store reset token if provided by backend
      if (response.resetToken) {
        setResetToken(response.resetToken);
      }

      toast.success("Password reset link sent to your email!");
      setAuthStep("reset");
    } catch (error: unknown) {
      console.error("Forgot password error:", error);
      const err = error as ErrorResponse;
      toast.error(err.response?.data?.message || "Failed to send reset email");
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
      // Use the reset token from state or URL
      const token = resetToken || "demo-token";

      const response: AuthResponse = await postData(
        `/auth/reset-password/${token}`,
        {
          password: newPassword,
        }
      );

      toast.success("Password reset successful!");
      setAuthStep("login");
      setNewPassword("");
      setConfirmPassword("");
      setEmail("");
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      const err = error as ErrorResponse;
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Login
  const handleGoogleLogin = () => {
    toast.loading("Redirecting to Google...");
    // Implement Google OAuth
    // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  // Handle GitHub Login
  const handleGithubLogin = () => {
    toast.loading("Redirecting to GitHub...");
    // Implement GitHub OAuth
    // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
  };

  // Handle Facebook Login
  const handleFacebookLogin = () => {
    toast.loading("Redirecting to Facebook...");
    // Implement Facebook OAuth
    // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`;
  };

  // Render Login Form
  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="button"
          onClick={() => setAuthStep("forgot")}
          className="text-sm text-blue-700 mt-1 cursor-pointer hover:underline text-left"
        >
          Forgot Password?
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );

  // Render Registration Form
  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );

  // Render Forgot Password Form
  const renderForgotPasswordForm = () => (
    <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <FaArrowLeft size={14} />
          <span>Back</span>
        </button>
        <h3 className="text-xl font-bold text-blue-900">Reset Password</h3>
        <div className="w-6"></div>
      </div>

      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm">
          Enter your email address and we&rsquo;ll send you a reset link.
        </p>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">Email</label>
        <input
          type="email"
          placeholder="username@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          "Send Reset Link"
        )}
      </button>
    </form>
  );

  // Render Reset Password Form
  const renderResetPasswordForm = () => (
    <form onSubmit={handlePasswordReset} className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <FaArrowLeft size={14} />
          <span>Back</span>
        </button>
        <h3 className="text-xl font-bold text-blue-900">New Password</h3>
        <div className="w-6"></div>
      </div>

      <div className="text-center mb-4">
        <p className="text-gray-600 text-sm">Create your new password</p>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">Email</p>
        <p className="font-semibold text-gray-800">{email}</p>
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">New Password</label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-700 mb-1">
          Confirm New Password
        </label>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );

  // If user is already authenticated, show loading or redirect
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        fontFamily: "var(--font-montserrat)",
        background: "linear-gradient(to bottom right, #d6b8f0, #c7ebf8)",
      }}
    >
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
        }}
      />

      <div className="flex w-4/5 max-w-6xl shadow-lg rounded-2xl overflow-hidden">
        {/* Left Side - Login/Register Form */}
        <div className="w-1/2 bg-white bg-opacity-90 p-10 flex flex-col justify-center rounded-l-2xl">
          {authStep === "login" ? (
            <>
              <h2 className="text-3xl font-bold text-blue-900 mb-6">
                {isLogin ? "Login" : "Register"}
              </h2>

              {isLogin ? renderLoginForm() : renderRegisterForm()}

              <p className="text-center my-4 text-gray-500">or continue with</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleGoogleLogin}
                  className="p-2 rounded-full bg-white shadow hover:scale-105 transition"
                >
                  <FcGoogle size={24} />
                </button>
                <button
                  onClick={handleGithubLogin}
                  className="p-2 rounded-full bg-white shadow hover:scale-105 transition"
                >
                  <FaGithub size={24} />
                </button>
                <button
                  onClick={handleFacebookLogin}
                  className="p-2 rounded-full bg-white shadow hover:scale-105 transition"
                >
                  <FaFacebook size={24} color="#1877F2" />
                </button>
              </div>

              <p className="text-center text-gray-500 mt-6">
                {isLogin
                  ? "Don't have an account yet? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-700 cursor-pointer hover:underline focus:outline-none"
                >
                  {isLogin ? "Register for free" : "Sign in"}
                </button>
              </p>
            </>
          ) : authStep === "forgot" ? (
            renderForgotPasswordForm()
          ) : (
            renderResetPasswordForm()
          )}
        </div>

        {/* Right Side - Welcome Message */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-gradient-to-b from-purple-200 to-blue-200 relative">
          <Image
            src="/images/zodiac-wheel.png"
            alt="Zodiac Wheel"
            className="absolute inset-0 w-full h-full object-contain opacity-20"
            width={500}
            height={500}
          />
          <h1 className="text-4xl font-bold text-purple-700 text-center z-10">
            Welcome to <br /> Osheen Oracle
          </h1>
          <p className="text-gray-600 text-center mt-4 z-10">
            Your personal astrology and tarot reading platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
