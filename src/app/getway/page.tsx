"use client";
import React from "react";

const PaymentUnavailable = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Gateway Unavailable
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Currently, our payment system is not available. We are working on it
          and will enable it soon. Thank you for your patience!
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PaymentUnavailable;
