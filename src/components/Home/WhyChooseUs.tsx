// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// const WhyChooseUs = () => {
//   const cards = [
//     {
//       title: "Expert Astrologers",
//       desc: "We generate your natal chart and interpret the planets, signs, and houses to give you insights into your personality, strengths, weaknesses, and life path.",
//     },
//     {
//       title: "Compatibility Readings",
//       desc: "We analyze compatibility by comparing natal charts, helping people understand relationships with partners, friends, or family better.",
//     },
//     {
//       title: "Progress Reports",
//       desc: "We provide insights into transits and progressions, helping you navigate life events and understand timing significance.",
//     },
//     {
//       title: "Career Guidance",
//       desc: "Our astrologers can guide you on career choices by analyzing the 10th house, planets, and transits to support your professional journey.",
//     },
//     {
//       title: "Health & Wellness",
//       desc: "Astrology can reveal potential health patterns, giving you awareness and helping you maintain balance in life.",
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [cardsPerView, setCardsPerView] = useState(3);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const transitionRef = useRef<HTMLDivElement>(null);

//   // Calculate cards per view based on screen size
//   useEffect(() => {
//     const updateCardsPerView = () => {
//       if (window.innerWidth >= 1280) {
//         // xl screens
//         setCardsPerView(3);
//       } else if (window.innerWidth >= 1024) {
//         // lg screens
//         setCardsPerView(2.5);
//       } else if (window.innerWidth >= 768) {
//         // md screens
//         setCardsPerView(2);
//       } else {
//         // sm screens
//         setCardsPerView(1);
//       }
//     };

//     updateCardsPerView();
//     window.addEventListener("resize", updateCardsPerView);
//     return () => window.removeEventListener("resize", updateCardsPerView);
//   }, []);

//   // Extend cards for infinite loop
//   const extendedCards = [
//     ...cards.slice(-Math.ceil(cardsPerView)),
//     ...cards,
//     ...cards.slice(0, Math.ceil(cardsPerView)),
//   ];

//   const totalCards = cards.length;

//   const handleSlide = (direction: "left" | "right") => {
//     setIsTransitioning(true);

//     if (direction === "left") {
//       setCurrentIndex((prev) => prev - 1);
//     } else {
//       setCurrentIndex((prev) => prev + 1);
//     }
//   };

//   // Reset when reaching clones for infinite loop
//   useEffect(() => {
//     if (currentIndex < 0) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(totalCards - 1);
//       }, 700);
//     } else if (currentIndex >= totalCards) {
//       setTimeout(() => {
//         setIsTransitioning(false);
//         setCurrentIndex(0);
//       }, 700);
//     }
//   }, [currentIndex, totalCards]);

//   // Calculate card width based on cards per view
//   const getCardWidth = () => {
//     if (cardsPerView === 1) return "100%";
//     if (cardsPerView === 2) return "50%";
//     if (cardsPerView === 2.5) return "40%"; // 2.5 cards = 40% each (100%/2.5)
//     if (cardsPerView === 3) return "33.333%";
//     return "100%";
//   };

//   const cardWidth = getCardWidth();
//   const gap = "1rem"; // 16px gap between cards

//   return (
//     <div
//       className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden"
//       style={{ fontFamily: "var(--font-montserrat)" }}
//     >
//       <div className="absolute inset-0 opacity-40 bg-[url('/assets/Shape.png')] bg-no-repeat bg-left-top bg-contain pointer-events-none"></div>

//       {/* Header Section */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-10 lg:mb-12">
//         <div className="mb-6 sm:mb-0">
//           <p className="text-sm font-semibold text-gray-500 tracking-wider uppercase">
//             WHY CHOOSE US
//           </p>
//           <h2 className="text-2xl md:text-3xl lg:text-5xl text-purple-900 mt-2 max-w-lg whitespace-nowrap">
//             Discover Your Path in the Stars with Us
//           </h2>
//         </div>

//         {/* Arrows */}
//         <div className="flex gap-3 self-end sm:self-auto">
//           <button
//             onClick={() => handleSlide("left")}
//             className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//             aria-label="Previous slide"
//           >
//             <FaArrowLeft className="text-yellow-500" />
//           </button>
//           <button
//             onClick={() => handleSlide("right")}
//             className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-100 transition-all duration-300 hover:scale-105"
//             aria-label="Next slide"
//           >
//             <FaArrowRight className="text-yellow-500" />
//           </button>
//         </div>
//       </div>

//       {/* Slider Container */}
//       <div className="relative">
//         <div
//           ref={transitionRef}
//           className={`flex ${
//             isTransitioning
//               ? "transition-transform duration-700 ease-in-out"
//               : ""
//           }`}
//           style={{
//             transform: `translateX(calc(-${currentIndex * 100}% - ${
//               currentIndex * 1
//             }rem))`,
//             gap: gap,
//           }}
//         >
//           {extendedCards.map((card, index) => (
//             <div
//               key={index}
//               className="flex-shrink-0"
//               style={{
//                 width: `calc(${cardWidth} - ${gap})`,
//                 minWidth: `calc(${cardWidth} - ${gap})`,
//               }}
//             >
//               <div className="p-4 sm:p-6 border rounded-xl shadow-sm bg-white hover:shadow-lg transition-all duration-300 h-full hover:scale-105 group">
//                 <div className="flex justify-center mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-green-200 rounded-full group-hover:from-blue-300 group-hover:to-green-300 transition-colors duration-300" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-bold text-center text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
//                   {card.title}
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
//                   {card.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WhyChooseUs;

