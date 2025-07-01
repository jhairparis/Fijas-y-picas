"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { useState } from "react";
import type { Dictionary } from "@/lib/types";
import { HiChevronDown, HiCheck } from "react-icons/hi";

interface LanguageSwitcherProps {
  currentLang: Locale;
  dict: Dictionary;
}

const languageFlags = {
  es: "🇪🇸",
  en: "🇺🇸",
  fr: "🇫🇷",
};

export default function LanguageSwitcher({
  currentLang,
  dict,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: Locale) => {
    if (newLang === currentLang) return;

    // Extraer la ruta sin el locale actual
    const pathWithoutLocale = pathname.replace(`/${currentLang}`, "") || "/";

    // Navegar a la nueva ruta con el nuevo locale
    const newPath = `/${newLang}${pathWithoutLocale}`;
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-rose-600 transition-colors duration-200"
      >
        <span>{languageFlags[currentLang]}</span>
        <span className="hidden sm:inline">{dict.languages[currentLang]}</span>
        <HiChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {locales.map(lang => (
            <button
              key={lang}
              onClick={() => switchLanguage(lang)}
              className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                lang === currentLang
                  ? "bg-rose-50 text-rose-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-rose-600"
              }`}
            >
              <span className="mr-3">{languageFlags[lang]}</span>
              <span>{dict.languages[lang]}</span>
              {lang === currentLang && (
                <HiCheck className="ml-auto w-4 h-4 text-rose-600" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
