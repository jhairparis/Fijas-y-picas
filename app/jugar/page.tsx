"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LuBrain, LuGlobe, LuBot, LuPlay } from "react-icons/lu";

const Game = () => {
  const gameOptions = [
    {
      id: "hvh",
      title: "Humano vs Humano",
      description: "Juega contra otro jugador en modo local",
      icon: LuBrain,
      color: "from-purple-600 to-blue-500",
      hoverColor: "hover:from-purple-700 hover:to-blue-600",
    },
    {
      id: "hvm",
      title: "Humano vs Máquina",
      description: "Enfréntate a la inteligencia artificial",
      icon: LuBot,
      color: "from-blue-600 to-cyan-500",
      hoverColor: "hover:from-blue-700 hover:to-cyan-600",
    },
    {
      id: "mvh",
      title: "Máquina vs Humano",
      description: "La máquina intenta adivinar tu número",
      icon: LuBot,
      color: "from-green-600 to-teal-500",
      hoverColor: "hover:from-green-700 hover:to-teal-600",
    },
    {
      id: "torneo",
      title: "Torneo Online",
      description: "Compite contra jugadores de todo el mundo",
      icon: LuGlobe,
      color: "from-pink-500 to-orange-400",
      hoverColor: "hover:from-pink-600 hover:to-orange-500",
      disabled: true,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradients consistent with site design */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none"
        aria-hidden="true"
      />

      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          {/* Header section */}
          <div className="max-w-4xl mx-auto text-center pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                Selecciona tu modo de juego
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                Fijas y Picas Online
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Desafía tu mente con el clásico juego de lógica y deducción.
                Elige tu modo preferido y comienza a jugar.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-sm font-semibold">
                    🎯 Fijas: Posición correcta
                  </span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <span className="text-sm font-semibold">
                    🤡 Picas: Número correcto
                  </span>
                </div>
              </div>

              <Link
                className="inline-block bg-white text-rose-600 hover:text-rose-700 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:scale-105"
                href="/como-jugar"
              >
                Ver Instrucciones Detalladas
              </Link>
            </motion.div>
          </div>

          {/* Game mode selection */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
                Selecciona un modo de juego
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gameOptions.map((option, index) => {
                  const IconComponent = option.icon;

                  if (option.disabled) {
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="relative p-6 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-75"
                      >
                        <div className="flex items-center justify-center mb-4">
                          <IconComponent className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-500 text-center mb-2">
                          {option.title}
                        </h3>
                        <p className="text-gray-400 text-center text-sm mb-4">
                          {option.description}
                        </p>
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                            Próximamente
                          </span>
                        </div>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={`/jugar/${option.id}`}
                        className={`block p-6 rounded-2xl border-2 border-transparent bg-gradient-to-br ${option.color} ${option.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
                      >
                        <div className="flex items-center justify-center mb-4">
                          <IconComponent className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <h3 className="text-xl font-bold text-center mb-2">
                          {option.title}
                        </h3>
                        <p className="text-white/90 text-center text-sm mb-4">
                          {option.description}
                        </p>
                        <div className="flex items-center justify-center">
                          <LuPlay className="w-5 h-5 mr-2" />
                          <span className="font-semibold">Jugar ahora</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Additional game info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 text-center"
            >
              <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Además de ser un pasatiempo adictivo,{" "}
                  <strong>picas y fijas online</strong> fortalece tu pensamiento
                  lógico, la resolución de problemas y la capacidad para
                  procesar información parcial. Cada intento aporta pistas
                  —fijas (dígitos correctos en la posición exacta) y picas
                  (dígitos correctos en posición distinta)— y tu objetivo es
                  deducir el código en el menor número de rondas.
                </p>
              </div>
            </motion.div>

            {/* Game benefits section */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {/* Benefit Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mb-4">
                    🧠
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Entrenamiento Mental
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Mejora tu capacidad de razonamiento lógico y deductivo con
                    cada partida.
                  </p>
                </div>
              </motion.div>

              {/* Benefit Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-2xl mb-4">
                    ⚡
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Agilidad Mental
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Mejora tu velocidad de procesamiento y capacidad de
                    adaptación a nuevos desafíos.
                  </p>
                </div>
              </motion.div>

              {/* Benefit Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-rose-500 to-orange-600 rounded-full flex items-center justify-center text-2xl mb-4">
                    🎯
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    Precisión y Estrategia
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Desarrolla estrategias efectivas y aprende a tomar
                    decisiones bajo presión.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