"use client";
import React from "react";
import Image from "next/image";
import { Moon } from "lucide-react";
import Link from "next/link";

const WhyChooseUs = () => {
  const leftFeatures = [
    {
      title: "Life clarity",
      desc: "A clear understanding of life's path and purpose",
    },
    {
      title: "Private questions",
      desc: "Private questions about personal matters",
    },
    {
      title: "Progress in life",
      desc: "Making positive changes for a better life",
    },
    {
      title: "Career strategy",
      desc: "Planning for professional growth and success",
    },
  ];

  const rightFeatures = [
    { title: "Serenity", desc: "A peaceful feeling of calm and quiet" },
    {
      title: "Making choices",
      desc: "The process of choosing between options",
    },
    { title: "A fresh outlook", desc: "A fresh, new way of looking at things" },
    {
      title: "Time optimization",
      desc: "Effectively using time to achieve goals",
    },
  ];

  return (
    <>
      <section
        className="relative py-16 px-4 sm:px-8 text-center overflow-hidden"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {/* Background circular image */}
        <div className="absolute inset-0 flex justify-center items-center opacity-20 pointer-events-none">
          <Image
            src="/images/roundimage.png"
            alt="background round zodiac"
            width={800}
            height={800}
            className="object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Header */}
          <h2 className="text-4xl sm:text-5xl font-serif mb-4 text-gray-900">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            Explore The Wonders Of The Universe
          </p>
          <p className="text-sm sm:text-base text-gray-600 mt-2 mb-12">
            Uncover the journey that defines your purpose and transforms your
            fate.
          </p>

          {/* Features Grid */}
          <div className="flex flex-col lg:flex-row items-center justify-center md:gap-10 lg:gap-16">
            {/* Left Column */}
            <div className="flex flex-col gap-6 text-left">
              {leftFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Moon className="text-black mt-1" size={22} />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="flex justify-center md:pt-0 pt-[10vh]">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 lg:w-[350px] lg:h-[520px] overflow-hidden rounded-2xl shadow-xl border-4 border-white group flex items-center justify-center ">
                {/* Image */}
                <Image
                  src="/images/WhyChooseUImg.jpg"
                  alt="Achievements"
                  fill
                  className="object-cover rounded-2xl transition-transform duration-700 ease-in-out group-hover:scale-105"
                />

                <div className="absolute top-0 right-0 w-1/5 h-1/5 bg-lightBlue rounded-tr-[100%] transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-2xl"></div>

                <div className="absolute bottom-0 left-0 w-1/5 h-1/5 bg-lightBlue rounded-bl-[100%] transition-all duration-700 ease-in-out group-hover:w-full group-hover:h-full group-hover:rounded-2xl"></div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 text-left md:pt-0 pt-12">
              {rightFeatures.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Moon className="text-black mt-1" size={22} />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-8 sm:gap-12 text-gray-900">
            <div className="text-center">
              <h3 className="text-3xl sm:text-5xl font-serif">50,000+</h3>
              <p className="mt-2 text-base sm:text-lg">Users</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-5xl font-serif">16+</h3>
              <p className="mt-2 text-base sm:text-lg">Courses</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl sm:text-5xl font-serif">13+</h3>
              <p className="mt-2 text-base sm:text-lg">Instructors</p>
            </div>
          </div>
        </div>
      </section>

      <div
        className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 lg:px-16 relative pb-12"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {/* Background Image for Small Screens */}
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-cover md:hidden h-96 sm:h-[400px] w-full"
          style={{ backgroundImage: "url('/images/roundimage.png')" }}
        ></div>

        {/* Left Image for md+ screens */}
        <Image
          src="/images/roundimage.png"
          alt="spare"
          width={300}
          height={300}
          className="mb-8 md:mb-0 hidden md:block rotate-slow"
        />

        {/* Text Section */}
        <div className="relative max-w-full text-center md:text-center md:mx-8 z-10 pt-12">
          <h1 className="text-3xl sm:text-4xl md:text-4xl mb-4 tracking-wide">
            Have Questions Or Need Guidance?
          </h1>
          <p className="text-base sm:text-lg mb-6">
            Reach out to us! At Oshsen Oracle, we value every connection and are
            ready to assist you on your journey. Whether it&#39;s inquiries
            about our services or simply sharing your thoughts, we&#39;re just a
            message away.
          </p>
          <Link 
          href="/contact"
          className="bg-black text-white px-10 py-2 rounded-full font-medium hover:bg-gray-900 transition-colors text-lg md:mt-6 mt-8">
            Contact Us
          </Link>
        </div>

        {/* Right Image */}
        <Image
          src="/images/roundimage.png"
          alt="spare"
          width={300}
          height={300}
          className="mt-8 md:mt-0 hidden md:block rotate-slow"
        />
      </div>

      {/* Tailwind Custom CSS in globals.css or inline style */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .rotate-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </>
  );
};

export default WhyChooseUs;
