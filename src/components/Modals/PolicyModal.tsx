"use client";
import React, { useEffect, useState } from "react";

const PolicyModal = ({
  isOpen,
  onClose,
  defaultTab = "privacy",
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "privacy" | "terms";
}) => {
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">(defaultTab);


  // Reset tab when modal opens with new defaultTab
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white max-w-6xl w-full rounded-2xl shadow-2xl relative my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div></div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-all hover:scale-110"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs - Only show if modal is opened from "view all" or similar */}
        <div className="flex border-b bg-gray-50">
          <button
            className={`px-8 py-2 font-semibold text-lg flex-1 transition-all ${
              activeTab === "privacy"
                ? "text-blue-600 border-b-2 border-blue-600 bg-white shadow-sm"
                : "text-gray-600 hover:text-blue-500 hover:bg-blue-50"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            📄 Privacy Policy
          </button>
          <button
            className={`px-8 py-4 font-semibold text-lg flex-1 transition-all ${
              activeTab === "terms"
                ? "text-purple-600 border-b-2 border-purple-600 bg-white shadow-sm"
                : "text-gray-600 hover:text-purple-500 hover:bg-purple-50"
            }`}
            onClick={() => setActiveTab("terms")}
          >
            📝 Terms of Use
          </button>
        </div>

        {/* Content - Scrollable Area */}
        <div className="overflow-y-auto flex-1 p-6 md:p-8">
          {activeTab === "privacy" ? (
            <div className="space-y-8">
              {/* Introduction */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  At <strong>Osheen Oracle</strong>, we are committed to protecting your privacy and ensuring that your personal information is handled safely and responsibly.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                {/* Section 1 */}
                <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Information We Collect</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-500">👤</span>
                        <h4 className="font-semibold text-gray-800">Personal Information</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Name, email, phone number when you contact us or register for services.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-500">📊</span>
                        <h4 className="font-semibold text-gray-800">Usage Data</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        IP addresses, browser types, device info, pages viewed for analytics.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-purple-500">🍪</span>
                        <h4 className="font-semibold text-gray-800">Cookies</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        For enhanced user experience. Adjust browser settings to refuse.
                      </p>
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-yellow-500">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-500">💬</span>
                        <h4 className="font-semibold text-gray-800">Communication Data</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Emails, messages, and any information you share with us.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">How We Use Your Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { icon: "🎯", title: "Service Delivery", desc: "Provide requested services" },
                      { icon: "🚀", title: "Improvement", desc: "Optimize website performance" },
                      { icon: "📧", title: "Communications", desc: "Send updates with consent" },
                      { icon: "🛡️", title: "Security", desc: "Protect against fraud" },
                      { icon: "📈", title: "Analytics", desc: "Analyze usage patterns" },
                      { icon: "🤝", title: "Support", desc: "Respond to inquiries" },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{item.icon}</span>
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.title}</h4>
                            <p className="text-gray-600 text-sm">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section 3 */}
                <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Data Protection & Security</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-red-500 text-2xl">🔐</span>
                        <h4 className="font-semibold text-gray-800">Security Measures</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Encryption</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Firewalls</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Secure Servers</span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Regular Audits</span>
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-start gap-3">
                        <span className="text-yellow-600 text-xl">⚠️</span>
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">Important Note</h4>
                          <p className="text-yellow-700 text-sm">
                            While we implement industry-standard security, no method is 100% secure. We continuously work to protect your data.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4 */}
                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl border border-orange-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold">
                      4
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Your Rights</h3>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: "👁️", title: "Access", color: "blue" },
                      { icon: "✏️", title: "Correction", color: "green" },
                      { icon: "🗑️", title: "Deletion", color: "red" },
                      { icon: "🚫", title: "Opt-Out", color: "purple" },
                    ].map((item, idx) => (
                      <div key={idx} className={`bg-white p-4 rounded-lg shadow-sm text-center`}>
                        <div className={`w-12 h-12 ${item.color === 'blue' ? 'bg-blue-100' : item.color === 'green' ? 'bg-green-100' : item.color === 'red' ? 'bg-red-100' : 'bg-purple-100'} rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <span className="text-2xl">{item.icon}</span>
                        </div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                    <span className="text-2xl">📞</span>
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-500">📧</span>
                        <div>
                          <p className="font-medium text-gray-700">Email</p>
                          <p className="text-gray-600">Oracleosheen2@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-green-500">🌐</span>
                        <div>
                          <p className="font-medium text-gray-700">Website</p>
                          <p className="text-gray-600">https://osheenoracle.com</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-purple-500">📱</span>
                        <div>
                          <p className="font-medium text-gray-700">Phone</p>
                          <p className="text-gray-600">+91 8146668328</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-orange-500">📱</span>
                        <div>
                          <p className="font-medium text-gray-700">Alternate Phone</p>
                          <p className="text-gray-600">+91 99158 10965</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Introduction */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Welcome to <strong>Osheen Oracle</strong> - Platform for Online Healing Consultation (OHC) via Tarot, Reiki, Motivation & Counseling.
                </p>
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2 text-red-700 mb-2">
                    <span className="text-xl">⚠️</span>
                    <h4 className="font-bold">Important Notice</h4>
                  </div>
                  <p className="text-red-600 text-sm">
                    Osheen is <strong>not a medical practitioner</strong> and does not treat physical/mental injuries. Please consult doctors for medical issues.
                  </p>
                </div>
              </div>

              {/* Definitions */}
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Key Definitions</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { term: "Spell", desc: "Consultation time-period (audio/video)" },
                    { term: "User", desc: "Person availing OHC services" },
                    { term: "Visitor", desc: "Person browsing without OHC" },
                    { term: "Product", desc: "Items arranged from third parties" },
                    { term: "Content", desc: "All displayed materials & media" },
                    { term: "Offending Content", desc: "Abusive, vulgar, hate speech" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        <h4 className="font-semibold text-gray-800">{item.term}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantee Warning */}
              <div className="bg-gradient-to-r from-red-50 to-white p-6 rounded-xl border border-red-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Important Limitations</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-red-500 text-2xl">❌</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">No Guarantees Provided</h4>
                        <p className="text-gray-600 text-sm">
                          OHC may not guarantee 100% success. Consultations are not always helpful.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-orange-500 text-2xl">📦</span>
                      <div>
                        <h4 className="font-semibold text-gray-800">Third-Party Products</h4>
                        <p className="text-gray-600 text-sm">
                          Osheen is <strong>not responsible</strong> for product quality, delivery delays, or damages from third-party suppliers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-600 text-xl">🚫</span>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-1">Official Notice</h4>
                        <p className="text-yellow-700 text-sm">
                          Osheen has <strong>no branches, franchisees, or sister concerns</strong>. Users are responsible if contacting imitations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Collection */}
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Data Collection & Retention</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-green-500">📋</span>
                      Collected Information
                    </h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li className="flex items-center gap-2">✓ Full Name</li>
                      <li className="flex items-center gap-2">✓ Address Details</li>
                      <li className="flex items-center gap-2">✓ Mobile Number</li>
                      <li className="flex items-center gap-2">✓ Email ID</li>
                      <li className="flex items-center gap-2">✓ UID/Aadhar Number</li>
                    </ul>
                  </div>
                  <div className="bg-white p-5 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-red-500">🔒</span>
                      Data Sharing
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      Data may be shared with:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600 text-sm">Courts & Legal Authorities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-600 text-sm">Government Investigation Agencies</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Points */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Termination */}
                <div className="bg-gradient-to-r from-orange-50 to-white p-6 rounded-xl border border-orange-100">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-orange-500 text-xl">⏹️</span>
                    Termination Policy
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-700 font-medium mb-1">How to Terminate:</p>
                      <p className="text-gray-600 text-sm">Email request to Oracleosheen2@gmail.com</p>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center gap-2 text-red-700">
                        <span className="text-xl">💰</span>
                        <p className="font-bold">Important: No Refunds</p>
                      </div>
                      <p className="text-red-600 text-sm mt-1">Money already paid will not be refunded upon termination.</p>
                    </div>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div className="bg-gradient-to-r from-indigo-50 to-white p-6 rounded-xl border border-indigo-100">
                  <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-indigo-500 text-xl">⚖️</span>
                    Intellectual Property
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-700 font-medium mb-2">Protected Content:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Logo</span>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Designs</span>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Content</span>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">Trademarks</span>
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-red-600 text-sm font-medium">
                        ⚠️ Copying, recording, or reproducing any content is strictly prohibited.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-xl border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-6 text-center">📌 Quick Facts</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: "🎂", label: "Age Requirement", value: "18+ Years" },
                    { icon: "⏰", label: "Punctuality", value: "Mandatory" },
                    { icon: "⚖️", label: "Arbitration", value: "Mohali, Punjab" },
                    { icon: "📦", label: "Delivery Time", value: "3-5 Days" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg shadow-sm text-center">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-gray-600 text-sm mb-1">{item.label}</p>
                      <p className="font-semibold text-gray-800">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acceptance */}
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-xl border border-green-200 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Acceptance of Terms</h3>
                <p className="text-gray-600 mb-4">
                  I have read and understood the Terms of Use at{" "}
                  <a href="https://osheenoracle.com" className="text-blue-600 font-semibold hover:underline">
                    https://osheenoracle.com
                  </a>
                </p>
                <div className="bg-white p-4 rounded-lg border max-w-md mx-auto">
                  <p className="text-gray-700 font-semibold">
                    I accept these Terms of Use at my free will and volunteered consent.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default PolicyModal;