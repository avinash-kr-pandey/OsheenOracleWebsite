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

          {/* Buttons Container */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10">
            {/* CTA Button - Book a Session - Purple Gradient */}
            <Link
              href="/booking"
              className="relative group bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500
  hover:from-purple-700 hover:via-purple-600 hover:to-pink-600
  text-white font-bold px-8 py-4 xs:px-9 xs:py-4 sm:px-10 sm:py-4 md:px-12 md:py-5
  rounded-2xl text-base xs:text-lg sm:text-xl md:text-xl
  transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg
  animate-fade-in-up animation-delay-400 whitespace-nowrap inline-block
  w-[90%] sm:w-auto text-center overflow-hidden"
            >
              {/* Shine effect */}
              <span className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[400%] transition-all duration-700"></span>

              <span className="relative flex items-center justify-center gap-2">
                Book a Session
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 xs:h-6 xs:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </span>
            </Link>

            {/* Buy Product Button - Visible only on mobile - Gradient with icon */}
            <Link
              href="/products"
              className="md:hidden w-[90%] sm:w-auto relative group bg-gradient-to-r from-amber-500 
              via-yellow-400 to-orange-400 hover:from-amber-600 hover:via-yellow-500
               hover:to-orange-500 text-black font-bold px-8 py-4 xs:px-9 xs:py-4 sm:px-10
                sm:py-4 rounded-2xl text-base xs:text-lg sm:text-xl transition-all duration-500 
                transform hover:scale-105 hover:shadow-2xl shadow-lg animate-fade-in-up animation-delay-600 
                whitespace-nowrap inline-block text-center overflow-hidden border-2 border-amber-300"
            >
              {/* Pulse effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000"></span>

              <span className="relative flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 xs:h-6 xs:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Buy Product
              </span>
            </Link>
          </div>
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

        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}
