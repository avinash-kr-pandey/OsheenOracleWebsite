"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodiacData } from "@/utils/AstroData";

const SliderRow = ({ rowData }: { rowData: typeof zodiacData }) => {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fullData = [...rowData, ...rowData, ...rowData];

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const firstCard = containerRef.current.querySelector(".card");
        if (firstCard) {
          const gap = 16; // responsive gap
          setCardWidth((firstCard as HTMLElement).offsetWidth + gap);
        }
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNext = () => setIndex((prev) => prev + 1);
  const handlePrev = () => setIndex((prev) => prev - 1);

  useEffect(() => {
    const total = rowData.length;
    if (index < 0) {
      setTimeout(() => setIndex(total - 1), 0);
    } else if (index >= total * 2) {
      setTimeout(() => setIndex(total), 0);
    }
  }, [index, rowData.length]);

  return (
    <div className="relative select-none w-full">
      {/* Controls Container - Updated layout */}
      <div className="absolute -top-14 right-3 sm:-top-16 z-30 w-full">
        <div className="flex justify-between items-center">
          {/* Navigation buttons on the left */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full shadow bg-[#62aec5] hover:bg-[#5A4370] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 rounded-full shadow bg-[#62aec5] hover:bg-[#5A4370] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* View All button on the right */}
          <button
            onClick={() => router.push("/cataloguedetails")}
            className="px-6 py-2 border border-[#62aec5] text-[#3D2E4F] rounded-full 
                       font-medium text-base hover:bg-[#62aec5] hover:text-white 
                       transition-all duration-300 cursor-pointer cursor-pointer"
          >
            View All
          </button>
        </div>
      </div>

      {/* Slider */}
      <div ref={containerRef} className="overflow-hidden w-full mt-8 sm:mt-10">
        <motion.div
          className="flex gap-4 sm:gap-6 py-2 cursor-grab active:cursor-grabbing"
          animate={{ x: -index * cardWidth }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          style={{ width: "max-content" }}
          drag="x"
          dragConstraints={{ left: -200, right: 200 }}
          dragElastic={0.25}
          onDragEnd={(e, info) => {
            const threshold = 60;
            if (info.offset.x < -threshold) handleNext();
            else if (info.offset.x > threshold) handlePrev();
          }}
        >
          {fullData.map((zodiac, i) => (
            <div
              key={i}
              className="card flex-shrink-0 rounded-2xl transition-all bg-white overflow-hidden
                         shadow-md hover:shadow-xl duration-300
                         w-[260px] sm:w-[280px] lg:w-[300px] h-[480px] flex flex-col"
            >
              {/* Image - Fixed height */}
              <div className="relative w-full h-[200px] overflow-hidden flex-shrink-0">
                <Image
                  src={zodiac?.image}
                  alt={zodiac.name}
                  fill
                  className="object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text content with flex grow to fill space */}
              <div className="flex flex-col flex-grow p-4">
                <h3
                  className="text-lg sm:text-xl font-semibold text-[#3D2E4F] mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {zodiac.name}
                </h3>

                <div className="flex-grow">
                  <p className="text-sm text-gray-600 line-clamp-4">
                    {zodiac.description}
                  </p>
                </div>

                {/* Button always at bottom */}
                <div className="mt-auto pt-4">
                  <button
                    onClick={() => router.push(`/booking/${zodiac.id}`)}
                    className="w-full bg-[#62aec5] text-white text-sm font-medium py-2 px-6 
                               rounded-full hover:bg-[#5A4370] transition-all cursor-pointer"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Catalogue = () => {
  const half = Math.ceil(zodiacData.length / 2);
  const firstRow = zodiacData.slice(0, half);
  const router = useRouter();

  return (
    <div
      className="py-10 sm:py-16 px-3 sm:px-6 lg:px-10 "
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl pb-4 text-[#3D2E4F]">
          Catalogue
        </h2>
        <p className="text-[#3D2E4F] text-base sm:text-lg leading-relaxed">
          Astrology merely guides us toward reality.
        </p>
        <p className="text-[#3D2E4F] text-base sm:text-lg leading-relaxed">
          Explore a range of personalized solutions crafted to inspire, guide,
          and help you achieve your goals.
        </p>
      </div>

      <div className="space-y-16">
        <SliderRow rowData={firstRow} />
      </div>
    </div>
  );
};

export default Catalogue;