"use client";

import {
  horoscopeData,
  zodiacSigns,
  HoroscopeItem,
  ZodiacSign,
  Rishi,
  rishis,
} from "@/utils/HoroscopeData";
import React, { useState, useEffect } from "react";

type TimeFrame = "daily" | "weekly" | "monthly" | "yearly";
type Language = "english" | "hindi";
type ViewMode = "zodiacs" | "predictions";

const Horoscope = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] =
    useState<TimeFrame>("daily");
  const [language, setLanguage] = useState<Language>("english");
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [selectedRishi, setSelectedRishi] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("zodiacs");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter predictions based on selected zodiac and timeframe
  const filteredPredictions = horoscopeData.filter(
    (item: HoroscopeItem) =>
      item.zodiacSign === selectedZodiac?.name &&
      item.timeFrame === selectedTimeFrame
  );

  const currentRishi: Rishi | undefined = rishis.find(
    (rishi: Rishi) => rishi.id === selectedRishi
  );
  const currentPredictions = filteredPredictions.filter(
    (item: HoroscopeItem) =>
      item.id === selectedRishi || item.id === selectedRishi + 1
  );

  const timeFrames: { key: TimeFrame; en: string; hi: string }[] = [
    { key: "daily", en: "Daily", hi: "दैनिक" },
    { key: "weekly", en: "Weekly", hi: "साप्ताहिक" },
    { key: "monthly", en: "Monthly", hi: "मासिक" },
    { key: "yearly", en: "Yearly", hi: "वार्षिक" },
  ];

  const handleTimeFrameChange = (timeFrame: TimeFrame): void => {
    setSelectedTimeFrame(timeFrame);
  };

  const handleLanguageChange = (lang: Language): void => {
    setLanguage(lang);
  };

  const handleRishiSelect = (rishiId: number): void => {
    setSelectedRishi(rishiId);
  };

  const handleZodiacSelect = (zodiac: ZodiacSign): void => {
    setSelectedZodiac(zodiac);
    setViewMode("predictions");
  };

  const handleBackToZodiacs = (): void => {
    setViewMode("zodiacs");
    setSelectedZodiac(null);
  };

  // Element colors based on zodiac element
  const getElementColor = (element: string): string => {
    switch (element.toLowerCase()) {
      case "fire":
        return "from-red-500 to-orange-400";
      case "earth":
        return "from-green-500 to-emerald-400";
      case "air":
        return "from-blue-500 to-cyan-400";
      case "water":
        return "from-purple-500 to-blue-400";
      default:
        return "from-gray-500 to-gray-400";
    }
  };

  return (
    <div
      className="min-h-screen pt-32 pb-16 px-4"
      style={{
        background:
          "linear-gradient(to bottom, #FBB5E7 0%, #FBB5E7 20%, #C4F9FF 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className={`text-4xl md:text-6xl font-bold text-purple-800 mb-4 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {language === "english" ? "Rashi Fal" : "राशि फल"}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {language === "english"
              ? "Discover your destiny with ancient wisdom"
              : "प्राचीन ज्ञान के साथ अपनी नियति की खोज करें"}
          </p>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => handleLanguageChange("english")}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                language === "english"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              English
            </button>
            <button
              onClick={() => handleLanguageChange("hindi")}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                language === "hindi"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

        {viewMode === "zodiacs" ? (
          /* Zodiac Signs Grid */
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-purple-700 mb-4">
                {language === "english"
                  ? "Choose Your Zodiac Sign"
                  : "अपनी राशि चुनें"}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {language === "english"
                  ? "Select your zodiac sign to discover personalized predictions from ancient sages"
                  : "प्राचीन ऋषियों से व्यक्तिगत भविष्यवाणियों की खोज करने के लिए अपनी राशि चुनें"}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {zodiacSigns?.map((zodiac: ZodiacSign, index: number) => (
                <div
                  key={zodiac.id}
                  onClick={() => handleZodiacSelect(zodiac)}
                  className="group cursor-pointer transform transition-all duration-500 "
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="bg-transparent rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group-hover:border-purple-300">
                    {/* Zodiac Icon (no background, visible color) */}
                    <div
                      className={`text-5xl mb-3 text-center ${
                        zodiac.element.toLowerCase() === "fire"
                          ? "text-red-500"
                          : zodiac.element.toLowerCase() === "earth"
                          ? "text-green-500"
                          : zodiac.element.toLowerCase() === "air"
                          ? "text-blue-500"
                          : "text-purple-500"
                      }`}
                    >
                      {zodiac.icon}
                    </div>

                    {/* Zodiac Name */}
                    <h3 className="text-lg font-bold text-center text-gray-800 mb-2 cursor-pointer group-hover:text-purple-600 transition-colors duration-300 ">
                      {language === "english" ? zodiac.name : zodiac.nameHindi}
                    </h3>

                    {/* Dates */}
                    <p className="text-xs text-center text-gray-600 mb-2 cursor-pointer">
                      {language === "english"
                        ? zodiac.dates
                        : zodiac.datesHindi}
                    </p>

                    {/* Element */}
                    <div className="text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium cursor-pointer ${
                          zodiac.element.toLowerCase() === "fire"
                            ? "bg-red-100 text-red-700"
                            : zodiac.element.toLowerCase() === "earth"
                            ? "bg-green-100 text-green-700"
                            : zodiac.element.toLowerCase() === "air"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {language === "english"
                          ? zodiac.element
                          : zodiac.elementHindi}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Predictions View */
          <>
            {/* Back Button */}
            <div className="mb-8">
              <button
                onClick={handleBackToZodiacs}
                className="flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-300 font-semibold cursor-pointer"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                {language === "english"
                  ? "Back to Zodiac Signs"
                  : "राशियों पर वापस जाएं"}
              </button>
            </div>

            {/* Selected Zodiac Header */}
            {selectedZodiac && (
              <div className="text-center mb-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`text-6xl mr-4 bg-gradient-to-br ${getElementColor(
                        selectedZodiac.element
                      )} bg-clip-text `}
                    >
                      {selectedZodiac.icon}
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold text-purple-800">
                        {language === "english"
                          ? selectedZodiac.name
                          : selectedZodiac.nameHindi}
                      </h2>
                      <p className="text-gray-600 mt-2">
                        {language === "english"
                          ? selectedZodiac.dates
                          : selectedZodiac.datesHindi}
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                          selectedZodiac.element.toLowerCase() === "fire"
                            ? "bg-red-100 text-red-700"
                            : selectedZodiac.element.toLowerCase() === "earth"
                            ? "bg-green-100 text-green-700"
                            : selectedZodiac.element.toLowerCase() === "air"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {language === "english"
                          ? selectedZodiac.element
                          : selectedZodiac.elementHindi}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Time Frame Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {timeFrames.map((timeFrame) => (
                <button
                  key={timeFrame.key}
                  onClick={() => handleTimeFrameChange(timeFrame.key)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-500 transform  ${
                    selectedTimeFrame === timeFrame.key
                      ? "bg-purple-600 text-white shadow-lg scale-105"
                      : "bg-white text-purple-600 shadow-md hover:shadow-lg"
                  }`}
                >
                  {language === "english" ? timeFrame.en : timeFrame.hi}
                </button>
              ))}
            </div>

            {/* Rishi Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {rishis.map((rishi: Rishi) => (
                <div
                  key={rishi.id}
                  onClick={() => handleRishiSelect(rishi.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 transform  ${
                    selectedRishi === rishi.id
                      ? "bg-white shadow-2xl scale-105 border-2 border-purple-400"
                      : "bg-white/80 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <h3 className="text-2xl font-bold text-purple-700 mb-2">
                    {language === "english" ? rishi.name : rishi.nameHindi}
                  </h3>
                  <p className="text-gray-600">
                    {language === "english"
                      ? rishi.description
                      : rishi.descriptionHindi}
                  </p>
                </div>
              ))}
            </div>

            {/* Predictions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentPredictions.map(
                (prediction: HoroscopeItem, index: number) => (
                  <div
                    key={prediction.id}
                    className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-2xl transition-all duration-700 transform "
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                        {prediction.id}
                      </div>
                      <h3 className="text-2xl font-bold text-purple-800">
                        {language === "english"
                          ? prediction.rishiName
                          : prediction.rishiNameHindi}
                      </h3>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border-l-4 border-purple-400">
                      <p className="text-lg leading-relaxed text-gray-700">
                        {language === "english"
                          ? prediction.prediction
                          : prediction.predictionHindi}
                      </p>
                    </div>

                    {/* Decorative Elements */}
                    <div className="flex justify-between items-center mt-6">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                        <div
                          className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {language === "english"
                          ? selectedTimeFrame
                          : timeFrames.find((t) => t.key === selectedTimeFrame)
                              ?.hi}
                      </span>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
      <div className="fixed bottom-40 right-10 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
      <div
        className="fixed top-1/3 right-1/4 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
};

export default Horoscope;
