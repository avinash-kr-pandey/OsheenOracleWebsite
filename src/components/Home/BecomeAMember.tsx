"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

// Types
interface FormDataType {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
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

interface CountryCode {
  code: string;
  name: string;
  flag: string;
}

// Country codes data
const countryCodes: CountryCode[] = [
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+1", name: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
  { code: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "+33", name: "France", flag: "🇫🇷" },
  { code: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "+971", name: "UAE", flag: "🇦🇪" },
  { code: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "+60", name: "Malaysia", flag: "🇲🇾" },
];

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
    countryCode: "+91",
    plan: "",
    newsletter: true,
  });

  const [errors, setErrors] = useState<Partial<FormDataType & { phone: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const router = useRouter();

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<FormDataType & { phone: string }> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (formData.phone && phoneDigits.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }

    // Plan validation
    if (!formData.plan) {
      newErrors.plan = "Please select a spiritual plan";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev: FormDataType) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFormData((prev: FormDataType) => ({ ...prev, countryCode: e.target.value }));
  };

  const handlePlanSelect = (planId: string): void => {
    setFormData((prev: FormDataType) => ({ ...prev, plan: planId }));
    if (errors.plan) {
      setErrors((prev) => ({ ...prev, plan: undefined }));
    }
  };

  const handlePlanDetails = (planId: string): void => {
    router.push(`/details/${planId}`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormSubmitted(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      `🔮 Welcome to Osheen Oracle, ${formData.name}! Your ${
        membershipPlans.find((p) => p.id === formData.plan)?.name
      } membership is now active! We'll contact you at ${formData.email}${formData.phone ? ` and ${formData.countryCode} ${formData.phone}` : ''}.`
    );
    
    setIsSubmitting(false);
    
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      plan: "",
      newsletter: true,
    });
    setFormSubmitted(false);
  };

  // Auto-hide success message
  useEffect(() => {
    if (formSubmitted) {
      const timer = setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{ 
        fontFamily: "var(--font-montserrat)",
        background: "linear-gradient(135deg, #fce7f3 0%, #e0f2fe 100%)"
      }}
    >
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-25 animate-ping-slow"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-28 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200/50 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-2 animate-ping"></span>
            <span className="text-purple-700 font-medium text-sm">
              Join 5,000+ Spiritual Seekers
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl text-gray-900 mb-6 leading-tight animate-slide-up">
            Awaken Your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Spiritual Journey
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up animation-delay-200">
            Join Osheen Oracle&rsquo;s sacred community where ancient wisdom
            meets modern spirituality. Transform your life with divine guidance
            and energetic healing.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up animation-delay-400">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/20"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium mt-2 text-sm">
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
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Spiritual Path
              </span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Each plan is crafted to support your unique spiritual journey and
              personal growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {membershipPlans.map((plan, index) => (
              <div
                key={plan.id}
                className={`animate-slide-up animation-delay-${index * 100}`}
              >
                <div
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 h-full flex flex-col transform hover:-translate-y-2 hover:shadow-xl ${
                    formData.plan === plan.id
                      ? "border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg"
                      : "border-white/50 bg-white/80 backdrop-blur-sm hover:border-purple-300"
                  }`}
                >
                 

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-3xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-2 text-lg">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow mb-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-start text-left animate-fade-in"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <span className="text-purple-500 mr-3 mt-0.5 flex-shrink-0">
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
                      className={`w-full py-3 px-4 rounded-xl font-semibold text-base transition-all duration-300 transform hover:scale-[1.02] ${
                        formData.plan === plan.id
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                          : plan.popular
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg"
                          : "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-md"
                      }`}
                    >
                      {formData.plan === plan.id ? "✓ Selected" : "Select Plan"}
                    </button>

                    <button
                      onClick={() => handlePlanDetails(plan.id)}
                      className="w-full py-2.5 px-4 border border-purple-300 text-purple-600 rounded-xl font-medium text-sm hover:bg-purple-50/50 transition-all duration-300 hover:border-purple-400"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
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
                className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-5 animate-bounce-slow">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Additional{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-gray-700">
              Enhance your spiritual experience with these services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addOns.map((addOn, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-sm p-5 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium text-sm">
                    {addOn.service}
                  </span>
                  <span className="text-purple-600 font-bold text-lg">
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
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-5xl text-gray-900 mb-4">
              Transformational{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Stories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-5 animate-pulse">{testimonial.avatar}</div>
                <p className="text-gray-700 mb-6 italic text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-bold text-gray-900 text-base">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-600 text-sm">
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
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
            {formSubmitted && (
              <div className="mb-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-2xl animate-fade-in">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">✨</div>
                  <div>
                    <p className="text-green-800 font-medium">
                      Form submitted successfully! We'll contact you shortly.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
                Begin Your{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  Spiritual Transformation
                </span>
              </h2>
              <p className="text-lg text-gray-700">
                Join Osheen Oracle and unlock your divine potential
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="animate-slide-up animation-delay-100">
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-white/50 text-sm ${
                      errors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600 animate-shake">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="animate-slide-up animation-delay-200">
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
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-white/50 text-sm ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 animate-shake">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="animate-slide-up animation-delay-300">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number (Optional)
                </label>
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <select
                      id="countryCode"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      className="px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-white/50 text-sm w-32"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-grow">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-300 bg-white/50 text-sm ${
                        errors.phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Your contact number"
                    />
                  </div>
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600 animate-shake">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Improved Plan Selection in Form */}
              <div className="animate-slide-up animation-delay-400">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose Your Spiritual Plan *
                </label>
                {errors.plan && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-xl animate-shake">
                    <p className="text-red-700 text-sm">
                      {errors.plan}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {membershipPlans.map((plan) => (
                    <div
                      key={plan.id}
                      onClick={() => handlePlanSelect(plan.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 h-full transform hover:scale-[1.02] ${
                        formData.plan === plan.id
                          ? "border-purple-500 bg-purple-50/50 shadow-md"
                          : "border-gray-300 bg-white/80 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-900 text-sm leading-tight">
                          {plan.name}
                        </span>
                        {plan.popular && (
                          <span className="bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 px-2 py-1 rounded-full text-xs font-bold ml-2">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-purple-600 font-bold text-lg mb-1">
                        {plan.price}/{plan.period}
                      </div>
                      <div className="text-xs text-gray-600">
                        {plan.features.length} divine features
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl border border-purple-100 animate-slide-up animation-delay-500">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
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
                className="w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold text-base hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg animate-slide-up animation-delay-600"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center text-sm">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                  <>
                    <span className="mr-2 text-lg">🔮</span>
                    Begin Your Spiritual Journey
                    <span className="ml-2 text-lg">🔮</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounceSlow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pingSlow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }
        
        .animate-ping-slow {
          animation: pingSlow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default BecomeAMember;