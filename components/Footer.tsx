import React from "react";
import Link from "next/link";
import { LuGithub } from "react-icons/lu";
import Newsletter from "./Newsletter";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";
import { FaXTwitter } from "react-icons/fa6";

interface FooterProps {
  lang: Locale;
  dict: Dictionary;
}

function Footer({ lang, dict }: FooterProps) {
  return (
    <footer className="relative overflow-hidden">
      <span className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
      <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

      <span className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/5 to-amber-500/5 rounded-full blur-3xl" />
      <span className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/5 to-orange-500/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent mb-4">
                {dict.footer.title}
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {dict.footer.description}
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">
                {dict.footer.followUs}
              </h4>
              <div className="flex space-x-4">
                <Link
                  href="https://github.com/jhairparis"
                  aria-label="Visit our GitHub profile"
                  className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25 border-2 border-transparent hover:border-rose-400"
                >
                  <LuGithub
                    className="text-gray-400 group-hover:text-rose-400 transition-colors duration-300"
                    size={20}
                  />
                </Link>
                <Link
                  href="https://x.com/jhairparis"
                  aria-label="Follow us on X (Twitter)"
                  className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25 border-2 border-transparent hover:border-orange-400"
                >
                  <FaXTwitter
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                    size={20}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">
              {dict.footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${lang}`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  {dict.navigation.home}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/como-jugar`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  {dict.footer.howToPlay}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/jugar`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  {dict.footer.game}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${lang}/faq`}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  {dict.footer.faq}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <Newsletter dict={dict} />
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {dict.footer.title}.{" "}
              {dict.footer.allRightsReserved}
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="#"
                aria-label="Terms of Service"
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                {dict.footer.terms}
              </Link>
              <Link
                href="https://jhairparis.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                {dict.footer.privacy}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
