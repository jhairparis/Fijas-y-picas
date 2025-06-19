"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Locale } from "@/lib/i18n";
import { Dictionary } from "@/lib/types";

interface FAQContentProps {
  lang: Locale;
  dict: Dictionary;
  faqData: { question: string; answer: string }[];
}

export default function FAQContent({ lang, dict, faqData }: FAQContentProps) {
  const faqs = faqData;

  return (
    <section className="relative overflow-hidden">
      <span
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none"
        aria-hidden="true"
      />

      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <span className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                {dict.faq.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                {dict.faq.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                {dict.faq?.description ||
                  "Encuentra respuestas rápidas sobre reglas, estrategias y modos de juego de Fijas y Picas."}
              </p>
            </motion.div>
          </div>

          {/* FAQ Items */}
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl hover:bg-white/90 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 flex items-start">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-bold rounded-full mr-4 mt-1 flex-shrink-0 shadow-lg">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  <div className="ml-12">
                    <p
                      className="text-gray-700 leading-relaxed text-lg"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {dict.comoJugar.challenge.title}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {dict.comoJugar.challenge.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${lang}/jugar`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {dict.comoJugar.challenge.playButton}
                </Link>
                <Link
                  href={`/${lang}/como-jugar`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-rose-600 bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {dict.hero.learnMore}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
