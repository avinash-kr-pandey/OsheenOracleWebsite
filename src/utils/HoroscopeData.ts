export interface HoroscopeItem {
  id: number;
  rishiName: string;
  rishiNameHindi: string;
  prediction: string;
  predictionHindi: string;
  timeFrame: "daily" | "weekly" | "monthly" | "yearly";
  zodiacSign: string;
  zodiacSignHindi: string;
}

export interface Rishi {
  id: number;
  name: string;
  nameHindi: string;
  description: string;
  descriptionHindi: string;
}

export interface ZodiacSign {
  id: number;
  name: string;
  nameHindi: string;
  symbol: string;
  dates: string;
  datesHindi: string;
  element: string;
  elementHindi: string;
  icon: string;
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 1,
    name: "Aries",
    nameHindi: "मेष",
    symbol: "♈",
    dates: "Mar 21 - Apr 19",
    datesHindi: "21 मार्च - 19 अप्रैल",
    element: "Fire",
    elementHindi: "अग्नि",
    icon: "♈",
  },
  {
    id: 2,
    name: "Taurus",
    nameHindi: "वृषभ",
    symbol: "♉",
    dates: "Apr 20 - May 20",
    datesHindi: "20 अप्रैल - 20 मई",
    element: "Earth",
    elementHindi: "पृथ्वी",
    icon: "♉",
  },
  {
    id: 3,
    name: "Gemini",
    nameHindi: "मिथुन",
    symbol: "♊",
    dates: "May 21 - Jun 20",
    datesHindi: "21 मई - 20 जून",
    element: "Air",
    elementHindi: "वायु",
    icon: "♊",
  },
  {
    id: 4,
    name: "Cancer",
    nameHindi: "कर्क",
    symbol: "♋",
    dates: "Jun 21 - Jul 22",
    datesHindi: "21 जून - 22 जुलाई",
    element: "Water",
    elementHindi: "जल",
    icon: "♋",
  },
  {
    id: 5,
    name: "Leo",
    nameHindi: "सिंह",
    symbol: "♌",
    dates: "Jul 23 - Aug 22",
    datesHindi: "23 जुलाई - 22 अगस्त",
    element: "Fire",
    elementHindi: "अग्नि",
    icon: "♌",
  },
  {
    id: 6,
    name: "Virgo",
    nameHindi: "कन्या",
    symbol: "♍",
    dates: "Aug 23 - Sep 22",
    datesHindi: "23 अगस्त - 22 सितंबर",
    element: "Earth",
    elementHindi: "पृथ्वी",
    icon: "♍",
  },
  {
    id: 7,
    name: "Libra",
    nameHindi: "तुला",
    symbol: "♎",
    dates: "Sep 23 - Oct 22",
    datesHindi: "23 सितंबर - 22 अक्टूबर",
    element: "Air",
    elementHindi: "वायु",
    icon: "♎",
  },
  {
    id: 8,
    name: "Scorpio",
    nameHindi: "वृश्चिक",
    symbol: "♏",
    dates: "Oct 23 - Nov 21",
    datesHindi: "23 अक्टूबर - 21 नवंबर",
    element: "Water",
    elementHindi: "जल",
    icon: "♏",
  },
  {
    id: 9,
    name: "Sagittarius",
    nameHindi: "धनु",
    symbol: "♐",
    dates: "Nov 22 - Dec 21",
    datesHindi: "22 नवंबर - 21 दिसंबर",
    element: "Fire",
    elementHindi: "अग्नि",
    icon: "♐",
  },
  {
    id: 10,
    name: "Capricorn",
    nameHindi: "मकर",
    symbol: "♑",
    dates: "Dec 22 - Jan 19",
    datesHindi: "22 दिसंबर - 19 जनवरी",
    element: "Earth",
    elementHindi: "पृथ्वी",
    icon: "♑",
  },
  {
    id: 11,
    name: "Aquarius",
    nameHindi: "कुम्भ",
    symbol: "♒",
    dates: "Jan 20 - Feb 18",
    datesHindi: "20 जनवरी - 18 फरवरी",
    element: "Air",
    elementHindi: "वायु",
    icon: "♒",
  },
  {
    id: 12,
    name: "Pisces",
    nameHindi: "मीन",
    symbol: "♓",
    dates: "Feb 19 - Mar 20",
    datesHindi: "19 फरवरी - 20 मार्च",
    element: "Water",
    elementHindi: "जल",
    icon: "♓",
  },
];

