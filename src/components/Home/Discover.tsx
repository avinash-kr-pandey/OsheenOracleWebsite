"use client";
import Image from "next/image";
import React from "react";

const Discover = () => {
  const services = [
    {
      id: "01",
      title: "Natal Chart Readings",
      description:
        "We generate your natal chart and interpret the positions of the planets, signs, and houses to give you insights into your personality, strengths, weaknesses, and life path.",
      image: "/assets/image-1.jpg",
      reverse: false,
    },
    {
      id: "02",
      title: "Compatibility Readings",
      description:
        "We can analyze the compatibility between two individuals by comparing their natal charts. This can help people understand their relationships with partners, friends, or family members better.",
      image: "/assets/image-2.jpg",
      reverse: true,
    },
    {
      id: "03",
      title: "Progression Readings",
      description:
        "We provide insights into upcoming planetary transits and progressions that may influence your life events and experiences. It can be useful for timing significant decisions or life changes.",
      image: "/assets/image-3.jpg",
      reverse: false,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Heading */}
      <h2
        style={{ fontFamily: "var(--font-montserrat)" }}
        className="text-3xl md:text-5xl text-start mb-16"
      >
        Discover <span>Your Path</span> in the Stars with Us
      </h2>

      {/* Services */}
      <div className="flex flex-col gap-16">
        {services?.map((service, index) => {
          const isReversed =
            index === 0
              ? true // first item: text left, image right
              : index % 2 !== 1; // alternate for others

          return (
            <div
              key={service.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                isReversed ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <Image
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[40vh] rounded-lg object-cover"
                  width={500}
                  height={500}
                />
              </div>

              {/* Text */}
              <div
                className="w-full md:w-1/2"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                <div className="flex items-center gap-3 p-3">
                  <span className="text-yellow-400 text-2xl md:text-3xl font-medium font-cormorant">
                    {service.id}
                  </span>
                  <h2
                    className="text-2xl md:text-3xl font-cormorant"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {service.title}
                  </h2>
                </div>

                <p className="text-gray-700 leading-relaxed p-3">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
