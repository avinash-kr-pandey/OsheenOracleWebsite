// @/utils/member.ts

export interface FormDataType {
  name: string;
  email: string;
  phone: string;
  plan: string;
  newsletter: boolean;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Stat {
  number: string;
  label: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "basic",
    name: "Rose Quartz",
    price: "$29",
    period: "month",
    features: [
      "Access to basic content library",
      "Monthly inspirational newsletter",
      "Community forum access",
      "10% discount on wellness events",
      "Basic email support",
      "Weekly mindfulness tips",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Golden Bloom",
    price: "$79",
    period: "month",
    features: [
      "All Rose Quartz features",
      "Exclusive monthly webinars",
      "Priority 24/7 support",
      "25% discount on all events",
      "Early access to new content",
      "Member-only resource library",
      "Personalized coaching sessions",
      "VIP networking groups",
    ],
    popular: true,
  },
  {
    id: "vip",
    name: "Diamond Bliss",
    price: "$149",
    period: "month",
    features: [
      "All Golden Bloom features",
      "One-on-one personal coaching",
      "Exclusive VIP event invitations",
      "50% discount on premium events",
      "Dedicated success manager",
      "Customized wellness plan",
      "24/7 premium concierge",
      "Global networking opportunities",
      "Lifetime access to resources",
    ],
    popular: false,
  },
];

export const benefits: Benefit[] = [
  {
    icon: "💎",
    title: "Exclusive Content",
    description:
      "Access premium resources, expert tutorials, and transformative insights",
  },
  {
    icon: "👑",
    title: "VIP Treatment",
    description:
      "Enjoy priority access, special recognition, and personalized attention",
  },
  {
    icon: "🌺",
    title: "Wellness Community",
    description: "Connect with supportive, like-minded individuals worldwide",
  },
  {
    icon: "✨",
    title: "Growth Resources",
    description:
      "Tools and resources designed to accelerate your personal journey",
  },
  {
    icon: "🎯",
    title: "Goal Achievement",
    description:
      "Structured programs to help you reach your personal milestones",
  },
  {
    icon: "🌟",
    title: "Transformation",
    description: "Witness remarkable growth and positive changes in your life",
  },
];

export const faqs: FAQ[] = [
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely! You can upgrade or downgrade your plan anytime. Changes take effect in your next billing cycle.",
  },
  {
    question: "Is there a commitment period?",
    answer:
      "No long-term contracts! You can cancel anytime. We believe in earning your membership every month.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit cards, PayPal, Apple Pay, and Google Pay for your convenience and security.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes! We offer special rates for groups of 5 or more. Contact our team for custom pricing.",
  },
  {
    question: "How do I access member content?",
    answer:
      "After signing up, you'll get instant access to our member portal with your personalized dashboard.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a 7-day satisfaction guarantee. If you're not happy, we'll refund your first month.",
  },
];

export const stats: Stat[] = [
  {
    number: "15K+",
    label: "Blossoming Members",
  },
  {
    number: "95%",
    label: "Success Rate",
  },
  {
    number: "200+",
    label: "Expert Guides",
  },
  {
    number: "24/7",
    label: "Dedicated Support",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Premium Member",
    content:
      "This community transformed my life! The support and resources are incredible.",
    avatar: "👩‍💼",
  },
  {
    name: "Alex Chen",
    role: "VIP Member",
    content:
      "Worth every penny! The personalized coaching helped me achieve my dreams.",
    avatar: "👨‍🎓",
  },
  {
    name: "Maya Patel",
    role: "Rose Quartz Member",
    content:
      "Beautiful community with genuine connections. I've grown so much here!",
    avatar: "👩‍🎨",
  },
];
