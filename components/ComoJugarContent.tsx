"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuPlay } from "react-icons/lu";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/types";

interface ComoJugarContentProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ComoJugarContent({
  lang,
  dict,
}: ComoJugarContentProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                {dict.comoJugar.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                {dict.comoJugar.title}
              </h1>
              <p
                className="text-xl md:text-2xl text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: dict.comoJugar.description }}
              />
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dict.comoJugar?.basicRules?.title || "Reglas básicas"}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-1 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
              >
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        <strong>
                          {dict.comoJugar?.basicRules?.rule1?.title ||
                            "Código secreto de 4 dígitos:"}
                        </strong>
                      </p>
                      <p className="text-gray-600">
                        {dict.comoJugar?.basicRules?.rule1?.description ||
                          "Cada dígito es distinto (por ejemplo, 2037)."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        <strong>
                          {dict.comoJugar?.basicRules?.rule2?.title ||
                            "Intento:"}
                        </strong>
                      </p>
                      <p className="text-gray-600">
                        {dict.comoJugar?.basicRules?.rule2?.description ||
                          "Propones otro número de 4 cifras sin repeticiones."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        <strong>
                          {dict.comoJugar?.basicRules?.rule3?.title ||
                            "Respuesta:"}
                        </strong>
                      </p>
                      <p className="text-gray-600">
                        {dict.comoJugar?.basicRules?.rule3?.description ||
                          "Te informamos cuántas fijas (dígitos correctos en la posición exacta) y cuántas picas (dígitos correctos en distinta posición) obtuviste."}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {dict.comoJugar?.detailedExample?.title || "Ejemplo detallado"}
              </h3>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                  <p className="text-center text-lg font-semibold text-gray-800 mb-2">
                    {dict.comoJugar?.detailedExample?.secretNumber ||
                      "Número secreto:"}{" "}
                    <span className="font-mono bg-gray-800 text-white px-3 py-1 rounded">
                      5327
                    </span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white rounded-2xl p-4 border border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">
                        {dict.comoJugar?.detailedExample?.attempt || "Intento"}
                      </p>
                      <p className="font-mono text-xl font-bold">5728</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">
                        {dict.comoJugar?.detailedExample?.result || "Resultado"}
                      </p>
                      <div className="flex justify-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          1 {dict.comoJugar?.detailedExample?.fijas || "Fija"}
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                          2 {dict.comoJugar?.detailedExample?.picas || "Picas"}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">
                        {dict.comoJugar?.detailedExample?.analysis ||
                          "Análisis"}
                      </p>
                      <p className="text-sm text-gray-700">
                        {dict.comoJugar?.detailedExample?.analysisText ||
                          "5 en primera posición correcta, 7 y 2 existen pero cambian de lugar"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <p className="text-blue-800 text-center">
                    <strong>
                      💡{" "}
                      {dict.comoJugar?.detailedExample?.info || "Información:"}
                    </strong>{" "}
                    {dict.comoJugar?.detailedExample?.infoText ||
                      "Gracias a esta información, podrás descartar dígitos y ubicar los correctos con lógica deductiva."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dict.comoJugar?.expertTips?.title || "Consejos de expertos"}
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
            >
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-4 mt-1">
                    •
                  </div>
                  <p className="text-gray-700">
                    {dict.comoJugar?.expertTips?.tip1 ||
                      "Empieza con números que incluyan dígitos alejados (0–9) para maximizar la información de la primera pista."}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-4 mt-1">
                    •
                  </div>
                  <p className="text-gray-700">
                    {dict.comoJugar?.expertTips?.tip2 ||
                      "Anota cada intento y pista; construye un pequeño mapa de posibilidades."}
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-4 mt-1">
                    •
                  </div>
                  <p className="text-gray-700">
                    {dict.comoJugar?.expertTips?.tip3 ||
                      "Prioriza descartar primero dígitos para acotar el rango de búsqueda."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dict.comoJugar?.advancedModes?.title || "Modos avanzados"}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <strong>
                    {dict.comoJugar?.advancedModes?.repeats?.title ||
                      "Repeticiones permitidas"}
                  </strong>
                </h3>
                <p className="text-gray-600">
                  {dict.comoJugar?.advancedModes?.repeats?.description ||
                    "Aumenta la dificultad permitiendo dígitos iguales en el código secreto."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <strong>
                    {dict.comoJugar?.advancedModes?.variableLength?.title ||
                      "Longitud variable"}
                  </strong>
                </h3>
                <p className="text-gray-600">
                  {dict.comoJugar?.advancedModes?.variableLength?.description ||
                    "Juega con códigos de 3 a 6 dígitos según tu nivel de experiencia."}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-200/50"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  <strong>
                    {dict.comoJugar?.advancedModes?.timed?.title ||
                      "Contrarreloj"}
                  </strong>
                </h3>
                <p className="text-gray-600">
                  {dict.comoJugar?.advancedModes?.timed?.description ||
                    "Adivina el código antes de que se agote el tiempo para llevar tu lógica al límite."}
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
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
                  <LuPlay className="w-6 h-6 mr-2" />
                  {dict.comoJugar.challenge.playButton}
                </Link>
                <Link
                  href={`/${lang}/faq`}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-rose-600 bg-white hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Preguntas Frecuentes
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
