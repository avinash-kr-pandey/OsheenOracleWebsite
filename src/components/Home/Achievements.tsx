"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const Achievements = () => {
  const gradientBg = "bg-gradient-to-b from-[#F1C1EB] to-[#D8FBFF]";
  const titleColor = "text-[#3D2E4F]";

  const images = [
    "/assets/Achievements.jpg",
    "/assets/Achievements-1.jpeg",
    "/assets/Achievements-2.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    timeoutRef.current = setTimeout(nextSlide, 4000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, images.length]);

  return (
    <div
      className={`max-w-7xl mx-auto px-4 py-10 rounded-xl shadow-2xl mb-10 ${gradientBg}`}
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 pl-4">
          <h1 className={`text-4xl sm:text-4xl md:text-5xl ${titleColor} mb-6`}>
            Achievements
          </h1>
          {/* <p
            className="text-[#000000] text-base sm:text-lg"
            style={{ lineHeight: "1.8" }}
          > */}

          <p
            className="text-base sm:text-lg md:text-xl text-[#3C3C3C] leading-relaxed text-justify"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Over the years, our students and faculty have achieved remarkable
            milestones. From national-level competitions to innovative projects,
            we take pride in nurturing talent and fostering excellence. Our
            platform has consistently enabled learners to showcase their skills,
            earn awards, and grow into leaders in their fields.
          </p>
        </div>

        {/* Image Slider Section with unique animation */}
        <div className="w-full lg:w-1/2 overflow-hidden relative h-[500px] rounded-lg">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out
                ${
                  currentIndex === index
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-0 scale-90 z-10"
                }
              `}
            >
              <Image
                src={img}
                alt={`Achievement ${index + 1}`}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
