'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Brand & Topbar
  brandName: {
    en: 'SAI AGRO INDUSTRIES',
    hi: 'साईं एग्रो इंडस्ट्रीज'
  },
  brandTagline: {
    en: 'Bio-Tech & Crop Nutrition',
    hi: 'जैव-प्रौद्योगिकी एवं फसल पोषण'
  },
  topNotice: {
    en: '🌿 ISO 9001:2015 & GMP Certified Agro-Biotech Manufacturing',
    hi: '🌿 आईएसओ 9001:2015 एवं जीएमपी प्रमाणित कृषि जैव-प्रौद्योगिकी'
  },
  helpline: {
    en: 'Farmer Helpline',
    hi: 'किसान हेल्पलाइन'
  },
  dosageCalcShort: {
    en: 'Dosage Calculator',
    hi: 'खुराक कैलकुलेटर'
  },
  adminPortal: {
    en: 'Admin Portal',
    hi: 'व्यवस्थापक पोर्टल'
  },

  // Navbar Links
  navHome: {
    en: 'Home',
    hi: 'होम'
  },
  navAbout: {
    en: 'About Us',
    hi: 'हमारे बारे में'
  },
  navProducts: {
    en: 'Products & Bio-Inputs',
    hi: 'उत्पाद एवं जैव-उर्वरक'
  },
  navSolutions: {
    en: 'Crop Solutions',
    hi: 'फसल समाधान'
  },
  navRnd: {
    en: 'R&D & Quality',
    hi: 'अनुसंधान व गुणवत्ता'
  },
  navMedia: {
    en: 'Media & Videos',
    hi: 'वीडियो व मीडिया'
  },
  navBlog: {
    en: 'Farming Hub',
    hi: 'कृषि ज्ञान केंद्र'
  },
  navDealers: {
    en: 'Distributors',
    hi: 'डीलर नेटवर्क'
  },
  navContact: {
    en: 'Contact Us',
    hi: 'संपर्क करें'
  },
  requestQuote: {
    en: 'Request Quote',
    hi: 'कोटेशन प्राप्त करें'
  },
  instantQuote: {
    en: 'Get Instant Quote',
    hi: 'तुरंत कोटेशन लें'
  },

  // Hero Section
  heroBadge: {
    en: '🌱 Next-Gen Bio-Agri Science & Crop Nutrition',
    hi: '🌱 अगली पीढ़ी का कृषि जैव-विज्ञान एवं फसल पोषण'
  },
  heroTitle1: {
    en: 'Empowering Indian Agriculture With',
    hi: 'भारतीय कृषि को सशक्त बनाएं'
  },
  heroTitleHighlight: {
    en: 'Advanced Bio-Science',
    hi: 'उन्नत जैव-प्रौद्योगिकी के साथ'
  },
  heroSubtitle: {
    en: 'High-efficiency bio-fertilizers, plant growth promoters, chelated micronutrients and organic soil conditioners engineered for bumper crop yield and enriched soil vitality.',
    hi: 'बंपर पैदावार, प्राकृतिक रोग प्रतिरोधक क्षमता और स्वस्थ मृदा स्वास्थ्य के लिए विशेष रूप से निर्मित उच्च गुणवत्ता वाले जैविक उर्वरक, सूक्ष्म पोषक तत्व और पौध वृद्धि नियामक।'
  },
  exploreProductsBtn: {
    en: 'Explore Formulations',
    hi: 'हमारे उत्पाद देखें'
  },
  watchVideoBtn: {
    en: 'Watch Factory Tour',
    hi: 'फैक्ट्री वीडियो देखें'
  },

  // Key Stats
  statExperience: {
    en: '15+ Years Legacy',
    hi: '15+ वर्षों का अनुभव'
  },
  statFarmers: {
    en: '50,000+ Happy Farmers',
    hi: '50,000+ संतुष्ट किसान'
  },
  statFormulations: {
    en: '100+ Bio Formulations',
    hi: '100+ जैविक उत्पाद'
  },
  statStates: {
    en: '18+ States Network',
    hi: '18+ राज्यों में आपूर्ति'
  },

  // Categories
  categoriesHeading: {
    en: 'Flagship Bio-Agri Categories',
    hi: 'प्रमुख जैविक कृषि श्रेणियां'
  },
  categoriesSubheading: {
    en: 'Scientifically formulated bio-inputs designed to maximize crop performance, soil health, and return on investment.',
    hi: 'फसल की पैदावार, मिट्टी की उर्वरता और किसानों के अधिकतम मुनाफे के लिए वैज्ञानिक रूप से तैयार किए गए जैव उत्पाद।'
  },
  catBioFertilizers: {
    en: 'Bio-Fertilizers & Bio-Inoculants',
    hi: 'जैव उर्वरक एवं जीवाणु टीका'
  },
  catBioFertilizersDesc: {
    en: 'Rhizobium, Azotobacter, PSB, and KMB bio-cultures fixing natural atmospheric nitrogen and mobilizing soil minerals.',
    hi: 'राइजोबियम, एजोटोबैक्टर, पीएसबी और केएमबी जो वायुमंडलीय नाइट्रोजन को स्थिर कर मिट्टी के पोषक तत्वों को घुलनशील बनाते हैं।'
  },
  catPGR: {
    en: 'Plant Growth Regulators (PGR)',
    hi: 'पौध वृद्धि नियामक एवं बायो-स्टिमुलेंट'
  },
  catPGRDesc: {
    en: 'Premium seaweed extract, humic acid, amino acids, and fulvic boosters for rapid root spread and flowering.',
    hi: 'समुद्री शैवाल का अर्क, ह्यूमिक एसिड, अमीनो एसिड जो जड़ों के विकास और फूलों व फलों की संख्या बढ़ाते हैं।'
  },
  catMicronutrients: {
    en: 'Chelated Micronutrients & Mix',
    hi: 'चिलेटेड सूक्ष्म पोषक तत्व'
  },
  catMicronutrientsDesc: {
    en: '100% EDTA chelated Zinc, Boron, Ferrous, Manganese, and balanced multi-micronutrient foliar formulations.',
    hi: '100% ईडीटीए चिलेटेड जिंक, बोरॉन, फेरस, मैग्नीशियम और पौधों के लिए आवश्यक सूक्ष्म पोषक तत्वों का मिश्रण।'
  },
  catBioFungicides: {
    en: 'Bio-Fungicides & Eco-Defense',
    hi: 'जैव कवकनाशी एवं पौध सुरक्षा'
  },
  catBioFungicidesDesc: {
    en: 'Trichoderma Viride, Pseudomonas Fluorescens, and organic botanical pest protectors.',
    hi: 'ट्राइकोडर्मा विरिडी, स्यूडोमोनास और प्राकृतिक वानस्पतिक अर्क जो फसलों को फंगल और कीट रोगों से बचाते हैं।'
  },
  catSoilConditioners: {
    en: 'Organic Soil Conditioners',
    hi: 'जैविक मृदा सुधारक'
  },
  catSoilConditionersDesc: {
    en: 'High-grade potassium humate granules, mycorrhizal inoculants, and bio-carbon soil vitalizers.',
    hi: 'उच्च गुणवत्ता वाले पोटैशियम ह्यूमेट दाने, माइकोराइजा और बायो-कार्बन जो मिट्टी की जलधारण क्षमता सुधारते हैं।'
  },
  catWSF: {
    en: '100% Water Soluble Fertilizers',
    hi: '100% जल में घुलनशील उर्वरक'
  },
  catWSFDesc: {
    en: 'Specialty 19:19:19, 0:52:34, 0:0:50, 13:0:45 drip and foliar grade fertigation nutrients.',
    hi: 'ड्रिप और पर्णीय छिड़काव के लिए विशेष 19:19:19, 0:52:34, 0:0:50, 13:0:45 उर्वरक।'
  },

  // Crop Advisor
  cropAdvisorTitle: {
    en: 'Interactive Crop Advisory & Nutrition Schedule',
    hi: 'फसल पोषण एवं वैज्ञानिक छिड़काव सारणी'
  },
  cropAdvisorSubtitle: {
    en: 'Select your crop to view stage-wise growth solutions and recommended bio-formulations.',
    hi: 'अपनी फसल चुनें और विभिन्न विकास चरणों के लिए अनुशंसित जैविक समाधान और छिड़काव का समय देखें।'
  },
  cropPaddy: {
    en: 'Paddy / Rice',
    hi: 'धान (चावल)'
  },
  cropWheat: {
    en: 'Wheat',
    hi: 'गेहूं'
  },
  cropCotton: {
    en: 'Cotton',
    hi: 'कपास'
  },
  cropSugarcane: {
    en: 'Sugarcane',
    hi: 'गन्ना'
  },
  cropChilli: {
    en: 'Chilli & Vegetables',
    hi: 'मिर्च एवं सब्जियां'
  },
  cropSoybean: {
    en: 'Soybean & Pulses',
    hi: 'सोयाबीन एवं दलहन'
  },
  cropFruits: {
    en: 'Banana & Fruits',
    hi: 'केला, आम एवं फल'
  },

  // Calculator
  calcTitle: {
    en: 'Farm Acreage & Dosage Calculator',
    hi: 'खेत का क्षेत्रफल एवं सटीक खुराक कैलकुलेटर'
  },
  calcSubtitle: {
    en: 'Calculate the exact quantity of bio-formulations needed for your farm acreage with scientific precision.',
    hi: 'अपने खेत के क्षेत्रफल (एकड़) के आधार पर आवश्यक जैविक उत्पादों की सटीक मात्रा की गणना करें।'
  },
  selectCropLabel: {
    en: 'Select Your Crop',
    hi: 'अपनी फसल का चयन करें'
  },
  landAreaLabel: {
    en: 'Land Area (in Acres)',
    hi: 'खेत का क्षेत्रफल (एकड़ में)'
  },
  growthStageLabel: {
    en: 'Target Growth Stage',
    hi: 'फसल का विकास चरण'
  },
  calcActionBtn: {
    en: 'Calculate Recommended Dosage',
    hi: 'अनुशंसित खुराक की गणना करें'
  },
  estimatedCost: {
    en: 'Estimated Dosage Quantity',
    hi: 'अनुमानित कुल आवश्यकता'
  },

  // Video Section
  videoTitle: {
    en: 'State-of-the-Art Manufacturing & Field Trials',
    hi: 'अत्याधुनिक निर्माण संयंत्र एवं खेत प्रदर्शन'
  },
  videoSubtitle: {
    en: 'Witness our sterile biotech fermentation plants, stringent laboratory QA, and real field demonstrations across India.',
    hi: 'हमारे अत्याधुनिक बायो-फर्मेंटेशन प्लांट, गुणवत्ता नियंत्रण प्रयोगशाला और भारत भर में सफल खेत परीक्षण देखें।'
  },
  videoFactoryTitle: {
    en: 'Manufacturing Plant & Sterile Fermentation Facility',
    hi: 'बायो-फर्टिलाइजर निर्माण एवं स्वचालित प्लांट टूर'
  },
  videoFactoryDesc: {
    en: 'Walk inside our ISO 9001:2015 certified bioreactor laboratory and robotic packaging facility.',
    hi: 'आईएसओ 9001:2015 प्रमाणित बायो-रिएक्टर प्रयोगशाला और स्वचालित पैकेजिंग प्लांट का दृश्य।'
  },
  videoFieldTitle: {
    en: 'Real Farmer Field Trials & Harvest Demonstrations',
    hi: 'किसानों के खेतों पर वास्तविक परिणाम एवं प्रदर्शन'
  },
  videoFieldDesc: {
    en: 'See dramatic 25-35% crop yield enhancement and root vigor across paddy, cotton, and horticulture.',
    hi: 'धान, कपास और सब्जियों में 25-35% अधिक पैदावार और मजबूत जड़ों का वास्तविक परिणाम।'
  },

  // Why Choose Us
  whyTitle: {
    en: 'Why 50,000+ Farmers Trust SAI AGRO',
    hi: '50,000+ किसान साईं एग्रो पर भरोसा क्यों करते हैं?'
  },
  whySubtitle: {
    en: 'Our commitment to purity, bio-efficacy, and scientific excellence sets the industry benchmark.',
    hi: 'शुद्धता, जैव-प्रभावशीलता और वैज्ञानिक अनुसंधान के प्रति हमारा समर्पण हमें सर्वश्रेष्ठ बनाता है।'
  },
  why1Title: {
    en: '100% Active Bio-Count',
    hi: '100% सक्रिय सूक्ष्मजीवी शक्ति'
  },
  why1Desc: {
    en: 'Guaranteed 1x10^8 to 1x10^9 CFU/ml viable bacterial spores with long shelf stability.',
    hi: 'उच्चतम गुणवत्ता वाले सक्रिय जीवाणु (CFU) जो लंबे समय तक जीवित रहकर मिट्टी को उपजाऊ बनाते हैं।'
  },
  why2Title: {
    en: 'ISO 9001:2015 & GMP Certified',
    hi: 'आईएसओ 9001:2015 एवं जीएमपी प्रमाणित'
  },
  why2Desc: {
    en: 'Stringent multi-tier batch testing in our in-house microbiological and analytical laboratories.',
    hi: 'हमारी आधुनिक प्रयोगशाला में प्रत्येक बैच का कठोर वैज्ञानिक परीक्षण और गुणवत्ता नियंत्रण।'
  },
  why3Title: {
    en: 'Direct Factory Pricing',
    hi: 'सीधे फैक्ट्री से सर्वोत्तम मूल्य'
  },
  why3Desc: {
    en: 'Transparent bulk dealer rates and direct farmer cost savings with high return on investment.',
    hi: 'डीलरों के लिए आकर्षक मार्जिन और किसानों के लिए सीधे कारखाने से किफायती मूल्य।'
  },
  why4Title: {
    en: 'Agronomist Tele-Support',
    hi: 'विशेषज्ञ कृषि वैज्ञानिकों का मार्गदर्शन'
  },
  why4Desc: {
    en: 'Free crop advisory, customized nutrition schedules, and dedicated WhatsApp agronomist support.',
    hi: 'निःशुल्क फसल सलाह, मिट्टी परीक्षण मार्गदर्शन और व्हाट्सएप पर त्वरित सहायता।'
  },

  // Testimonials
  testimonialsTitle: {
    en: 'Farmer Success Stories',
    hi: 'किसानों की सफलता की कहानियां'
  },
  testimonialsSubtitle: {
    en: 'Real experiences and bumper harvests shared by progressive farmers across India.',
    hi: 'देश भर के प्रगतिशील किसानों द्वारा साझा किए गए वास्तविक अनुभव और बंपर पैदावार।'
  },

  // Call to Action
  ctaTitle: {
    en: 'Ready to Boost Your Crop Yields & Soil Health?',
    hi: 'क्या आप अपनी फसल की पैदावार और मिट्टी की उर्वरता बढ़ाना चाहते हैं?'
  },
  ctaSubtitle: {
    en: 'Connect with our agronomists today for customized crop schedules, sample kits, or dealership inquiries.',
    hi: 'कस्टम फसल सलाह, नमूना किट या डीलरशिप के लिए आज ही हमारे कृषि वैज्ञानिकों से संपर्क करें।'
  },
  talkToExpert: {
    en: 'Chat on WhatsApp',
    hi: 'व्हाट्सएप पर बात करें'
  },
  callNow: {
    en: 'Call Expert Agronomist',
    hi: 'कृषि विशेषज्ञ को फोन करें'
  },

  // Dealer Section
  dealerTitle: {
    en: 'Join SAI AGRO Pan-India Dealer Network',
    hi: 'साईं एग्रो अखिल भारतीय डीलर नेटवर्क से जुड़ें'
  },
  dealerSubtitle: {
    en: 'Partner with one of India’s fastest-growing bio-agri manufacturers. Enjoy exclusive territory rights, high margins, and fast logistics.',
    hi: 'भारत के तेजी से बढ़ते जैविक कृषि निर्माता के साथ साझेदारी करें। आकर्षक मार्जिन, क्षेत्रीय एकाधिकार और त्वरित आपूर्ति प्राप्त करें।'
  },
  applyDealerBtn: {
    en: 'Apply for Dealership',
    hi: 'डीलरशिप के लिए आवेदन करें'
  },

  // Common Form Fields
  formFullName: {
    en: 'Full Name',
    hi: 'पूरा नाम'
  },
  formPhone: {
    en: 'Mobile Number',
    hi: 'मोबाइल नंबर'
  },
  formEmail: {
    en: 'Email Address',
    hi: 'ईमेल पता'
  },
  formState: {
    en: 'State / Province',
    hi: 'राज्य'
  },
  formDistrict: {
    en: 'District / City',
    hi: 'जिला / शहर'
  },
  formCrop: {
    en: 'Primary Crop',
    hi: 'प्रमुख फसल'
  },
  formMessage: {
    en: 'Requirement / Message',
    hi: 'आपकी आवश्यकता / संदेश'
  },
  formSubmit: {
    en: 'Submit Request',
    hi: 'अनुरोध भेजें'
  },
  formSending: {
    en: 'Sending...',
    hi: 'भेजा जा रहा है...'
  },
  formSuccess: {
    en: 'Thank you! Our technical agronomist will contact you within 2 hours.',
    hi: 'धन्यवाद! हमारे तकनीकी कृषि विशेषज्ञ 2 घंटे के भीतर आपसे संपर्क करेंगे।'
  },

  // Footer
  footerAbout: {
    en: 'SAI AGRO INDUSTRIES is a premier biotechnology enterprise dedicated to sustainable agriculture, manufacturing high-potency bio-fertilizers, PGRs, micronutrients, and organic soil vitalizers.',
    hi: 'साईं एग्रो इंडस्ट्रीज टिकाऊ कृषि के लिए समर्पित एक प्रमुख जैव-प्रौद्योगिकी उद्यम है, जो उच्च गुणवत्ता वाले जैविक उर्वरक, सूक्ष्म पोषक तत्व और मृदा सुधारक का निर्माण करता है।'
  },
  quickLinks: {
    en: 'Quick Links',
    hi: 'त्वरित लिंक'
  },
  certifications: {
    en: 'Certifications & QA',
    hi: 'प्रमाणन एवं गुणवत्ता'
  },
  headOffice: {
    en: 'Headquarters & Works',
    hi: 'मुख्यालय एवं निर्माण इकाई'
  },
  allRightsReserved: {
    en: 'All Rights Reserved.',
    hi: 'सर्वाधिकार सुरक्षित।'
  },
  themeLight: {
    en: 'Light Mode',
    hi: 'लाइट मोड'
  },
  themeDark: {
    en: 'Dark Mode',
    hi: 'डार्क मोड'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, defaultText?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('sai_agro_lang') as Language | null;
    if (savedLang === 'hi' || savedLang === 'en') {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sai_agro_lang', lang);
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, defaultText?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
