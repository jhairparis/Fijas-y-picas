"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";
import LanguageSwitcher from "../shared/LanguageSwitcher";

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
}

function Header({ lang, dict }: HeaderProps) {
  const [top, setTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const scrollHandler = () => {
      setTop(window.pageYOffset <= 12);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const isActive = (path: string) => pathname === `/${lang}${path}`;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        !top
          ? "bg-white/90 backdrop-blur-xl shadow-xl border-b border-gray-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link href={`/${lang}`} className="flex items-center group">
              <Image
                src="/logo.svg"
                alt="Fijas y Picas Logo"
                width={36}
                height={36}
                className="group-hover:scale-105 transition-transform duration-200"
              />
              <div className="ml-3">
                <div className="text-xl md:text-2xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                  {dict.hero.title}
                </div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex">
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  href={`/${lang}/jugar`}
                  className={`font-semibold transition-all duration-200 ${
                    isActive("/jugar")
                      ? "text-rose-600 border-b-2 border-rose-600 pb-1"
                      : "text-gray-700 hover:text-rose-600"
                  }`}
                >
                  {dict.navigation.play}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/como-jugar`}
                  className={`font-semibold transition-all duration-200 ${
                    isActive("/como-jugar")
                      ? "text-rose-600 border-b-2 border-rose-600 pb-1"
                      : "text-gray-700 hover:text-rose-600"
                  }`}
                >
                  {dict.navigation.howToPlay}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/faq`}
                  className={`font-semibold transition-all duration-200 ${
                    isActive("/faq")
                      ? "text-rose-600 border-b-2 border-rose-600 pb-1"
                      : "text-gray-700 hover:text-rose-600"
                  }`}
                >
                  {dict.navigation.faq}
                </Link>
              </li>
              <li>
                <LanguageSwitcher currentLang={lang} dict={dict} />
              </li>
            </ul>
          </nav>

          <div className="md:hidden">
            <div className="flex items-center space-x-4">
              <Link
                href={`/${lang}/jugar`}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive("/jugar")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
              >
                {dict.navigation.play}
              </Link>
              <Link
                href={`/${lang}/como-jugar`}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive("/como-jugar")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
              >
                {dict.navigation.howToPlay}
              </Link>
              <Link
                href={`/${lang}/faq`}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isActive("/faq")
                    ? "text-rose-600"
                    : "text-gray-700 hover:text-rose-600"
                }`}
              >
                {dict.navigation.faq}
              </Link>
              <LanguageSwitcher currentLang={lang} dict={dict} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
