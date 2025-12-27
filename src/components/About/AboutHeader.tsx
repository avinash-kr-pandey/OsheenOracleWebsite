"use client";

import Image from "next/image";

export default function AboutHeader() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 md:py-24"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >

      
      {/* Zodiac background image (you said you already have it) */}
      <div className="absolute inset-0 bg-[url('/images/aboutround.png')] bg-no-repeat bg-right-top bg-contain opacity-30 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-0 ">
        {/* Left Image Section */}
        <div className="relative w-full md:w-1/2 flex justify-center md:py-24 py-12">
          <div className="relative  overflow-hidden  max-w-auto">
            <Image
              src="/images/aboutwithglobe.png"
              alt="About Osheen Oracle"
              width={500}
              height={500}
              className=" object-cover"
            />
          </div>

          {/* Badge */}
          {/* <div className="absolute bottom-[-4px] left-1/6 bg-white/70 backdrop-blur-md border rounded-xl border-[#C4F9FF] flex flex-col items-center gap-2 p-8 px-4 py-8">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-300 border border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gray-300 border border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gray-300 border border-white"></div>
              <div className="w-10 h-10 rounded-full bg-gray-300 border border-white"></div>
            </div>
            <span className="text-gray-800 text-sm font-medium">
              69+ Top Rated around globe
            </span>
          </div> */}
        </div>

        {/* Right Text Section */}
        <div className="w-full md:w-1/2 space-y-5 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            About Us
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px] md:text-base">
            We are highly delighted to see you here at Osheen Oracle, which is
            twice awarded as No.1 tarot reading platform in India. Osheen Oracle
            is one stop solution for a comprehensive healing journey where you
            will find guidance to heal your life in all aspects of love,
            relationship, mental well-being, career success, business success
            and for every issue you must be facing today alone as we are here to
            help you out and take you on a Spiritually uplifting journey towards
            finding your best life.
          </p>
          <p className="text-gray-700 leading-relaxed text-[15px] md:text-base">
            If we have reached this page then it is no coincidence as in the
            spectrum of the Universe there are no coincidences. If you have
            reached us, it means we are meant to be. You are now at a phase in
            your life which requires a soul upgrade where you leave all the
            negativity behind and embark a glorious journey to heal your life
            with powerful healing spells, Tarot guidance and magically enchanted
            Crystals in form of jars, bracelet and energized ancient Yantras.
          </p>
        </div>
      </div>

      {/* Animation CSS */}
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
      `}</style>
    </section>
  );
}
