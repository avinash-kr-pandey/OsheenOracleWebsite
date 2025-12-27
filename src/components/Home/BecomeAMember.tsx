"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Types
interface FormDataType {
  name: string;
  email: string;
  phone: string;
  plan: string;
  newsletter: boolean;
}

interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
}

interface Testimonial {
  avatar: string;
  content: string;
  name: string;
  role: string;
}

interface AddOn {
  service: string;
  price: string;
}

// Data
const membershipPlans: MembershipPlan[] = [
  {
    id: "basic-aura",
    name: "Basic Aura Subscription",
    price: "₹2,100",
    period: "month",
    features: [
      "1 Tarot Guidance Session/month (voice note)",
      "1 Chakra Scanning",
      "Access to voice note healing session",
      "1 Prediction (1 question)",
      "1 Affirmation Sheet",
      "Priority WhatsApp replies within 3 days",
    ],
  },
  {
    id: "tarot-insight",
    name: "Tarot Insight Subscription",
    price: "₹4,200",
    period: "month",
    features: [
      "2 Full Tarot Readings/month (30 mins each)",
      "2 Quick Doubt Tarot Checks/month",
      "1 Decision Guidance Session/month",
      "Access to Members Only monthly prediction",
      "Priority WhatsApp support (48 hours)",
      "1 Healing session with Osheen",
    ],
    popular: true,
  },
  {
    id: "healing-energy",
    name: "Healing & Energy Subscription",
    price: "₹6,300",
    period: "month",
    features: [
      "2 Energy Healings/month (Reiki/Chakra/Angel)",
      "2 Aura Scan Reports/month",
      "1 Ritual/month",
      "1 Guided Meditation/month",
      "Monthly Readings (voice note)",
      "WhatsApp priority (24 hrs)",
    ],
  },
  {
    id: "premium-manifestation",
    name: "Premium Manifestation",
    price: "₹10,500",
    period: "month",
    features: [
      "1 Major Ritual Every Month",
      "2 Tarot Readings/month",
      "Unlimited tarot doubts (text-based)",
      "2 Healings/month + Full Aura Scan",
      "Personal Manifestation Roadmap",
      "VIP replies within 12 hours",
    ],
  },
];

const benefits: Benefit[] = [
  {
    icon: "🔮",
    title: "Spiritual Guidance",
    description:
      "Receive personalized tarot readings and spiritual insights tailored to your journey.",
  },
  {
    icon: "✨",
    title: "Energy Healing",
    description:
      "Experience powerful Reiki, Chakra, and Angel healing sessions for emotional transformation.",
  },
  {
    icon: "📿",
    title: "Sacred Rituals",
    description:
      "Participate in monthly rituals for manifestation, protection, and spiritual growth.",
  },
  {
    icon: "🌟",
    title: "Aura Cleansing",
    description:
      "Regular aura scans and cleansing sessions to maintain your energetic balance.",
  },
  {
    icon: "💫",
    title: "Manifestation Support",
    description:
      "Get personalized manifestation roadmaps and scripting guidance for your goals.",
  },
  {
    icon: "📞",
    title: "Priority Support",
    description:
      "Direct access to Osheen with priority WhatsApp replies and call support.",
  },
];

const stats: Stat[] = [
  { number: "5,000+", label: "Spiritual Seekers" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "10+", label: "Years Experience" },
  { number: "24/7", label: "Energy Support" },
];

const testimonials: Testimonial[] = [
  {
    avatar: "🙏",
    content:
      "Osheen's guidance transformed my life. The healing sessions brought peace I never knew was possible.",
    name: "Priya Sharma",
    role: "Basic Aura Member",
  },
  {
    avatar: "💖",
    content:
      "The tarot insights helped me make crucial life decisions with confidence. Worth every penny!",
    name: "Rahul Verma",
    role: "Tarot Insight Member",
  },
  {
    avatar: "🌟",
    content:
      "The manifestation rituals actually work! I manifested my dream job within 3 months of joining.",
    name: "Anita Patel",
    role: "Premium Member",
  },
];

const addOns: AddOn[] = [
  { service: "Extra Tarot Session", price: "₹2,100" },
  { service: "Extra Healing Session", price: "₹5,100" },
  { service: "Urgent Reading (30 minutes)", price: "₹21,000" },
  { service: "Manifestation Coaching (weekly)", price: "₹11,000" },
];

