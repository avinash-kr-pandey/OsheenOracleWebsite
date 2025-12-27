// plandata.ts

export interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
  description: string;
  longDescription: string;
  benefits: string[];
  recommendedFor: string[];
  includedServices: {
    name: string;
    description: string;
    sessions: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const membershipPlans: MembershipPlan[] = [
  {
    id: "basic-aura",
    name: "Basic Aura Subscription",
    price: "₹2,100",
    period: "month",
    description: "Perfect for beginners starting their spiritual journey",
    longDescription:
      "The Basic Aura Subscription is designed for those who are new to spiritual practices and want to experience the transformative power of Osheen Oracle's guidance. This plan offers a gentle introduction to tarot, healing, and spiritual insights.",
    features: [
      "1 Tarot Guidance Session/month (voice note)",
      "1 Chakra Scanning",
      "Access to voice note healing session",
      "1 Prediction (1 question)",
      "1 Affirmation Sheet",
      "Priority WhatsApp replies within 3 days",
    ],
    benefits: [
      "Beginner-friendly spiritual guidance",
      "Affordable entry into spiritual practices",
      "Gentle introduction to energy work",
      "Monthly affirmation support",
      "Access to basic healing sessions",
    ],
    recommendedFor: [
      "Spiritual beginners",
      "Those on a budget",
      "People seeking gentle guidance",
      "Anyone new to tarot readings",
    ],
    includedServices: [
      {
        name: "Tarot Guidance",
        description: "Personalized tarot reading session",
        sessions: "1 session per month (voice note)",
      },
      {
        name: "Chakra Scanning",
        description: "Comprehensive chakra energy assessment",
        sessions: "1 session per month",
      },
      {
        name: "Healing Session",
        description: "Voice note based healing practice",
        sessions: "Access to monthly session",
      },
    ],
    faqs: [
      {
        question: "How long are the tarot sessions?",
        answer:
          "Each tarot guidance session is delivered via voice note and typically lasts 15-20 minutes.",
      },
      {
        question: "Can I ask multiple questions in one session?",
        answer:
          "The basic plan includes one main question per session, but you can get clarifications during the reading.",
      },
    ],
  },
  {
    id: "tarot-insight",
    name: "Tarot Insight Subscription",
    price: "₹4,200",
    period: "month",
    description: "Deep tarot insights and regular spiritual guidance",
    longDescription:
      "The Tarot Insight Subscription is perfect for those who seek regular spiritual guidance and deeper insights into their life path. With multiple sessions each month, you'll receive comprehensive support for your journey.",
    features: [
      "2 Full Tarot Readings/month (30 mins each)",
      "2 Quick Doubt Tarot Checks/month",
      "1 Decision Guidance Session/month",
      "Access to Members Only monthly prediction",
      "Priority WhatsApp support (48 hours)",
      "1 Healing session with Osheen",
    ],
    popular: true,
    benefits: [
      "Regular tarot guidance for ongoing support",
      "Quick doubt resolution between sessions",
      "Decision-making support",
      "Exclusive monthly predictions",
      "Direct healing with Osheen",
    ],
    recommendedFor: [
      "Regular tarot enthusiasts",
      "Those facing important decisions",
      "People seeking ongoing spiritual support",
      "Individuals wanting deeper insights",
    ],
    includedServices: [
      {
        name: "Full Tarot Readings",
        description: "Comprehensive 30-minute tarot sessions",
        sessions: "2 sessions per month",
      },
      {
        name: "Quick Tarot Checks",
        description: "Rapid answers to urgent questions",
        sessions: "2 sessions per month",
      },
      {
        name: "Decision Guidance",
        description: "Specialized sessions for life decisions",
        sessions: "1 session per month",
      },
    ],
    faqs: [
      {
        question:
          "What's the difference between full readings and quick checks?",
        answer:
          "Full readings are comprehensive 30-minute sessions, while quick checks are brief 5-10 minute answers to specific questions.",
      },
      {
        question: "Can I carry over unused sessions?",
        answer:
          "Sessions are use-them-or-lose-them each month to ensure regular spiritual practice.",
      },
    ],
  },
  {
    id: "healing-energy",
    name: "Healing & Energy Subscription",
    price: "₹6,300",
    period: "month",
    description: "Intensive energy healing and spiritual transformation",
    longDescription:
      "The Healing & Energy Subscription is designed for those who are ready to dive deep into energy work and spiritual transformation. This plan focuses on clearing energetic blocks and elevating your spiritual vibration.",
    features: [
      "2 Energy Healings/month (Reiki/Chakra/Angel)",
      "2 Aura Scan Reports/month",
      "1 Ritual/month",
      "1 Guided Meditation/month",
      "Monthly Readings (voice note)",
      "WhatsApp priority (24 hrs)",
    ],
    benefits: [
      "Deep energetic cleansing and healing",
      "Regular aura maintenance",
      "Powerful monthly rituals",
      "Guided meditation practices",
      "Faster response times",
    ],
    recommendedFor: [
      "Energy healing enthusiasts",
      "Those dealing with emotional blocks",
      "People seeking spiritual transformation",
      "Individuals interested in rituals",
    ],
    includedServices: [
      {
        name: "Energy Healing",
        description: "Reiki, Chakra, or Angel healing sessions",
        sessions: "2 sessions per month",
      },
      {
        name: "Aura Scanning",
        description: "Detailed aura energy reports",
        sessions: "2 reports per month",
      },
      {
        name: "Spiritual Rituals",
        description: "Customized monthly rituals",
        sessions: "1 ritual per month",
      },
    ],
    faqs: [
      {
        question: "What types of energy healing are offered?",
        answer:
          "We offer Reiki for universal energy, Chakra healing for energy centers, and Angel healing for divine connection.",
      },
      {
        question: "How long do the healing effects last?",
        answer:
          "Effects vary by individual, but most clients feel the benefits for several weeks after each session.",
      },
    ],
  },
  {
    id: "premium-manifestation",
    name: "Premium Manifestation",
    price: "₹10,500",
    period: "month",
    description: "VIP manifestation coaching and unlimited spiritual support",
    longDescription:
      "The Premium Manifestation Subscription is our most exclusive offering for serious spiritual seekers who want to manifest their dreams rapidly. With VIP access and unlimited support, you'll accelerate your spiritual growth and manifestation power.",
    features: [
      "1 Major Ritual Every Month",
      "2 Tarot Readings/month",
      "Unlimited tarot doubts (text-based)",
      "2 Healings/month + Full Aura Scan",
      "Personal Manifestation Roadmap",
      "VIP replies within 12 hours",
    ],
    benefits: [
      "Rapid manifestation support",
      "Unlimited tarot guidance",
      "Personalized manifestation roadmap",
      "VIP priority access",
      "Major monthly rituals for powerful shifts",
    ],
    recommendedFor: [
      "Serious manifestors",
      "VIP clients wanting premium access",
      "Those with urgent spiritual needs",
      "Individuals ready for rapid transformation",
    ],
    includedServices: [
      {
        name: "Major Rituals",
        description: "Powerful monthly manifestation rituals",
        sessions: "1 major ritual per month",
      },
      {
        name: "Unlimited Tarot",
        description: "Text-based tarot guidance",
        sessions: "Unlimited questions",
      },
      {
        name: "Manifestation Roadmap",
        description: "Personalized manifestation plan",
        sessions: "Updated monthly",
      },
    ],
    faqs: [
      {
        question: "What makes the 'major rituals' different?",
        answer:
          "Major rituals are extensive, personalized ceremonies designed for significant life changes and powerful manifestations.",
      },
      {
        question: "How quickly can I expect to see manifestation results?",
        answer:
          "Results vary, but premium members typically see noticeable shifts within the first month due to the intensive support.",
      },
    ],
  },
];
