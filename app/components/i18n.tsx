"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";

type Locale = "fr" | "en" | "es";
const messagesMap = { fr, en, es };

type I18nContextType = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && messagesMap[saved]) setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const t = (key: string) => messagesMap[locale][key] ?? key;

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
