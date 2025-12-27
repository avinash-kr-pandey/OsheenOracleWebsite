"use client";
import React from "react";
import { Mail, Phone, MessageCircle, HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 flex flex-col items-center py-12 px-4 pt-32">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-3">
          We&rsquo;re Here to Help 💬
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Need assistance with your order, product, or account? Our support team
          is ready to help you 24/7.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {/* Contact Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-pink-500 text-center">
          <Phone className="w-12 h-12 text-pink-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Call Us</h3>
          <p className="text-gray-500 mb-4">Mon–Sat: 9AM to 9PM</p>
          <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">
            +91 98765 43210
          </button>
        </div>

        {/* Chat Support */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-pink-500 text-center">
          <MessageCircle className="w-12 h-12 text-pink-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Chat with Us
          </h3>
          <p className="text-gray-500 mb-4">
            Instant chat support for your queries
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-5 py-2 rounded-full hover:scale-105 transition">
            Start Chat
          </button>
        </div>

        {/* Email Support */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-pink-500 text-center">
          <Mail className="w-12 h-12 text-pink-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Email Us</h3>
          <p className="text-gray-500 mb-4">
            We usually respond within 24 hours
          </p>
          <button className="bg-pink-600 text-white px-5 py-2 rounded-full hover:bg-pink-700">
            support@shopnow.com
          </button>
        </div>

        {/* FAQ */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition-all border-t-4 border-pink-500 text-center">
          <HelpCircle className="w-12 h-12 text-pink-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">FAQs</h3>
          <p className="text-gray-500 mb-4">
            Find quick answers to common questions
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-5 py-2 rounded-full hover:scale-105 transition">
            View FAQs
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default Support;
