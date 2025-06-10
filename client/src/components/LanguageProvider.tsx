import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Language } from "../lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || navigator.languages[0];
    const langCode = browserLang.split("-")[0].toLowerCase() as Language;
    
    // Check for saved language preference
    const savedLang = localStorage.getItem("chicuinaco-lang") as Language;
    
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    } else if (translations[langCode]) {
      setLanguageState(langCode);
    } else {
      setLanguageState("en"); // Default fallback
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("chicuinaco-lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key; // Return key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
