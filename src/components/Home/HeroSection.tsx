"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div
      className="relative w-full md:top-0 top-10 md:min-h-screen min-h-[50vh] overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      {/* Top image with spacing */}
      <div className="relative w-64 h-64 xs:w-72 xs:h-72 sm:w-40 sm:h-40 md:w-80 md:h-80 lg:w-[420px] lg:h-[420px] xl:w-[500px] xl:h-[500px] 2xl:w-[580px] 2xl:h-[580px] mx-auto mt-10 sm:mt-14 md:mt-16 lg:mt-20">
        <Image
          src="/images/roundimage.png"
          alt="circle background"
          width={600}
          height={600}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      {/* Centered content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h1 className="font-heading font-bold text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[120px] text-[#89308A] leading-tight drop-shadow-lg animate-fade-in-up break-words">
            Osheen Oracle
          </h1>

          {/* Subheading */}
          <p className="mt-3 xs:mt-4 sm:mt-5 md:mt-6 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[54px] font-subheading text-[#9C2F50] leading-relaxed animate-fade-in-up animation-delay-200 max-w-4xl mx-auto">
            Let The Healing Begin
          </p>

          {/* CTA Button */}
          <Link
            href="/booking/1"
            className="mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10 bg-yellow-300 hover:bg-yellow-400 text-black font-bold px-6 py-3 xs:px-7 xs:py-3 sm:px-8 sm:py-4 md:px-10 md:py-4 rounded-xl text-base xs:text-lg sm:text-xl md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg animate-fade-in-up animation-delay-400 whitespace-nowrap inline-block"
          >
            Book a Session
          </Link>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
