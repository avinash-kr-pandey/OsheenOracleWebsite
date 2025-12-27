"use client";

// import { Sorts_Mill_Goudy } from "next/font/google";
import CommonPageHeader from "../CommonPages/CommonPageHeader";

// const sortsMillGoudy = Sorts_Mill_Goudy({
//   subsets: ["latin"],
//   weight: ["400"],
// });

export default function ProductHeader() {
  return (
    <section
      // className={`${sortsMillGoudy.className} relative min-h-[60vh] w-full overflow-hidden flex items-center justify-center py-16 md:py-24`}
      // style={{
      //   background:
      //     "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      // }}
    >
      <div className="flex flex-col justify-center text-center">
        <CommonPageHeader title="Products" subtitle="Home - Products" />
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
