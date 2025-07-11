"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

interface GameInfoProps {
  dict: Dictionary;
  lang: Locale;
}

export default function GameInfo({ dict, lang }: GameInfoProps) {
  return (
    <section className="relative">
      <span
        className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 pointer-events-none"
        aria-hidden="true"
      />

      <span className="absolute top-0 right-1/3 w-72 h-72 bg-gradient-to-r from-orange-400/6 to-rose-400/6 rounded-full blur-3xl" />
      <span className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                {dict.gameInfo.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-900 to-rose-900 bg-clip-text text-transparent mb-8 leading-tight">
                {dict.gameInfo.title}
              </h2>
            </motion.div>
          </div>
          {/* Características únicas - Diseño moderno sin tarjetas */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {dict.gameInfo.uniqueFeatures}
              </h3>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    🧠
                  </div>
                  <span className="absolute inset-0 w-20 h-20 mx-auto bg-blue-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {dict.gameInfo.features.logic.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {dict.gameInfo.features.logic.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    🥵
                  </div>
                  <span className="absolute inset-0 w-20 h-20 mx-auto bg-green-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {dict.gameInfo.features.difficulty.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {dict.gameInfo.features.difficulty.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    🤕
                  </div>
                  <span className="absolute inset-0 w-20 h-20 mx-auto bg-purple-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {dict.gameInfo.features.unlimited.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {dict.gameInfo.features.unlimited.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-3xl transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                    🧠
                  </div>
                  <span className="absolute inset-0 w-20 h-20 mx-auto bg-orange-400 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {dict.gameInfo.features.strategy.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {dict.gameInfo.features.strategy.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Cómo empezar - Diseño de escalones ascendentes */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                {dict.howToStart.title}
              </h3>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              {/* Diseño tipo escalones ascendentes */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="relative mb-8 transform"
                >
                  <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-8 rounded-2xl border-l-8 border-rose-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transform rotate-12">
                          🎯
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                            1
                          </span>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {dict.howToStart.steps.playNow.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {dict.howToStart.steps.playNow.description.replace(
                            "{playNowButton}",
                            dict.hero.playNow
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="relative mb-8 transform md:ml-20"
                >
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border-l-8 border-amber-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transform -rotate-12">
                          📚
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                            2
                          </span>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {dict.howToStart.steps.learnRules.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {dict.howToStart.steps.learnRules.description.replace(
                            "{howToPlayLink}",
                            dict.navigation.howToPlay
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="relative transform md:ml-40"
                >
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border-l-8 border-emerald-400 shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2">
                    <div className="flex items-center space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg transform rotate-6">
                          🏆
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                            3
                          </span>
                          <h4 className="text-2xl font-bold text-gray-900">
                            {dict.howToStart.steps.compete.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-lg">
                          {dict.howToStart.steps.compete.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Flecha decorativa ascendente */}
                <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 1.4 }}
                    className="text-6xl text-amber-400/30 transform rotate-45"
                  >
                    ↗️
                  </motion.div>
                </span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="text-center"
          >
            <div className="relative">
              <span className="absolute inset-0 bg-gradient-to-r from-rose-100 to-amber-100 rounded-3xl blur-3xl opacity-60"></span>

              <div className="relative py-16 px-8">
                <h3
                  className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent mb-6"
                  dangerouslySetInnerHTML={{
                    __html: dict.gameInfo.description.split(".")[0],
                  }}
                ></h3>
                <p
                  className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: dict.gameInfo.description,
                  }}
                ></p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/${lang}/jugar`}
                      className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 rounded-full shadow-2xl hover:shadow-rose-400/25 transition-all duration-300 transform"
                    >
                      🎯 {dict.hero.playNow}
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={`/${lang}/como-jugar`}
                      className="inline-flex items-center justify-center px-10 py-5 text-xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-rose-300 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform"
                    >
                      📚 {dict.navigation.howToPlay}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
