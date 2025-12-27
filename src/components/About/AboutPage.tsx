"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen "
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center py-16 md:py-24">
          <div className="absolute inset-0 bg-[url('/images/aboutround.png')] bg-no-repeat bg-right-top bg-contain opacity-30 pointer-events-none"></div>

          <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            {/* Left Image Section */}
            <div className="relative w-full md:w-1/2 flex justify-center md:py-24 py-12">
              <div className="relative overflow-hidden max-w-auto">
                <Image
                  src="/images/aboutwithglobe.png"
                  alt="About Osheen Oracle"
                  width={500}
                  height={500}
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            {/* Right Text Section */}
            <div className="w-full md:w-1/2 space-y-6 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center md:text-left">
                About Us
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                We are highly delighted to see you here at Osheen Oracle, which
                is twice awarded as No.1 tarot reading platform in India. Osheen
                Oracle is one stop solution for a comprehensive healing journey
                where you will find guidance to heal your life in all aspects of
                love, relationship, mental well-being, career success, business
                success and for every issue you must be facing today alone as we
                are here to help you out and take you on a Spiritually uplifting
                journey towards finding your best life.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                If we have reached this page then it is no coincidence as in the
                spectrum of the Universe there are no coincidences. If you have
                reached us, it means we are meant to be. You are now at a phase
                in your life which requires a soul upgrade where you leave all
                the negativity behind and embark a glorious journey to heal your
                life with powerful healing spells, Tarot guidance and magically
                enchanted Crystals in form of jars, bracelet and energized
                ancient Yantras.
              </p>
            </div>
          </div>
        </section>

        {/* Osheen Ma'am's Story Section */}
        <section className="relative mx-auto min-h-auto overflow-hidden flex items-center justify-center md:pt-0 pt-16 md:py-24">
          <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-6 animate-fade-in-up md:pl-8 order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center md:text-left">
                Amarpreet Osheen Kaur
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                Amarpreet Osheen Kaur, fondly called Osheen ma is a Spiritual
                Mentor, Healer, Tarot reader, aura reader, relationship
                counselor, motivational speaker, astrologer, Reiki master and
                white healing spells caster with an experience of more than 15
                years in the study of field of Divination, spirituality,
                alternative healing modalities and creating magic. She has been
                given the title of No.1 tarot reader in India.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                Amarpreet Osheen ma&rsquo;am was working as an English
                literature professor in Panjab University, Chandigarh and was
                brilliant at her job but she always use to feel for other and
                often due to a natural gift of face reading and aura readings
                she use to sense pain and sufferings of those around her and
                would often heal them with her words. Since a child she had the
                ability to connect with people on a deep emotional level and
                also had visions about the future in her dreams.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                She is deeply connected and concerned about animals, trees and
                mother nature in all forms. Born to a father who worked as an
                I.F.S officer, she spent most of her childhood watching her
                father saving nature and hence got emotionally attached to
                mother nature. Osheen Ma loves to spend her time in meditation
                in nature and is actively working to protect nature at all cost.
              </p>
            </div>

            {/* Image Section */}
            <div className="relative w-full md:w-1/2 flex justify-center md:py-24 py-12 order-1 md:order-2">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/withcandle.png"
                  alt="Osheen Ma with candle"
                  width={700}
                  height={500}
                  className="object-cover rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Spiritual Awakening Section */}
        <section className="relative min-h-auto overflow-hidden flex items-center justify-center py-16 ">
          <div className="relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 flex justify-center">
              <div className="relative overflow-hidden">
                <Image
                  src="/images/resize3.jpg"
                  alt="Spiritual Awakening"
                  width={500}
                  height={500}
                  className="object-cover rounded-2xl w-full h-auto"
                />
              </div>
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center md:text-left">
                The Spiritual Awakening
              </h2>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                One incident that changed the career path of Osheen ma was when
                the soul of her grandfather visited her in her dream before
                departing for his heavenly abode. In that dream her grandfather
                told her that her true purpose was to heal people and live a
                life dedicated to providing relief and encouragement to people
                who have lost all hope. He asked her to be the light for those
                standing in darkness.
              </p>
              <p className="text-gray-700 leading-relaxed text-justify text-[15px] md:text-base">
                After that dream when she woke up, she heard from her mom that
                her grandfather has passed away leaving behind a legacy of
                spirituality of which Osheen ma will be the beacon. After that
                day her life took a turn where she dedicated herself into the
                realm of magic and spirituality and hence was born Osheen which
                means light and Oracle which mean a mentor acting as a medium
                through whom advice or prophecy was sought from gods.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <div className="flex justify-center items-center py-16">
          <div className="flex flex-col md:flex-row bg-[#4F4742] rounded-2xl overflow-hidden text-[#F5CDB0] shadow-lg divide-y md:divide-y-0 md:divide-x divide-[#6B615A] w-full max-w-4xl mx-4">
            <div className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-10 flex-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium">
                32k+
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 text-center sm:text-left">
                Trusted clients
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-10 flex-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium">
                15+
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 text-center sm:text-left">
                Years Experience
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 sm:gap-4 px-8 sm:px-12 py-6 sm:py-10 flex-1">
              <h2 className="text-3xl sm:text-4xl font-serif font-medium">
                4.8/5
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 text-center sm:text-left">
                Top rated
              </p>
            </div>
          </div>
        </div>

        {/* Final Message Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-8">
              Join Our Family
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify text-lg max-w-4xl mx-auto mb-8">
              Today Osheen Oracle has grown to become an LLP company and from
              all over the world we receive immense love and appreciation for
              all the hard work, magic and healings we have provided to millions
              of clients and their success stories continue to provide hope,
              encouragement and zeal to everyone who comes to us for help.
            </p>
            <p className="text-gray-700 leading-relaxed text-justify text-lg max-w-4xl mx-auto mb-8">
              Osheen Ma always had a vision and was very ethical when dealing
              with clients as her advice is always accurate and for her healing
              is her divine calling and her guidance is also full of wisdom and
              motivation which forms a deep personal bond between her and her
              clients. A successful entrepreneur, Osheen ma have formulated an
              ALL-WOMEN team which symbolize women empowerment and once you get
              connect with us we make sure you never feel alone and we do our
              best to heal you from within and make a more happier and healthier
              individual by providing a personal assistant and therapist for all
              your needs during the healing / spells process along with constant
              motivation from Osheen ma herself.
            </p>
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <p className="text-2xl font-semibold text-purple-800 mb-4">
                May God bless you Beta
              </p>
              <p className="text-gray-600">- Osheen Ma</p>
            </div>
            <div className="mt-12">
              <p className="text-xl font-semibold text-gray-800 mb-4">
                For a direct consultation with Osheen Ma
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+918146668328"
                  className="bg-yellow-400 text-white px-8 py-3 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  Call +91 8146668328
                </a>
                <a
                  href="tel:+918146977206"
                  className="bg-yellow-400 text-white px-8 py-3 rounded-full hover:bg-yellow-500 transition-colors"
                >
                  Call +91 8146977206
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

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
    </div>
  );
}
