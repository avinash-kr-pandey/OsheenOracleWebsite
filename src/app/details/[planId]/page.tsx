// app/details/[planId]/page.tsx
"use client";
import React from "react";
import { useParams } from "next/navigation";

import Link from "next/link";
import { MembershipPlan, membershipPlans } from "@/utils/plandata";

const PlanDetailsPage = () => {
  const params = useParams();
  const planId = params.planId as string;

  const plan: MembershipPlan | undefined = membershipPlans.find(
    (p) => p.id === planId
  );

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The spiritual plan you&rsquo;re looking for doesn&rsquo;t exist.
          </p>
          <Link
            href="/become-a-member"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            Return to Plans
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen "
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
        fontFamily: "var(--font-montserrat)",
      }}
    >
      {/* Header */}
      <div className="relative bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link
              href="/"
              className="flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-300"
            >
              ← Back to All Plans
            </Link>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                {plan.price}
                <span className="text-lg text-gray-600">/{plan.period}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {plan.popular && (
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-sm  mb-6 shadow-lg">
                ⭐ Most Popular Choice ⭐
              </div>
            )}
            <h1 className="text-4xl md:text-6xl  text-gray-900 mb-6 leading-tight">
              {plan.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {plan.longDescription}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="text-2xl  text-purple-600 mb-2">
                {plan.features.length}
              </div>
              <div className="text-gray-600 text-sm">Divine Features</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="text-2xl  text-purple-600 mb-2">
                {plan.includedServices.length}
              </div>
              <div className="text-gray-600 text-sm">Core Services</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-sm">Energetic Support</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">VIP</div>
              <div className="text-gray-600 text-sm">Priority Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Features & Benefits */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  What&rsquo;s Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl border border-purple-100"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">✓</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Service Details
                </h2>
                <div className="space-y-6">
                  {plan.includedServices.map((service, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-purple-500 pl-6 py-2"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {service.name}
                        </h3>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {service.sessions}
                        </span>
                      </div>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {plan.faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Plan Card */}
              <div className="bg-white rounded-2xl shadow-lg border-2 border-purple-500 p-8 sticky top-28">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-2 text-lg">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <Link
                  href="/getway"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl block text-center"
                >
                  Choose This Plan
                </Link>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    ✨ Begin your transformation today ✨
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Key Benefits
                </h3>
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-purple-500 mr-3 mt-1">✦</span>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended For */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Perfect For
                </h3>
                <ul className="space-y-2">
                  {plan.recommendedFor.map((persona, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                      <span className="text-gray-700 text-sm">{persona}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of spiritual seekers who have transformed their lives
            with Osheen Oracle&rsquo;s guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Select This Plan
            </Link>
            {/* <Link
              href="/become-a-member"
              className="border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
            >
              Compare All Plans
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanDetailsPage;
