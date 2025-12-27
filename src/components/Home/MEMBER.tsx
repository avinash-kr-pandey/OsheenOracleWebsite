import Image from "next/image";
import React from "react";

const MEMBER = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center py-10 md:py-0 overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/MEMBER.jpg"
        alt="member"
        fill
        className="object-cover absolute inset-0 -z-10 opacity-90"
      />

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-5"></div>

      {/* Content */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 relative z-10">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-wide"
          style={{ fontFamily: "Alegreya, serif", color: "#F4DF4E" }}
        >
          BECOME A MEMBER
        </h1>

        <p
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed text-white"
          style={{ fontFamily: "Alegreya, serif" }}
        >
          Step into a world of cosmic wisdom. As a member of Osheen Oracle, you
          receive exclusive access to personalized guidance, weekly astrological
          insights, tarot interpretations, healing sessions, and spiritual tools
          crafted to transform your life with clarity, confidence, and purpose.
        </p>

        <button
          className="bg-[#F4DF4E] text-[#3d285a] font-semibold py-3 px-12 
                     cursor-pointer rounded-full hover:bg-[#e9cc42] shadow-lg 
                     transition-all duration-300 text-base md:text-lg"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default MEMBER;