const BecomeAMember: React.FC = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    phone: "",
    plan: "",
    newsletter: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePlanSelect = (planId: string): void => {
    setFormData((prev: FormDataType) => ({ ...prev, plan: planId }));
  };

  const handlePlanDetails = (planId: string): void => {
    router.push(`/details/${planId}`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.plan) {
      alert("Please select a spiritual plan to continue");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      `🔮 Welcome to Osheen Oracle, ${formData.name}! Your ${
        membershipPlans.find((p) => p.id === formData.plan)?.name
      } membership is now active!`
    );
    setIsSubmitting(false);
  };

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 blur-xl animate-pulse"></div>
      <div className="fixed bottom-40 right-20 w-16 h-16 bg-indigo-300 rounded-full opacity-30 blur-lg animate-bounce"></div>
      <div className="fixed top-1/3 right-1/4 w-12 h-12 bg-pink-300 rounded-full opacity-40 blur-md animate-pulse"></div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-purple-100/50 border border-purple-200 mb-8">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 animate-ping"></span>
            <span className="text-purple-700 font-medium text-sm">
              Join 5,000+ Spiritual Seekers
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 leading-tight">
            Awaken Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Spiritual Journey
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join Osheen Oracle&rsquo;s sacred community where ancient wisdom
            meets modern spirituality. Transform your life with divine guidance
            and energetic healing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl  bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium mt-1 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Plans - Improved Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl  text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Spiritual Path
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each plan is crafted to support your unique spiritual journey and
              personal growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {membershipPlans.map((plan) => (
              <div
                key={plan.id} 
                onClick={() => handlePlanSelect(plan.id)}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 h-full flex flex-col ${
                  formData.plan === plan.id
                    ? "border-purple-500 bg-white"
                    : "border-gray-300 bg-white hover:border-purple-300"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md">
                      ⭐ Most Popular ⭐
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 ml-1 text-lg">
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <div className="flex-grow mb-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-left">
                        <span className="text-purple-500 mr-2 mt-0.5 flex-shrink-0">
                          ✨
                        </span>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mt-auto">
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                      formData.plan === plan.id
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                        : plan.popular
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
                        : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600"
                    }`}
                  >
                    {formData.plan === plan.id ? "✓ Selected" : "Select Plan"}
                  </button>

                  <button
                    onClick={() => handlePlanDetails(plan.id)}
                    className="w-full py-2 px-4 border border-purple-300 text-purple-600 rounded-xl font-medium text-sm hover:bg-purple-50 transition-all duration-300"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl  text-gray-900 mb-4">
              Divine{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Benefits
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Additional{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-600">
              Enhance your spiritual experience with these services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addOn, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-xl border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">
                    {addOn.service}
                  </span>
                  <span className="text-purple-600 font-bold">
                    {addOn.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Transformational{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-3">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-4 italic text-sm">
                  {testimonial.content}
                </p>
                <div>
                  <div className="font-bold text-gray-900 text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Begin Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Spiritual Transformation
                </span>
              </h2>
              <p className="text-lg text-gray-600">
                Join Osheen Oracle and unlock your divine potential
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300 bg-white text-sm"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300 bg-white text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all duration-300 bg-white text-sm"
                  placeholder="Your contact number"
                />
              </div>

              {/* Improved Plan Selection in Form */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Your Spiritual Plan *
                </label>
                {!formData.plan && (
                  <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-700 text-sm">
                      Please select a plan to continue
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {membershipPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 h-full ${
                        formData.plan === plan.id
                          ? "border-purple-500 bg-purple-50 shadow-md"
                          : "border-gray-300 bg-white hover:border-purple-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900 text-sm leading-tight">
                          {plan.name}
                        </span>
                        {plan.popular && (
                          <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs font-bold ml-2">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-purple-600 font-bold text-sm mb-1">
                        {plan.price}/{plan.period}
                      </div>
                      <div className="text-xs text-gray-600">
                        {plan.features.length} divine features
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
                />
                <label
                  htmlFor="newsletter"
                  className="ml-3 text-sm text-gray-700"
                >
                  Receive weekly spiritual insights, moon cycle guidance, and
                  exclusive Osheen Oracle updates
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.plan}
                className="w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold text-base hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Activating Your Spiritual Journey...
                  </span>
                ) : (
                  "🔮 Begin Your Spiritual Journey 🔮"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BecomeAMember;
