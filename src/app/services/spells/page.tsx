import React from "react";

const SpellsPage = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pt-24 pb-20"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-purple-900 mb-6">
            SPELLS
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
        </div>

        {/* What are spells? Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-purple-100">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6 text-center">
            What Are Spells?
          </h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p className="text-xl font-semibold text-pink-600 text-center mb-8">
              Spells Are Sacred, Not Scary
            </p>
            <p>
              Forget the myths of &quot;dark magic&quot; or manipulation. Real,
              ethical spellwork is based on love, healing, empowerment, and
              protection. It honors free will, respects boundaries, and uplifts
              your soul.
            </p>
            <p className="bg-purple-50 border-l-4 border-purple-500 pl-6 py-4 italic">
              When done with integrity and spiritual awareness, spells can open
              doors you didn&apos;t even know existed
            </p>
            <p>
              A spell is a focused intention sent into the universe, often
              supported by words, rituals, and energy tools like candles, herbs,
              crystals, or symbols. Spells aren&apos;t about forcing outcomes —
              they&apos;re about aligning your energy with your desires and
              inviting the universe to co-create with you.
            </p>
            <p>
              At its core, a spell is energy work. It helps you shift
              vibrations, clear blockages, and manifest what your soul is
              calling in — whether it&apos;s love, healing, success, or
              protection.
            </p>
          </div>
        </div>

        {/* What Makes a Spell Powerful? */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-3xl shadow-2xl p-8 md:p-12 mb-16 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What Makes a Spell Powerful?
          </h2>
          <p className="text-xl text-center mb-12 opacity-90">
            A spell becomes powerful when three key things align:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Clarity of Intention",
                description:
                  "Knowing exactly what you want and why you want it",
              },
              {
                title: "Emotional Energy",
                description:
                  "Feeling your desire with belief, passion, and presence",
              },
              {
                title: "Spiritual Alignment",
                description: "Calling on divine forces to co-create with you",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Types of Spells */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-12 text-center">
            Types of Spells
          </h2>

          {/* Black Magic Card */}
          <div className="bg-gray-800 text-white rounded-3xl shadow-2xl p-8 md:p-10 mb-8 border-2 border-red-500">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-red-500 rounded-full mr-4"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-red-400">
                Black Magic (Negative or Harmful Spells)
              </h3>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Black magic is often used with forceful or selfish intent — to
              manipulate someone&apos;s free will, cause harm, or control a
              situation unnaturally. These spells may deliver fast results, but
              they usually come with heavy karmic consequences.
            </p>

            <div className="bg-gray-700/50 rounded-2xl p-6 mb-6">
              <h4 className="text-xl font-bold text-red-300 mb-4">
                Common traits of black magic include:
              </h4>
              <ul className="space-y-3">
                {[
                  "Obsession-based love spells",
                  "Revenge or curse rituals",
                  "Psychic manipulation or energy drain",
                  "Control over someone&apos;s mind, will, or decisions",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-400 mr-3">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-900/30 border border-red-700 rounded-2xl p-6">
              <p className="text-xl font-bold text-center">
                ⚠️ At Osheen Oracle, we do not practice black magic in any form.
                Our path is rooted in ethical, divine, and protective energy
                work only.
              </p>
            </div>
          </div>

          {/* White Magic Card */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-3xl shadow-2xl p-8 md:p-10 border-2 border-blue-300">
            <div className="flex items-center mb-6">
              <div className="w-3 h-8 bg-blue-500 rounded-full mr-4"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-blue-600">
                White Magic (Positive Energy Spells)
              </h3>
            </div>
            <p className="text-lg mb-6 text-gray-700">
              White magic is all about healing, love, protection, abundance, and
              personal growth. These spells are rooted in high vibration,
              compassion, and alignment with divine will.
            </p>

            <div className="bg-white/50 rounded-2xl p-6">
              <h4 className="text-xl font-bold text-blue-600 mb-4">
                White magic never harms or manipulates. Instead, it supports
                your soul&apos;s journey by:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Attracting true love",
                  "Healing emotional wounds",
                  "Protecting against negative energy",
                  "Manifesting abundance and peace",
                  "Enhancing spiritual connection",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white/70 rounded-xl p-4"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 text-sm">✓</span>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center mt-6 text-blue-600 font-semibold text-lg">
              Think of white magic as light work — it&apos;s sacred, gentle, and
              guided by universal love.
            </p>
          </div>
        </div>

        {/* Spells we do at Osheen Oracle */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-16 border border-purple-100">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4 text-center">
            Spells We Do at Osheen Oracle
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            Different Types of Spells
          </p>

          <p className="text-lg text-gray-700 mb-12 text-center leading-relaxed">
            Not all spells are the same — each one is designed to work with a
            specific purpose, emotion, or area of your life. Here&apos;s a
            breakdown of the most common and powerful spell types I offer at
            Osheen Oracle:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                type: "Love Spells",
                description:
                  "These spells focus on attracting, healing, or strengthening love. Whether you&apos;re calling in a soulmate, rekindling a lost connection, or deepening self-love — love spells work through the heart chakra to align you with divine love.",
                idealFor:
                  "Soulmate attraction, bringing back an ex, relationship healing, or self-love activation.",
                icon: "💖",
              },
              {
                type: "Money & Abundance Spells",
                description:
                  "These spells open the flow of wealth, success, and opportunity. They clear energetic blocks around money and align you with the frequency of abundance.",
                idealFor:
                  "Job success, business growth, attracting clients, or manifesting wealth.",
                icon: "💰",
              },
              {
                type: "Protection Spells",
                description:
                  "Designed to shield you from negativity, evil eye, jealousy, psychic attacks, or toxic people. Protection spells strengthen your aura and create a safe, high-vibe space around you.",
                idealFor:
                  "Energy cleansing, removing negative influences, or setting strong spiritual boundaries.",
                icon: "🛡️",
              },
              {
                type: "Healing Spells",
                description:
                  "Healing spells support emotional and spiritual recovery. They&apos;re often used after heartbreak, trauma, grief, or spiritual imbalance — helping you release pain and reconnect with inner peace.",
                idealFor:
                  "Inner healing, emotional release, self-worth restoration, or chakra alignment.",
                icon: "🌿",
              },
              {
                type: "Manifestation Spells",
                description:
                  "These are all about turning your desires into reality. Manifestation spells supercharge your intentions with energy, helping you attract what you truly want — whether it&apos;s love, a dream home, career success, or personal goals.",
                idealFor:
                  "New moon rituals, life transitions, dream-building, or personal growth.",
                icon: "✨",
              },
              {
                type: "Banishing Spells",
                description:
                  "When something (or someone) is blocking your growth, banishing spells help you remove it. These rituals are used to cut cords, break toxic cycles, and release unwanted energy.",
                idealFor:
                  "Releasing toxic relationships, ending karmic ties, breaking habits, or clearing spiritual blocks.",
                icon: "🔥",
              },
              {
                type: "Success & Career Spells",
                description:
                  "These spells are crafted to boost motivation, open career paths, and invite recognition or promotion. They&apos;re powerful for anyone feeling stuck or ready for their next level.",
                idealFor:
                  "Career advancement, business success, creative breakthroughs, or professional recognition.",
                icon: "📈",
              },
            ].map((spell, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="text-2xl mr-3">{spell.icon}</div>
                  <h3 className="text-xl font-bold text-purple-800">
                    {spell.type}
                  </h3>
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  {spell.description}
                </p>
                <div className="bg-white/50 rounded-xl p-4">
                  <h4 className="font-semibold text-purple-700 text-sm mb-2">
                    Ideal for:
                  </h4>
                  <p className="text-gray-600 text-sm">{spell.idealFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Note */}
        <div className="text-center mb-16">
          <p className="text-2xl md:text-3xl font-bold text-purple-900 mb-6 italic">
            Every Spell Is Unique
          </p>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            At Osheen Oracle, every spell I create is personalized, ethically
            guided, and rooted in positive energy. Real magic isn&apos;t about
            control — it&apos;s about alignment, intention, and calling in your
            highest path.
          </p>
        </div>

        {/* Rules Section */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Rules You Must Follow During the Spell
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              "Do not tell anyone about the spell",
              "Strictly no non-veg or alcohol during the spell period",
              "No negative thoughts allowed – stay in high vibration",
              "Behave as if the outcome has already manifested",
            ].map((rule, index) => (
              <div
                key={index}
                className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm border border-white/30"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold">{index + 1}</span>
                  </div>
                  <p className="font-semibold text-lg">{rule}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-red-500/20 border-2 border-red-400 rounded-2xl p-6 text-center">
            <p className="text-xl font-bold">
              ⚠️ If any rule is broken, the spell will automatically fail.
              Merlin, the God of Magic, will withdraw the energy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SpellsPage;
