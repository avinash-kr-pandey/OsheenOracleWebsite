import Image from "next/image";
import React from "react";

type ThemeType = "purple" | "pink" | "blue" | "gold" | "green";

interface ThemeClasses {
  bg: string;
  border: string;
  text: string;
  accent: string;
}

interface ReadingService {
  title: string;
  content: string;
  pricing: string;
  image: string;
  theme: ThemeType;
}

const ReadingPage = () => {
  const readingServices: ReadingService[] = [
    {
      title: "What is Tarot Reading",
      content: `Tarot is a timeless and sacred art of divination that has guided souls for centuries. It offers deep, accurate insights into your present energy and the path ahead. If you're feeling confused, lost, or caught in a challenging phase of life, a Tarot session with Osheen can bring clarity and direction.

Whether it's decisions about marriage, breakups, relationships, or career crossroads—Tarot opens the door to answers you've been seeking. Through intuitive guidance, Osheen connects with your energy to reveal what the universe wants you to know.

The most magical part? You simply share your name and date of birth, and Osheen channels divine messages that resonate with your current life situation. It feels like the universe is speaking to you directly—through her voice, with truth, warmth, and light.

This powerful session includes a holistic assessment of key areas in your life—love and relationships, career guidance, health concerns, along with a detailed seven chakra scan to identify energetic blockages and help restore balance to your life.`,
      pricing:
        "Begin your spiritual journey with a 20-minute audio session with Osheen Ma'am, starting at just ₹5555/-",
      image: "/images/aboutglobe.png",
      theme: "purple",
    },
    {
      title: "The Love Reading",
      content: `Love can be incredibly beautiful yet equally complicated especially when you deeply care for someone who seems to resist or pull away from that love. In such emotionally overwhelming moments, it's natural to feel lost, unsure of what to do next or how to respond.

The Love Tarot Reading offers a deeply insightful look into your relationship, helping you understand the emotional blocks between you and your partner. It guides you toward healing, clarity, and the right steps to restore balance in your love life.

During this 20-minute session, you'll receive a personalized love reading along with crystal recommendations, healing or spell suggestions, and powerful tools like yantras and spell jars—all intuitively guided to support you in your unique situation.`,
      pricing: `Audio Energy Exchange: Rs. 5555/-

Video call Energy Exchange: Rs. 16555/- 

Tarot plus Astrological chart analysis on audio call Energy Exchange Rs. 19176/-`,
      image: "/images/aboutglobe.png",
      theme: "pink",
    },
    {
      title: "Love Reading with Partner's Mind Reading and Time Frame",
      content: `This session is specially designed for those experiencing a no-contact phase with their partner and feeling lost or uncertain about what's truly going on. If you're wondering what your partner is thinking, why their behavior has changed, or if there's any external influence affecting your relationship, this reading can bring deep clarity.

Through Love Tarot and Angel Cards, Osheen taps into your partner's energy to provide psychic insights into their thoughts and emotions. The reading also reveals any third-party influences and offers a time frame for upcoming events in your love journey.

In addition to mind reading, this powerful session includes a seven chakra scan, crystal recommendations, healing spells, and yantra guidance to help restore harmony and healing in your love life.`,
      pricing: `The Energy Exchange for a 30-minute audio call session is Rs. 8999/- 

Energy Exchange for a Video call session for 30 minutes is Rs. 16999/-`,
      image: "/images/resize-gallery2.jpg",
      theme: "blue",
    },
    {
      title: "7 Questions with Angel Cards & Accurate Time Frame Session",
      content: `If you're feeling anxious about important life events—like when you'll get that job, when you'll get married, or when you'll travel abroad—this session is designed just for you. The Angel Card Reading provides clear, intuitive answers with accurate time frames to help guide your path forward.

This is a 30-minute session where you can ask seven specific questions. Each answer comes with holistic spiritual advice and insight to help you make empowered decisions.

The session also includes a 7 chakra energy scan, along with spell recommendations, yantra suggestions, and spell jar guidance, all of which can be tailored to your personal energy and life situation.`,
      pricing: `Energy Exchange for Audio call session: Rs. 10999/-
Energy Exchange for Video call session: Rs. 16999/-`,
      image: "/images/resize3.jpg",
      theme: "gold",
    },
    {
      title: "Career Readings",
      content: `If you're a college pass-out, looking to switch jobs, or thinking about starting a new business but feel directionless, then the Career Readings can help you understand where to focus your energy.

This session will guide you in choosing the right career path based on your birth chart, and help you understand how to shift your mindset for better results, increased productivity, and improved wealth.`,
      pricing: `Energy Exchange for audio call: Rs. 9999/- 
Energy Exchange for video call: Rs. 16999/-`,
      image: "/images/withcandle.png",
      theme: "green",
    },
  ];

  const getThemeClasses = (theme: ThemeType): ThemeClasses => {
    const themes: Record<ThemeType, ThemeClasses> = {
      purple: {
        bg: "bg-gradient-to-br from-purple-100 to-purple-50",
        border: "border-purple-200",
        text: "text-purple-900",
        accent: "bg-purple-500",
      },
      pink: {
        bg: "bg-gradient-to-br from-pink-100 to-pink-50",
        border: "border-pink-200",
        text: "text-pink-900",
        accent: "bg-pink-500",
      },
      blue: {
        bg: "bg-gradient-to-br from-blue-100 to-blue-50",
        border: "border-blue-200",
        text: "text-blue-900",
        accent: "bg-blue-500",
      },
      gold: {
        bg: "bg-gradient-to-br from-yellow-100 to-amber-50",
        border: "border-yellow-200",
        text: "text-yellow-900",
        accent: "bg-yellow-500",
      },
      green: {
        bg: "bg-gradient-to-br from-green-100 to-emerald-50",
        border: "border-green-200",
        text: "text-green-900",
        accent: "bg-green-500",
      },
    };
    return themes[theme];
  };

  return (
    <div
      className="min-h-screen pt-32 pb-20"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      {/* Hero Section */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-6xl md:text-6xl font-bold text-purple-900 mb-6">
          Reading
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
      </div>

      {/* Reading Services */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {readingServices.map((service, index) => {
          const theme = getThemeClasses(service.theme);
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className={`${theme.bg} rounded-3xl shadow-2xl overflow-hidden border-2 ${theme.border} hover:shadow-3xl transition-all duration-500`}
            >
              <div
                className={`lg:flex items-stretch ${
                  isEven ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Image Section */}
                <div className="lg:w-2/4 p-2 flex items-center justify-center">
                  <div className="relative w-full h-64 lg:h-110">
                    <div className="rounded-2xl overflow-hidden">
                      <Image
                        alt={service.title}
                        src={service.image}
                        width={600}
                        height={600}
                        className="w-full h-64 lg:h-120 object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="lg:w-3/5 p-8 lg:p-12">
                  <div
                    className={`w-16 h-1 ${theme.accent} mb-6 rounded-full`}
                  ></div>
                  <h2
                    className={`text-3xl md:text-4xl font-bold ${theme.text} mb-8`}
                  >
                    {service.title}
                  </h2>

                  {/* Content Paragraphs */}
                  <div className="space-y-6 mb-8">
                    {service.content.split("\n\n").map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-gray-700 text-lg leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Pricing Section */}
                  <div className="bg-white/80 rounded-2xl p-6 border border-gray-200">
                    <h4 className={`text-xl font-bold ${theme.text} mb-4`}>
                      Energy Exchange
                    </h4>
                    <div className="space-y-3">
                      {service.pricing.split("\n").map((price, idx) => (
                        <p
                          key={idx}
                          className="text-lg font-semibold text-gray-800"
                        >
                          {price}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Spacing */}
      <div className="h-16"></div>
    </div>
  );
};

export default ReadingPage;
