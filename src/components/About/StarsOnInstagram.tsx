"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const zodiacData = [
  {
    id: 1,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-ppp.jpg",
  },
  {
    id: 2,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-pp.png",
  },
  {
    id: 3,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-ddd.jpg",
  },
  {
    id: 4,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-l.jpg",
  },
  {
    id: 5,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-eee.jpg",
  },
  {
    id: 6,
    image: "/images/instalogo.png",
  },
  {
    id: 7,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-dddd.jpg",
  },
  {
    id: 8,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-q.jpg",
  },
  {
    id: 9,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-m.jpg",
  },
  {
    id: 10,
    image: "https://osheenoracle.com/wp-content/uploads/2024/12/card-hh.jpg",
  },
  {
    id: 11,
    image: "/images/instalogo.png",
  },
  {
    id: 12,
    image: "/images/instalogo.png",
  },
];

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
          const gap = 24; // gap-6
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
    <div className="relative select-none">
      {/* Controls */}
      <div className="absolute -top-10 right-3 z-30 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2 shadow rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 shadow rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slider */}
      <div ref={containerRef} className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6 py-2 cursor-grab active:cursor-grabbing"
          animate={{ x: -index * cardWidth }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          style={{ width: "max-content" }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            const threshold = 80;
            if (info.offset.x < -threshold) handleNext();
            else if (info.offset.x > threshold) handlePrev();
          }}
        >
          {fullData.map((zodiac, i) => (
            <div
              key={i}
              className="card flex-shrink-0 rounded-2xl transition-all w-[260px] bg-gray-200 overflow-hidden shadow-md hover:shadow-xl duration-300 h-[30vh] flex items-center justify-center"
            >
              <Image
                src={zodiac.image}
                alt="image not found"
                width={200} // can be larger than 50
                height={200}
                className="object-contain w-18 h-18  border-[#8B613947] border-10 rounded-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const StarsOnInstagram = () => {
  const half = Math.ceil(zodiacData.length / 2);
  const firstRow = zodiacData.slice(0, half);
  const secondRow = zodiacData.slice(half);

  return (
    <div
      className="py-16 px-4 sm:px-6 lg:px-10"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div className="text-left mb-10 max-w-3xl">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl pb-4 text-[#3D2E4F]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Discover the Stars on Instagram
        </h2>
        <p
          className="text-[#3D2E4F] text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Suspendisse metus nisl, lacinia et fermentum non, laoreet non semunc
          quis.
        </p>
      </div>

      <div className="space-y-16">
        <SliderRow rowData={firstRow} />
      </div>
    </div>
  );
};

export default StarsOnInstagram;
