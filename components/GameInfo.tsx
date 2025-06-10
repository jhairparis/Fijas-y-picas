"use client";
import React from "react";
import { motion } from "framer-motion";

export default function GameInfo() {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 right-1/3 w-72 h-72 bg-gradient-to-r from-orange-400/6 to-rose-400/6 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                Conoce el Juego
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-amber-900 to-rose-900 bg-clip-text text-transparent mb-8 leading-tight">
                ¿Qué hace único a Fijas y Picas?
              </h2>
            </motion.div>
          </div>
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
            <div className="lg:col-span-6 mb-12 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Características únicas
                </h3>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-start p-4 bg-white rounded-xl border-2 border-blue-200 shadow-lg"
                  >
                    <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-blue-500 text-white shadow-md flex-shrink-0 mr-4">
                      <span className="font-bold">🧠</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">
                        Desafío intelectual
                      </div>
                      <div className="text-gray-600 text-sm">
                        Cada partida exige formular hipótesis, interpretar
                        pistas y refinar tu estrategia.
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-start p-4 bg-white rounded-xl border-2 border-green-200 shadow-lg"
                  >
                    <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-green-500 text-white shadow-md flex-shrink-0 mr-4">
                      <span className="font-bold">📱</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">
                        Accesibilidad
                      </div>
                      <div className="text-gray-600 text-sm">
                        Juega gratis desde cualquier dispositivo, con modos para
                        un solo jugador, multijugador local o torneos globales.
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-start p-4 bg-white rounded-xl border-2 border-purple-200 shadow-lg"
                  >
                    <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-purple-500 text-white shadow-md flex-shrink-0 mr-4">
                      <span className="font-bold">🌍</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">
                        Multilingüe
                      </div>
                      <div className="text-gray-600 text-sm">
                        Disponible en Español e Inglés, con documentación y
                        tutoriales adaptados a ambos públicos.
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="flex items-start p-4 bg-white rounded-xl border-2 border-orange-200 shadow-lg"
                  >
                    <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-orange-500 text-white shadow-md flex-shrink-0 mr-4">
                      <span className="font-bold">👥</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">
                        Comunidad activa
                      </div>
                      <div className="text-gray-600 text-sm">
                        Únete a foros y grupos de Discord para compartir trucos,
                        retos y mejoras de código.
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Cómo empezar
                </h3>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        1
                      </div>
                      <h4 className="font-bold text-gray-900">Jugar ahora</h4>
                    </div>
                    <p className="text-gray-600">
                      Haz clic en <strong>&quot;Jugar ahora&quot;</strong> para
                      iniciar una partida instantánea.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="p-6 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border-2 border-rose-200 shadow-lg"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        2
                      </div>
                      <h4 className="font-bold text-gray-900">
                        Aprende las reglas
                      </h4>
                    </div>
                    <p className="text-gray-700">
                      Si eres nuevo, visita{" "}
                      <strong>&quot;Cómo jugar&quot;</strong> para entender las
                      reglas y estrategias.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                        3
                      </div>
                      <h4 className="font-bold text-gray-900">Regístrate</h4>
                    </div>
                    <p className="text-gray-600">
                      Regístrate para guardar tu historial, competir en torneos
                      y desbloquear logros exclusivos.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16"
          >
            <div className="p-8 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border-2 border-rose-200 shadow-xl">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent mb-6 text-center">
                Ponte a prueba
              </h3>
              <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                ¿Crees tener la mente lo suficientemente aguda? Da el primer
                paso:
              </p>
              <div className="flex justify-center space-x-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <a
                    href="/jugar"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Jugar ahora
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <a
                    href="/como-jugar"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-rose-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Cómo jugar
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
