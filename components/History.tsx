"use client";
import React from "react";
import { motion } from "framer-motion";

export default function History() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-amber-50 to-rose-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 right-1/3 w-72 h-72 bg-gradient-to-r from-amber-400/6 to-rose-400/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-rose-400/8 to-orange-400/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                Tradición y Evolución
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-900 to-orange-900 bg-clip-text text-transparent mb-8 leading-tight">
                Historia y evolución
              </h2>
            </motion.div>
          </div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50"
            >
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">📜</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Siglo XIX
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Orígenes en Inglaterra como juego de papel y lápiz
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">🎲</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">1970</h3>
                  <p className="text-gray-600 text-sm">
                    Mastermind revoluciona el concepto
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Hoy</h3>
                  <p className="text-gray-600 text-sm">
                    Experiencia digital moderna y global
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="prose prose-lg mx-auto text-center"
              >
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Lo que comenzó como un simple juego de papel y lápiz en
                  Inglaterra a finales del siglo XIX evolucionó hasta
                  convertirse en Mastermind en la década de 1970. Hoy,{" "}
                  <strong className="text-rose-600">
                    Fijas y Picas online
                  </strong>{" "}
                  conserva esa esencia: pura lógica y estrategia, sin depender
                  de la suerte.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nuestra plataforma digital añade funcionalidades modernas,
                  comunidades y actualización constante de modos de juego,
                  manteniendo viva la tradición de deducción numérica que ha
                  fascinado a generaciones de jugadores en todo el mundo.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  De Bulls and Cows a la era digital
                </h4>
                <p className="text-gray-700 text-center leading-relaxed">
                  Más de 150 años de evolución han llevado este fascinante juego
                  de deducción desde las páginas de los periódicos victorianos
                  hasta tu navegador, manteniendo intacta su capacidad de
                  desafiar y entretener mentes curiosas.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
