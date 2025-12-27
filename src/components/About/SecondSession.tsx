"use client";

import Image from "next/image";

export default function SecondSession() {
  return (
    <>
      <section className="relative  mx-auto min-h-auto overflow-hidden flex items-center justify-center md:pt-0 pt-16 md:py-24">
        <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-0">
          {/* Left Image Section */}

          {/* Right Text Section */}
          <div className="w-full md:w-1/2 space-y-5 animate-fade-in-up md:pl-32 pl-0">
            {/* <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
            About Us
          </h2> */}
            <p className="text-gray-700 leading-relaxed text-[15px] md:text-base">
              Amarpreet Osheen Kaur, fondly called Osheen ma is a Spiritual
              Mentor, Healer , Tarot reader, aura reader, relationship
              counselor, motivational speaker, astrologer, Reiki master and
              white healing spells caster with an experience of more than 10
              years in the study of field of Divination, spirituality,
              alternative healing modalities and creating magic. She was been
              given the title of No.1 tarot reader in India.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] md:text-base">
              Amarpreet Osheen ma’am was working as an English literature
              professor in Panjab university , Chandigarh and was brilliant at
              her job but she always use to feel for other and often due to a
              natural gift of face reading and aura readings she use to sense
              pain and sufferings of those around her and would often heal them
              with her words. Since a child she had the ability to connect with
              people on a deep emotional level and also had visions about the
              future in her dreams.
            </p>
            <p className="text-gray-700 leading-relaxed text-[15px] md:text-base">
              She is deeply connected and concerned about animals, trees and
              mother nature in all forms. Born to a father who worked as an
              I.F.S officer, she spent most of her childhood watching her father
              saving nature and hence got emotionally attached to mother nature.
              Osheen Ma loves to spend her time in meditation in nature and is
              actively working to protect nature at all cost.
            </p>
          </div>

          <div className="relative w-full md:w-1/2 flex justify-center md:py-24 py-12">
            <div className="relative overflow-hidden">
              <Image
                src="/images/withcandle.png"
                alt="About Osheen Oracle"
                width={500}
                height={500}
                className=" object-cover rounded-2xl"
              />
            </div>
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

      <div className="flex justify-center items-center  pb-5 ">
        <div className="flex flex-col md:flex-row bg-[#4F4742] rounded-2xl overflow-hidden text-[#F5CDB0] shadow-lg divide-y md:divide-y-0 md:divide-x divide-[#6B615A]">
          {/* Item 1 */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium">32k</h2>
            <p className="text-xs sm:text-sm text-gray-200 text-center sm:text-left">
              Trusted clients
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium">69m</h2>
            <p className="text-xs sm:text-sm text-gray-200 text-center sm:text-left">
              Predicted moves
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-10">
            <h2 className="text-3xl sm:text-4xl font-serif font-medium">4.8</h2>
            <p className="text-xs sm:text-sm text-gray-200 text-center sm:text-left">
              Top rated users
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
