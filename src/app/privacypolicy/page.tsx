import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At Osheen Oracle, we are committed to protecting your privacy and
            ensuring that your personal information is handled safely and
            responsibly.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">
              Our Commitment to Your Privacy
            </h2>
            <p className="text-blue-100 leading-relaxed">
              This Privacy Policy outlines the types of information we collect,
              how we use it, and the measures we take to safeguard your data. By
              using our website and services, you consent to the practices
              described in this policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="p-8 space-y-12">
            {/* Section 1 */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  1
                </span>
                Information We Collect
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Personal Information
                  </h4>
                  <p>
                    When you contact us, register for our services, or engage
                    with us, we may collect personal details such as your name,
                    email address, phone number, and any other information you
                    choose to share.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Usage Data
                  </h4>
                  <p>
                    We collect non-personal information about how you interact
                    with our website or services, including IP addresses,
                    browser types, device information, and pages viewed. This
                    data helps us improve our services and website
                    functionality.
                  </p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Cookies and Tracking Technologies
                  </h4>
                  <p>
                    We use cookies to enhance user experience and track usage
                    patterns. Cookies are small files stored on your device that
                    allow us to recognize you and provide tailored content. You
                    can adjust your browser settings to refuse cookies, but
                    doing so may limit some features of our services.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  2
                </span>
                How We Use Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Providing and Managing Services
                  </h4>
                  <p>
                    To offer the services you&rsquo;ve requested and ensure
                    smooth communication with you.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Improving Our Website and Services
                  </h4>
                  <p>
                    To analyze usage trends and optimize performance for better
                    user experience.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Marketing and Communications
                  </h4>
                  <p>
                    To send promotional emails or updates about our services,
                    with your consent. You can opt out at any time.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Responding to Inquiries
                  </h4>
                  <p>
                    To assist you with any questions or concerns and provide
                    timely customer support.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  3
                </span>
                Data Protection and Security
              </h3>
              <div className="bg-purple-50 p-6 rounded-lg">
                <p className="text-gray-600 mb-4">
                  We take your privacy seriously and implement various security
                  measures to protect your personal data. These measures include
                  encryption, firewalls, secure servers, and regular security
                  audits.
                </p>
                <div className="bg-white p-4 rounded border-l-4 border-purple-400">
                  <p className="text-sm text-gray-600 italic">
                    While we take every precaution, no method of data
                    transmission or storage is 100% secure. Therefore, we cannot
                    guarantee complete security but will always strive to
                    protect your information to the best of our ability.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  4
                </span>
                Sharing Your Information
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Service Providers
                  </h4>
                  <p>
                    We may share your information with trusted third-party
                    vendors or service providers who assist us in delivering
                    services, such as email communication, hosting, and customer
                    support.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Legal Requirements
                  </h4>
                  <p>
                    We may disclose your information if required by law,
                    regulation, or legal process to protect the rights,
                    property, or safety of Osheen Oracle or others.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  5
                </span>
                Your Rights and Choices
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Access</h4>
                  <p>
                    You have the right to request a copy of the personal data we
                    hold about you.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Correction
                  </h4>
                  <p>
                    If any of your information is incorrect, you can request
                    that it be updated.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Deletion</h4>
                  <p>
                    You can request the deletion of your personal data, subject
                    to legal obligations.
                  </p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Opt-Out</h4>
                  <p>
                    You can opt-out of marketing communications at any time by
                    following unsubscribe instructions or contacting us
                    directly.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Section 6 */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    6
                  </span>
                  Third-Party Links
                </h3>
                <p className="text-gray-600">
                  Our website may contain links to third-party websites or
                  services that are not under our control. These sites have
                  their own privacy policies, and we encourage you to review
                  them before sharing any personal information. We are not
                  responsible for the content or practices of third-party sites.
                </p>
              </section>

              {/* Section 7 */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    7
                  </span>
                  Children&rsquo;s Privacy
                </h3>
                <p className="text-gray-600">
                  Our services are not intended for individuals under the age of
                  16, and we do not knowingly collect personal information from
                  children. If we become aware that we have inadvertently
                  collected personal data from a child under 16, we will take
                  steps to delete that information as soon as possible.
                </p>
              </section>

              {/* Section 8 */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    8
                  </span>
                  Changes to This Privacy Policy
                </h3>
                <p className="text-gray-600">
                  We reserve the right to update or change this Privacy Policy
                  at any time. When changes are made, the updated policy will be
                  posted on this page with a revised date. We encourage you to
                  periodically review this policy to stay informed about how we
                  are protecting your information.
                </p>
              </section>

              {/* Section 9 */}
              <section className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center mr-2 text-xs font-bold">
                    9
                  </span>
                  Contact Us
                </h3>
                <div className="text-gray-600 space-y-2">
                  <p className="font-semibold">Osheen Oracle</p>
                  <p>Email: Oracleosheen2@gmail.com</p>
                  <p>Phone: +91 8146668328</p>
                  <p>Phone: +91 99158 10965</p>
                </div>
              </section>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-800 text-white p-6 text-center">
            <p className="text-gray-300">
              By using our services, you agree to this Privacy Policy and any
              updates or changes made to it. We value your trust and are
              dedicated to safeguarding your privacy.
            </p>
            <div className="mt-4 text-sm text-gray-400">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
