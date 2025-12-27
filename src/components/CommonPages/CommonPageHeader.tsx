"use client";

import React from "react";
import { Sorts_Mill_Goudy } from "next/font/google";

const sortsMillGoudy = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: ["400"],
});

// Define props type
interface CommonPageHeaderProps {
  title: string;
  subtitle?: string;
  bg?: string;
}

const CommonPageHeader: React.FC<CommonPageHeaderProps> = ({
  title,
  subtitle,
  bg,
}) => {
  return (
    <section
      className={`${sortsMillGoudy.className} relative min-h-[50vh] w-full overflow-hidden flex items-center justify-center py-16 md:py-24`}
      style={{
        background:
          bg ||
          "linear-gradient(to bottom, #FBB5E7 20%, #FBB5E7 30%, #C4F9FF 90%)",
      }}
    >
      <div className="flex flex-col justify-center text-center pt-10">
        <h1 className="text-5xl animate-fade-in-up">{title}</h1>
        {subtitle && (
          <p className="text-lg animate-fade-in-up mt-4">{subtitle}</p>
        )}
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
};

export default CommonPageHeader;
