"use client"

import React, { useState } from "react";

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "card",
      title: "Visa Classic",
      number: "**** **** **** 4242",
      expiry: "12/25",
      isDefault: true,
      icon: "💳",
      provider: "Visa",
    },
    {
      id: 2,
      type: "card",
      title: "MasterCard Gold",
      number: "**** **** **** 5678",
      expiry: "09/24",
      isDefault: false,
      icon: "💳",
      provider: "MasterCard",
    },
    {
      id: 3,
      type: "paypal",
      title: "PayPal Account",
      number: "user@example.com",
      expiry: "",
      isDefault: false,
      icon: "🔵",
      provider: "PayPal",
    },
    {
      id: 4,
      type: "wallet",
      title: "Google Pay",
      number: "user@gmail.com",
      expiry: "",
      isDefault: false,
      icon: "📱",
      provider: "Google Pay",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    const newPaymentMethod = {
      id: paymentMethods.length + 1,
      type: "card",
      title: newCard.cardHolder,
      number: `**** **** **** ${newCard.cardNumber.slice(-4)}`,
      expiry: newCard.expiryDate,
      isDefault: newCard.isDefault,
      icon: "💳",
      provider: "Visa",
    };

    if (newCard.isDefault) {
      setPaymentMethods((prev) => [
        newPaymentMethod,
        ...prev.map((pm) => ({ ...pm, isDefault: false })),
      ]);
    } else {
      setPaymentMethods((prev) => [...prev, newPaymentMethod]);
    }

    setNewCard({
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    });
    setShowAddForm(false);
  };

  const setAsDefault = (id: number) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods((prev) => {
      const newMethods = prev.filter((pm) => pm.id !== id);
      if (newMethods.length > 0 && !newMethods.some((pm) => pm.isDefault)) {
        newMethods[0].isDefault = true;
      }
      return newMethods;
    });
  };

  const getProviderLogo = (provider: string) => {
    switch (provider) {
      case "Visa":
        return (
          <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
            Visa
          </div>
        );
      case "MasterCard":
        return (
          <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center text-white font-bold text-xs">
            Master
          </div>
        );
      case "PayPal":
        return (
          <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-xs">
            PayPal
          </div>
        );
      case "Google Pay":
        return (
          <div className="w-12 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xs">
            G Pay
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-32 min-h-screen bg-gradient-to-br from-pink-50 via-white to-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path
                  fillRule="evenodd"
                  d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-amber-600 bg-clip-text text-transparent mb-3">
            Payment Methods
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your payment options for faster checkout
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Saved Cards</p>
                <p className="text-3xl font-bold text-gray-800">
                  {paymentMethods.filter((pm) => pm.type === "card").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">💳</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Digital Wallets
                </p>
                <p className="text-3xl font-bold text-gray-800">
                  {paymentMethods.filter((pm) => pm.type !== "card").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Default Method
                </p>
                <p className="text-lg font-bold text-gray-800 truncate">
                  {paymentMethods.find((pm) => pm.isDefault)?.title || "None"}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Card
          </button>
          <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                clipRule="evenodd"
              />
            </svg>
            Security Settings
          </button>
        </div>

        {/* Add Card Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add New Card
                  </h2>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newCard.cardNumber}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cardNumber: e.target.value })
                      }
                      required
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      value={newCard.cardHolder}
                      onChange={(e) =>
                        setNewCard({ ...newCard, cardHolder: e.target.value })
                      }
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={newCard.expiryDate}
                        onChange={(e) =>
                          setNewCard({ ...newCard, expiryDate: e.target.value })
                        }
                        required
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={newCard.cvv}
                        onChange={(e) =>
                          setNewCard({ ...newCard, cvv: e.target.value })
                        }
                        required
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newCard.isDefault}
                      onChange={(e) =>
                        setNewCard({ ...newCard, isDefault: e.target.checked })
                      }
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Set as default payment method
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddForm(false)}
                      className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-amber-500 text-white rounded-xl hover:from-pink-600 hover:to-amber-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      Add Card
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* List Header */}
          <div className="bg-gradient-to-r from-pink-500 to-amber-500 px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-lg font-semibold">
                Saved Payment Methods
              </h2>
              <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                {paymentMethods.length} methods
              </span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="divide-y divide-gray-100">
            {paymentMethods.map((method, index) => (
              <div
                key={method.id}
                className={`p-6 transition-all duration-300 hover:bg-gray-50 animate-slide-up ${
                  method.isDefault
                    ? "bg-amber-50 border-l-4 border-amber-500"
                    : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Icon and Provider */}
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                          method.isDefault
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {method.icon}
                      </div>
                      {getProviderLogo(method.provider)}
                    </div>

                    {/* Card Details */}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3
                          className={`font-semibold text-lg ${
                            method.isDefault ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {method.title}
                        </h3>
                        {method.isDefault && (
                          <span className="inline-block bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{method.number}</p>
                      {method.expiry && (
                        <p className="text-sm text-gray-500">
                          Expires {method.expiry}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => setAsDefault(method.id)}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors duration-300"
                        title="Set as default"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => deletePaymentMethod(method.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      title="Delete payment method"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Method Card */}
          <div
            onClick={() => setShowAddForm(true)}
            className="border-2 border-dashed border-gray-300 m-6 rounded-2xl hover:border-pink-400 hover:bg-pink-50 transition-all duration-300 cursor-pointer"
          >
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Add Payment Method
              </h3>
              <p className="text-gray-600">Add a new card or digital wallet</p>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Payment Security Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Your payment information is encrypted and secure</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>We never store your CVV number</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>PCI DSS compliant payment processing</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>24/7 fraud monitoring and protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PaymentMethods;
