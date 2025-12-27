import React from "react";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-purple-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Terms of Use
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our consultation
            services
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Introduction */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-700 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to Osheen Oracle
            </h2>
            <p className="text-purple-100 leading-relaxed">
              The Osheen Oracle is a platform for OHC (Online Healing
              Consultation) for healing via Tarot card, Reiki, Motivation and
              counseling.
            </p>
            <div className="mt-4 p-4 bg-purple-500 rounded-lg">
              <p className="text-sm italic">
                <strong>Important:</strong> Osheen is not a medical practitioner
                and does not deal in treatment of any physical or mental injury.
                Please consult doctors for medical issues.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="p-8 space-y-12">
            {/* Section 1 - Definitions */}
            <section className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  1
                </span>
                Definitions
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Spell</h4>
                  <p>
                    Online Consultation Time-Period either audio or video, if
                    any availed by you as per the financial terms package.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Consent</h4>
                  <p>
                    Means the free and volunteered consent given by you to opt
                    the spell.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">User</h4>
                  <p>A person who avails OHC from the Osheen.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Visitor</h4>
                  <p>
                    A person visiting the website and other social media
                    platforms without availing OHC.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Product</h4>
                  <p>
                    Means the product provided through the Osheen to the user on
                    his request.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Content</h4>
                  <p>
                    The displayed photos, written material, audio or video
                    recordings, uploaded or live content on Osheen platforms.
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Offending Content
                  </h4>
                  <p>
                    Message, photo, audio or video content that is abusive,
                    vulgar, hate speech, racist, gender discriminative, or
                    unethical.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 - Guarantee or Warranty */}
            <section className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  2
                </span>
                Guarantee or Warranty
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    No Guarantees Provided
                  </h4>
                  <p>
                    Osheen does not provide any guarantee or warranty on online
                    consultations or products purchased from third parties.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Product Responsibility
                    </h4>
                    <p>
                      Osheen is not responsible for product quality, delivery
                      delays, or damages as we only help arrange products from
                      third parties.
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Consultation Effectiveness
                    </h4>
                    <p>
                      OHC may work as per suggested processes but does not
                      guarantee 100% success. Consultations are not always
                      helpful.
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">
                    Important Notice
                  </h4>
                  <p className="text-yellow-700">
                    Osheen has no branches, associations, franchisees or sister
                    concerns. Users are responsible if they contact any
                    imitation of Osheen.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 - Relationship */}
            <section className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  3
                </span>
                Relationship between Osheen and You
              </h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-600">
                  Osheen only consults the user to heal grievances. There is no
                  relationship of service provider-consumer, businessman-buyer
                  or Practitioner-Client between you and Osheen. Consultations
                  are based on special studies of tarot reading, motivation and
                  counseling.
                </p>
              </div>
            </section>

            {/* Section 4 - Data Collection */}
            <section className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  4
                </span>
                Collection of Personal Data
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Data Collected
                  </h4>
                  <p>
                    Name, address, UID Number, Mobile No. and Email ID before
                    receiving Spell Premium.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Data Retention
                  </h4>
                  <p>
                    Data retained in compliance with Indian government
                    regulations and legal requirements.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Data Sharing
                  </h4>
                  <p>
                    Data may be shared with courts or government investigation
                    agencies on written instructions.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 - Termination */}
            <section className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  5
                </span>
                Termination of Spell
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Termination Process
                  </h4>
                  <p>
                    Users may terminate spells by written request to
                    Oracleosheen2@gmail.com or on the platform where the spell
                    was opted.
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Refund Policy
                  </h4>
                  <p className="text-red-600 font-semibold">
                    Money already paid will not be refunded upon termination.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 - Intellectual Property */}
            <section className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  6
                </span>
                Intellectual Property Rights (IPRs)
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Exclusive Properties
                  </h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Displays on social media platforms and website</li>
                    <li>Appearance of spell sessions</li>
                    <li>Graphics, designs, colors, patterns</li>
                    <li>Logo, name, designs, copyrights and trademarks</li>
                    <li>Terms of Use and package plans</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Prohibited Activities
                  </h4>
                  <p>
                    Copying or recording audio/video content, taking
                    screenshots, or reproducing any Osheen content is strictly
                    prohibited. Violators will be prosecuted.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 - Consent */}
            <section className="border-l-4 border-pink-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  7
                </span>
                Consent
              </h3>
              <div className="space-y-4 text-gray-600">
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Marketing Consent
                  </h4>
                  <p>
                    Users consent to Osheen using mobile numbers and email IDs
                    for notifications and sharing with third-party ad agencies.
                  </p>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Advertisement Policy
                  </h4>
                  <p>
                    Osheen is not responsible for advertisements posted by
                    third-party agencies on its platforms, though we endeavor to
                    remove abusive content.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 - General Terms */}
            <section className="border-l-4 border-teal-500 pl-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-8 h-8 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mr-3 text-sm font-bold">
                  8
                </span>
                General Terms
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Age Requirement
                  </h4>
                  <p>Users must be 18 years or older to avail services.</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    No Refunds
                  </h4>
                  <p>Spell premium once paid shall not be refunded.</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Punctuality
                  </h4>
                  <p>Users shall be punctual for allotted timings.</p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Legal Action
                  </h4>
                  <p>
                    Offending content or copyright violations will lead to legal
                    prosecution.
                  </p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Arbitration
                  </h4>
                  <p>
                    Disputes shall be referred to sole arbitration in Mohali,
                    Punjab, India under Arbitration and Conciliation Act 1996.
                  </p>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg md:col-span-2">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Shipping & Returns
                  </h4>
                  <p>
                    Delivery within 3-5 business days. Return within 7 days of
                    purchase. All products are non-refundable.
                  </p>
                </div>
              </div>
            </section>

            {/* Acceptance Section */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">Acceptance of Terms</h3>
              <p className="mb-4">
                I have gone through and understood the above Terms of Use and
                Package plan at
                <a
                  href="https://osheenoracle.com"
                  className="underline ml-1 font-semibold"
                >
                  https://osheenoracle.com
                </a>
              </p>
              <p className="font-semibold">
                Thus, being agreed with the same at my free will and volunteered
                consent, I accept these Terms of Use.
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="bg-gray-800 text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="font-semibold text-lg mb-2">
                  Contact Information
                </h4>
                <p className="text-gray-300">Email: Oracleosheen2@gmail.com</p>
                <p className="text-gray-300">
                  Website: https://osheenoracle.com
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-300 text-sm">
                  <strong>Note:</strong> Terms and conditions can be changed
                  anytime without prior notice.
                  <br />
                  Osheen Oracle reserves the right to refuse service to anyone
                  deemed unfit.
                </p>
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-gray-400">
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

export default TermsOfUse;