export const rishis: Rishi[] = [
  {
    id: 1,
    name: "Maharishi Parashara",
    nameHindi: "महर्षि पराशर",
    description: "Ancient sage and author of many Vedic texts",
    descriptionHindi: "प्राचीन ऋषि और कई वैदिक ग्रंथों के लेखक",
  },
  {
    id: 2,
    name: "Maharishi Vashistha",
    nameHindi: "महर्षि वशिष्ठ",
    description: "One of the seven great sages, guru of Lord Rama",
    descriptionHindi: "सात महान ऋषियों में से एक, भगवान राम के गुरु",
  },
  {
    id: 3,
    name: "Maharishi Bhrigu",
    nameHindi: "महर्षि भृगु",
    description: "Author of Bhrigu Samhita, master of astrology",
    descriptionHindi: "भृगु संहिता के लेखक, ज्योतिष के महारथी",
  },
  {
    id: 4,
    name: "Maharishi Narada",
    nameHindi: "महर्षि नारद",
    description: "Divine sage and messenger of the gods",
    descriptionHindi: "दिव्य ऋषि और देवताओं के दूत",
  },
];

export const horoscopeData: HoroscopeItem[] = [
  // ==================== ARIES ====================
  {
    id: 1,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Aries",
    zodiacSignHindi: "मेष",
    prediction:
      "TODAY: Your energy is at peak. Take initiative in work. Financial gains possible. Avoid arguments. Love life improves. Health: Good. Lucky Color: Red.",
    predictionHindi:
      "आज: आपकी ऊर्जा चरम पर है। काम में पहल करें। वित्तीय लाभ संभव। बहस से बचें। प्रेम जीवन में सुधार। स्वास्थ्य: अच्छा। लकी कलर: लाल।",
    timeFrame: "daily",
  },
  {
    id: 2,
    rishiName: "Maharishi Vashistha",
    rishiNameHindi: "महर्षि वशिष्ठ",
    zodiacSign: "Aries",
    zodiacSignHindi: "मेष",
    prediction:
      "WEEK: Career opportunities emerge. Social circle expands. Family harmony. Travel plans favorable. Financial stability. Focus on goals.",
    predictionHindi:
      "सप्ताह: करियर के अवसर आते हैं। सामाजिक दायरा बढ़ेगा। पारिवारिक सद्भाव। यात्रा की योजनाएं अनुकूल। वित्तीय स्थिरता। लक्ष्यों पर ध्यान दें।",
    timeFrame: "weekly",
  },
  {
    id: 3,
    rishiName: "Maharishi Bhrigu",
    rishiNameHindi: "महर्षि भृगु",
    zodiacSign: "Aries",
    zodiacSignHindi: "मेष",
    prediction:
      "MONTH: Professional growth significant. New partnerships form. Financial investments pay off. Health needs attention. Spiritual growth occurs.",
    predictionHindi:
      "महीना: पेशेवर विकास महत्वपूर्ण। नए साझेदारी बनेगी। वित्तीय निवेश का फल मिलेगा। स्वास्थ्य पर ध्यान देने की जरूरत। आध्यात्मिक विकास होगा।",
    timeFrame: "monthly",
  },
  {
    id: 4,
    rishiName: "Maharishi Narada",
    rishiNameHindi: "महर्षि नारद",
    zodiacSign: "Aries",
    zodiacSignHindi: "मेष",
    prediction:
      "YEAR: Transformative period. Career milestones achieved. Financial abundance. Relationships deepen. Personal growth remarkable. Travel abroad possible.",
    predictionHindi:
      "साल: परिवर्तनकारी अवधि। करियर के मील के पत्थर हासिल। वित्तीय प्रचुरता। रिश्ते गहरे होंगे। व्यक्तिगत विकास उल्लेखनीय। विदेश यात्रा संभव।",
    timeFrame: "yearly",
  },

  // ==================== TAURUS ====================
  {
    id: 5,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Taurus",
    zodiacSignHindi: "वृषभ",
    prediction:
      "TODAY: Stable energy. Focus on finances. Avoid risky ventures. Family time beneficial. Creative projects succeed. Health: Good. Lucky Color: Green.",
    predictionHindi:
      "आज: स्थिर ऊर्जा। वित्त पर ध्यान दें। जोखिम भरे उद्यमों से बचें। परिवार का समय फायदेमंद। रचनात्मक परियोजनाएं सफल। स्वास्थ्य: अच्छा। लकी कलर: हरा।",
    timeFrame: "daily",
  },
  {
    id: 6,
    rishiName: "Maharishi Vashistha",
    rishiNameHindi: "महर्षि वशिष्ठ",
    zodiacSign: "Taurus",
    zodiacSignHindi: "वृषभ",
    prediction:
      "WEEK: Financial gains expected. Relationship harmony. Career progress steady. Social recognition. Health improvements. Spiritual awakening.",
    predictionHindi:
      "सप्ताह: वित्तीय लाभ की उम्मीद। रिश्ते में सद्भाव। करियर की प्रगति स्थिर। सामाजिक मान्यता। स्वास्थ्य में सुधार। आध्यात्मिक जागरण।",
    timeFrame: "weekly",
  },
  {
    id: 7,
    rishiName: "Maharishi Bhrigu",
    rishiNameHindi: "महर्षि भृगु",
    zodiacSign: "Taurus",
    zodiacSignHindi: "वृषभ",
    prediction:
      "MONTH: Property matters favorable. Career advancement. Financial security increases. Family celebrations. Travel for work beneficial.",
    predictionHindi:
      "महीना: संपत्ति के मामले अनुकूल। करियर में उन्नति। वित्तीय सुरक्षा बढ़ेगी। पारिवारिक उत्सव। काम के लिए यात्रा फायदेमंद।",
    timeFrame: "monthly",
  },
  {
    id: 8,
    rishiName: "Maharishi Narada",
    rishiNameHindi: "महर्षि नारद",
    zodiacSign: "Taurus",
    zodiacSignHindi: "वृषभ",
    prediction:
      "YEAR: Financial breakthrough. Long-term stability. Family expansion possible. Career recognition. Spiritual journey profound. Overall prosperity.",
    predictionHindi:
      "साल: वित्तीय सफलता। दीर्घकालिक स्थिरता। परिवार का विस्तार संभव। करियर में मान्यता। आध्यात्मिक यात्रा गहन। समग्र समृद्धि।",
    timeFrame: "yearly",
  },

  // ==================== GEMINI ====================
  {
    id: 9,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Gemini",
    zodiacSignHindi: "मिथुन",
    prediction:
      "TODAY: Communication skills shine. Social interactions fruitful. Learning opportunities. Avoid overthinking. Financial gains. Health: Good. Lucky Color: Yellow.",
    predictionHindi:
      "आज: संचार कौशल चमकेंगे। सामाजिक Interactions फलदायी। सीखने के अवसर। Overthinking से बचें। वित्तीय लाभ। स्वास्थ्य: अच्छा। लकी कलर: पीला।",
    timeFrame: "daily",
  },
  {
    id: 10,
    rishiName: "Maharishi Vashistha",
    rishiNameHindi: "महर्षि वशिष्ठ",
    zodiacSign: "Gemini",
    zodiacSignHindi: "मिथुन",
    prediction:
      "WEEK: Intellectual growth. New connections form. Travel plans materialize. Financial opportunities. Creative expression flourishes. Social popularity.",
    predictionHindi:
      "सप्ताह: बौद्धिक विकास। नए कनेक्शन बनेगे। यात्रा की योजनाएं साकार। वित्तीय अवसर। रचनात्मक अभिव्यक्ति फले-फूले। सामाजिक लोकप्रियता।",
    timeFrame: "weekly",
  },
  {
    id: 11,
    rishiName: "Maharishi Bhrigu",
    rishiNameHindi: "महर्षि भृगु",
    zodiacSign: "Gemini",
    zodiacSignHindi: "मिथुन",
    prediction:
      "MONTH: Career advancements. Educational success. Financial gains through communication. Relationship milestones. Health improvements noticeable.",
    predictionHindi:
      "महीना: करियर में उन्नति। शैक्षिक सफलता। संचार के माध्यम से वित्तीय लाभ। रिश्ते के मील के पत्थर। स्वास्थ्य में सुधार ध्यान देने योग्य।",
    timeFrame: "monthly",
  },
  {
    id: 12,
    rishiName: "Maharishi Narada",
    rishiNameHindi: "महर्षि नारद",
    zodiacSign: "Gemini",
    zodiacSignHindi: "मिथुन",
    prediction:
      "YEAR: Transformative communications. Career peaks. Financial abundance. Multiple travels. Personal growth significant. Spiritual insights gained.",
    predictionHindi:
      "साल: परिवर्तनकारी संचार। करियर की ऊंचाइयां। वित्तीय प्रचुरता। कई यात्राएं। व्यक्तिगत विकास महत्वपूर्ण। आध्यात्मिक अंतर्दृष्टि प्राप्त।",
    timeFrame: "yearly",
  },

  // ==================== CANCER ====================
  {
    id: 13,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Cancer",
    zodiacSignHindi: "कर्क",
    prediction:
      "TODAY: Emotional balance important. Family matters priority. Financial caution needed. Creative expression beneficial. Health: Good. Lucky Color: White.",
    predictionHindi:
      "आज: भावनात्मक संतुलन महत्वपूर्ण। पारिवारिक मामले प्राथमिकता। वित्तीय सावधानी जरूरी। रचनात्मक अभिव्यक्ति फायदेमंद। स्वास्थ्य: अच्छा। लकी कलर: सफेद।",
    timeFrame: "daily",
  },
  {
    id: 14,
    rishiName: "Maharishi Vashistha",
    rishiNameHindi: "महर्षि वशिष्ठ",
    zodiacSign: "Cancer",
    zodiacSignHindi: "कर्क",
    prediction:
      "WEEK: Home environment improves. Financial gains from family. Career opportunities emerge. Emotional healing occurs. Social connections strengthen.",
    predictionHindi:
      "सप्ताह: घर का माहौल सुधरेगा। परिवार से वित्तीय लाभ। करियर के अवसर आते हैं। भावनात्मक उपचार होता है। सामाजिक कनेक्शन मजबूत।",
    timeFrame: "weekly",
  },
  {
    id: 15,
    rishiName: "Maharishi Bhrigu",
    rishiNameHindi: "महर्षि भृगु",
    zodiacSign: "Cancer",
    zodiacSignHindi: "कर्क",
    prediction:
      "MONTH: Property matters favorable. Family expansion possible. Career growth significant. Financial stability increases. Emotional fulfillment achieved.",
    predictionHindi:
      "महीना: संपत्ति के मामले अनुकूल। परिवार का विस्तार संभव। करियर विकास महत्वपूर्ण। वित्तीय स्थिरता बढ़ती है। भावनात्मक पूर्ति प्राप्त।",
    timeFrame: "monthly",
  },
  {
    id: 16,
    rishiName: "Maharishi Narada",
    rishiNameHindi: "महर्षि नारद",
    zodiacSign: "Cancer",
    zodiacSignHindi: "कर्क",
    prediction:
      "YEAR: Emotional transformation. Family prosperity. Career achievements. Financial security established. Spiritual depth gained. Overall contentment.",
    predictionHindi:
      "साल: भावनात्मक परिवर्तन। पारिवारिक समृद्धि। करियर की उपलब्धियां। वित्तीय सुरक्षा स्थापित। आध्यात्मिक गहराई प्राप्त। समग्र संतोष।",
    timeFrame: "yearly",
  },

  // Continue similar pattern for all 12 zodiac signs...
  // LEO
  {
    id: 17,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Leo",
    zodiacSignHindi: "सिंह",
    prediction:
      "TODAY: Leadership qualities shine. Creative projects successful. Social recognition. Avoid ego clashes. Financial gains. Health: Good. Lucky Color: Gold.",
    predictionHindi:
      "आज: नेतृत्व गुण चमकेंगे। रचनात्मक परियोजनाएं सफल। सामाजिक मान्यता। अहंकार संघर्ष से बचें। वित्तीय लाभ। स्वास्थ्य: अच्छा। लकी कलर: गोल्ड।",
    timeFrame: "daily",
  },
  {
    id: 18,
    rishiName: "Maharishi Vashistha",
    rishiNameHindi: "महर्षि वशिष्ठ",
    zodiacSign: "Leo",
    zodiacSignHindi: "सिंह",
    prediction:
      "WEEK: Career advancement likely. Financial prosperity. Romantic opportunities. Social popularity increases. Creative expression flourishes.",
    predictionHindi:
      "सप्ताह: करियर उन्नति संभावित। वित्तीय समृद्धि। रोमांटिक अवसर। सामाजिक लोकप्रियता बढ़ती है। रचनात्मक अभिव्यक्ति फले-फूले।",
    timeFrame: "weekly",
  },

  // VIRGO
  {
    id: 19,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Virgo",
    zodiacSignHindi: "कन्या",
    prediction:
      "TODAY: Analytical skills peak. Work efficiency high. Health focus beneficial. Avoid perfectionism. Financial planning good. Health: Good. Lucky Color: Green.",
    predictionHindi:
      "आज: विश्लेषणात्मक कौशल चरम। कार्य दक्षता उच्च। स्वास्थ्य फोकस फायदेमंद। perfectionism से बचें। वित्तीय योजना अच्छी। स्वास्थ्य: अच्छा। लकी कलर: हरा।",
    timeFrame: "daily",
  },

  // LIBRA
  {
    id: 20,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Libra",
    zodiacSignHindi: "तुला",
    prediction:
      "TODAY: Relationship harmony. Social interactions positive. Creative endeavors successful. Avoid indecision. Financial balance. Health: Good. Lucky Color: Pink.",
    predictionHindi:
      "आज: रिश्ते में सद्भाव। सामाजिक Interactions सकारात्मक। रचनात्मक Endeavors सफल। indecision से बचें। वित्तीय संतुलन। स्वास्थ्य: अच्छा। लकी कलर: गुलाबी।",
    timeFrame: "daily",
  },

  // SCORPIO
  {
    id: 21,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Scorpio",
    zodiacSignHindi: "वृश्चिक",
    prediction:
      "TODAY: Intuitive powers strong. Research work favorable. Financial gains possible. Avoid secrecy. Transformative experiences. Health: Good. Lucky Color: Maroon.",
    predictionHindi:
      "आज: सहज ज्ञान शक्तियां मजबूत। शोध कार्य अनुकूल। वित्तीय लाभ संभव। गोपनीयता से बचें। परिवर्तनकारी अनुभव। स्वास्थ्य: अच्छा। लकी कलर: मैरून।",
    timeFrame: "daily",
  },

  // SAGITTARIUS
  {
    id: 22,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Sagittarius",
    zodiacSignHindi: "धनु",
    prediction:
      "TODAY: Adventurous spirit high. Learning opportunities. Travel beneficial. Philosophical insights. Avoid overconfidence. Health: Good. Lucky Color: Purple.",
    predictionHindi:
      "आज: साहसिक भावना उच्च। सीखने के अवसर। यात्रा फायदेमंद। दार्शनिक अंतर्दृष्टि। Overconfidence से बचें। स्वास्थ्य: अच्छा। लकी कलर: बैंगनी।",
    timeFrame: "daily",
  },

  // CAPRICORN
  {
    id: 23,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Capricorn",
    zodiacSignHindi: "मकर",
    prediction:
      "TODAY: Career focus beneficial. Discipline pays off. Financial planning good. Avoid rigidity. Long-term planning. Health: Good. Lucky Color: Brown.",
    predictionHindi:
      "आज: करियर फोकस फायदेमंद। अनुशासन का फल मिलेगा। वित्तीय योजना अच्छी। कठोरता से बचें। दीर्घकालिक योजना। स्वास्थ्य: अच्छा। लकी कलर: ब्राउन।",
    timeFrame: "daily",
  },

  // AQUARIUS
  {
    id: 24,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Aquarius",
    zodiacSignHindi: "कुम्भ",
    prediction:
      "TODAY: Innovative ideas flow. Social causes beneficial. Networking fruitful. Avoid detachment. Financial gains. Health: Good. Lucky Color: Blue.",
    predictionHindi:
      "आज: अभिनव विचार प्रवाहित। सामाजिक कारण फायदेमंद। नेटवर्किंग फलदायी। detachment से बचें। वित्तीय लाभ। स्वास्थ्य: अच्छा। लकी कलर: नीला।",
    timeFrame: "daily",
  },

  // PISCES
  {
    id: 25,
    rishiName: "Maharishi Parashara",
    rishiNameHindi: "महर्षि पराशर",
    zodiacSign: "Pisces",
    zodiacSignHindi: "मीन",
    prediction:
      "TODAY: Intuitive day. Creative expression strong. Spiritual insights. Avoid confusion. Financial intuition good. Health: Good. Lucky Color: Sea Green.",
    predictionHindi:
      "आज: सहज दिन। रचनात्मक अभिव्यक्ति मजबूत। आध्यात्मिक अंतर्दृष्टि। भ्रम से बचें। वित्तीय अंतर्ज्ञान अच्छा। स्वास्थ्य: अच्छा। लकी कलर: सी ग्रीन।",
    timeFrame: "daily",
  },
];
