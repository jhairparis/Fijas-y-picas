"use client";
import React from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

interface HistoryProps {
  dict: Dictionary;
  lang: Locale;
}

// Temporary interface to handle history section
interface HistoryDict {
  subtitle: string;
  evolutionTitle: string;
  timeline: {
    "19th": { era: string; title: string; description: string };
    "1970": { era: string; title: string; description: string };
    digital: { era: string; title: string; description: string };
  };
  legacy: {
    title: string;
    description1: string;
    description2: string;
    stats: {
      years: string;
      yearsLabel: string;
      possibilities: string;
      possibilitiesLabel: string;
      passion: string;
      passionLabel: string;
    };
  };
}

export default function History({ dict }: HistoryProps) {
  const history = dict.history as unknown as HistoryDict;

  return (
    <section className="relative">
      <span
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-amber-50 to-rose-50 pointer-events-none"
        aria-hidden="true"
      />

      <span className="absolute top-0 right-1/3 w-72 h-72 bg-gradient-to-r from-amber-400/6 to-rose-400/6 rounded-full blur-3xl" />
      <span className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-rose-400/8 to-orange-400/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                {history.subtitle}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-900 to-orange-900 bg-clip-text text-transparent mb-8 leading-tight">
                {history.evolutionTitle}
              </h2>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Diseño de río temporal - Timeline fluida sin tarjetas */}
            <div className="relative min-h-[800px]">
              {/* Río principal - Línea temporal ondulada */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 z-10">
                <svg
                  width="100"
                  height="100%"
                  viewBox="0 0 100 800"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M50 0 Q60 100 40 200 Q30 300 70 400 Q80 500 30 600 Q20 700 50 800"
                    stroke="url(#riverGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient
                      id="riverGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                      <stop
                        offset="30%"
                        stopColor="#ec4899"
                        stopOpacity="0.9"
                      />
                      <stop
                        offset="70%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="100%"
                        stopColor="#3b82f6"
                        stopOpacity="0.7"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Efectos de partículas a lo largo del río */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-20 z-5">
                {[
                  { left: 20, top: 5 },
                  { left: 80, top: 15 },
                  { left: 35, top: 28 },
                  { left: 70, top: 40 },
                  { left: 15, top: 52 },
                  { left: 90, top: 65 },
                  { left: 45, top: 78 },
                  { left: 25, top: 88 },
                ].map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full opacity-40"
                    style={{
                      left: `${particle.left}%`,
                      top: `${particle.top}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </div>

              {/* Hitos históricos como islas en el río */}
              <div className="relative z-20 space-y-40 py-16">
                {/* Siglo XIX */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <div className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-sm font-semibold rounded-full mb-2">
                      {history.timeline["19th"].era}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {history.timeline["19th"].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {history.timeline["19th"].description}
                    </p>
                  </div>
                  <div className="relative flex-shrink-0">
                    {/* Círculo de año */}
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-30 relative">
                      <span className="text-white font-bold text-2xl">📜</span>
                    </div>
                    {/* Efecto de ondas */}
                    <span className="absolute inset-0 w-20 h-20 bg-amber-400 rounded-full animate-ping opacity-20"></span>
                  </div>
                  <div className="w-1/2 pl-8">
                    {/* Espacio vacío para balance visual */}
                  </div>
                </motion.div>

                {/* 1970 */}
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8">
                    {/* Espacio vacío para balance visual */}
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-30 relative">
                      <span className="text-white font-bold text-2xl">🎲</span>
                    </div>
                    <span className="absolute inset-0 w-20 h-20 bg-rose-400 rounded-full animate-ping opacity-20"></span>
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-sm font-semibold rounded-full mb-2">
                      {history.timeline["1970"].era}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {history.timeline["1970"].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {history.timeline["1970"].description}
                    </p>
                  </div>
                </motion.div>

                {/* Era Digital */}
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="flex items-center"
                >
                  <div className="w-1/2 pr-8 text-right">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-2">
                      {history.timeline.digital.era}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {history.timeline.digital.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {history.timeline.digital.description}
                    </p>
                  </div>
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white z-30 relative">
                      <span className="text-white font-bold text-2xl">💻</span>
                    </div>
                    <span className="absolute inset-0 w-20 h-20 bg-blue-400 rounded-full animate-ping opacity-20"></span>
                  </div>
                  <div className="w-1/2 pl-8">
                    {/* Espacio vacío para balance visual */}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Narrativa principal sin contenedor tipo tarjeta */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-20 text-center max-w-4xl mx-auto"
            >
              <div className="relative">
                {/* Texto principal con efecto de degradado de fondo */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/50 to-transparent blur-xl"></span>

                <div className="relative px-8 py-12">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-8">
                    {history.legacy.title}
                  </h3>

                  <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: history.legacy.description1,
                      }}
                    />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: history.legacy.description2,
                      }}
                    />
                  </div>

                  {/* Estadística llamativa */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                    className="mt-12 flex justify-center items-center space-x-8"
                  >
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        {history.legacy.stats.years}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {history.legacy.stats.yearsLabel}
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                        {history.legacy.stats.possibilities}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {history.legacy.stats.possibilitiesLabel}
                      </div>
                    </div>
                    <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
                    <div className="text-center">
                      <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        {history.legacy.stats.passion}
                      </div>
                      <div className="text-sm text-gray-600 font-medium">
                        {history.legacy.stats.passionLabel}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
