import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { translations, type Language } from "../lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";

  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get("lang")?.toLowerCase() as Language | undefined;
  if (urlLang && translations[urlLang]) {
    return urlLang;
  }

  const savedLang = localStorage.getItem("chicuinaco-lang") as Language | null;
  if (savedLang && translations[savedLang]) {
    return savedLang;
  }

  const browserLang = navigator.language || navigator.languages?.[0] || "en";
  const langCode = browserLang.split("-")[0].toLowerCase() as Language;
  if (translations[langCode]) {
    return langCode;
  }

  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(detectInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    const bundle = translations[language] || translations.en;
    document.title = `Chicuinaco — ${bundle.hero.subtitle} | Teotepeque, El Salvador`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && bundle.hero.description) {
      metaDesc.setAttribute("content", bundle.hero.description);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("chicuinaco-lang", lang);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (lang === "en") {
        url.searchParams.delete("lang");
      } else {
        url.searchParams.set("lang", lang);
      }
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
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
