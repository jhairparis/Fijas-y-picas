"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiGamepadLine, RiComputerLine, RiTrophyLine, RiPlayCircleLine } from "react-icons/ri";

const Comojugar = () => {
  const gameModes = [
    {
      icon: RiGamepadLine,
      title: "Modo Clásico",
      description: "En este modo, dos jugadores se enfrentan para adivinar el número secreto del otro. El primero en adivinarlo gana.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: RiComputerLine,
      title: "Modo Contra la Computadora",
      description: "En este modo, un jugador se enfrenta a la computadora para adivinar un número generado aleatoriamente por ella.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: RiTrophyLine,
      title: "Modo Torneo",
      description: "En este modo, varios jugadores compiten entre sí en un formato de eliminación, donde el último jugador en adivinar el número secreto en cada ronda avanza a la siguiente. El ganador del torneo es el último jugador en quedarse en pie.",
      color: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient similar to main page */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none" aria-hidden="true" />
      
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-16 md:pt-20 pb-16 md:pb-20">
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center pb-16 md:pb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                Guía de Juego
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                Cómo Jugar Fijas y Picas
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Descubre los diferentes modos de juego y conviértete en un maestro de la deducción
              </p>
            </motion.div>
          </div>

          {/* Game Example Section */}
          <div className="max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Cómo funciona el juego?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Es simple: debes adivinar un número secreto de 4 dígitos únicos. Con cada intento, recibes pistas que te ayudan a acercarte a la respuesta.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Rules Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Las Reglas Básicas
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Número secreto de 4 dígitos</p>
                      <p className="text-gray-600 text-sm">Todos los dígitos son diferentes (ej: 1234, 5678)</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Haces un intento</p>
                      <p className="text-gray-600 text-sm">Propones tu número de 4 dígitos únicos</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Recibes pistas</p>
                      <p className="text-gray-600 text-sm">Te dicen cuántas &quot;fijas&quot; y &quot;picas&quot; tienes</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hints Explanation */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  ¿Qué significan las pistas?
                </h3>
                <div className="space-y-6">
                  <div className="bg-green-50 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full mr-3"></div>
                      <h4 className="font-bold text-green-800">FIJAS</h4>
                    </div>
                    <p className="text-green-700 text-sm">
                      Dígitos correctos en la posición correcta
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full mr-3"></div>
                      <h4 className="font-bold text-yellow-800">PICAS</h4>
                    </div>
                    <p className="text-yellow-700 text-sm">
                      Dígitos correctos pero en posición incorrecta
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Example */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Ejemplo Paso a Paso
              </h3>
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                  <p className="text-center text-lg font-semibold text-gray-800 mb-2">
                    Número Secreto: <span className="font-mono bg-gray-800 text-white px-3 py-1 rounded">1234</span>
                  </p>
                  <p className="text-center text-sm text-gray-600">(En un juego real, esto estaría oculto)</p>
                </div>

                <div className="space-y-4">
                  {/* Attempt 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white rounded-2xl p-4 border border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Intento 1</p>
                      <p className="font-mono text-xl font-bold">5678</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Resultado</p>
                      <div className="flex justify-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">0 Fijas</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">0 Picas</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Conclusión</p>
                      <p className="text-sm text-gray-700">Ningún dígito coincide</p>
                    </div>
                  </div>

                  {/* Attempt 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white rounded-2xl p-4 border border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Intento 2</p>
                      <p className="font-mono text-xl font-bold">1032</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Resultado</p>
                      <div className="flex justify-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">1 Fija</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">2 Picas</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Conclusión</p>
                      <p className="text-sm text-gray-700">El 1 está bien ubicado, 3 y 2 existen pero mal ubicados</p>
                    </div>
                  </div>

                  {/* Attempt 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white rounded-2xl p-4 border border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Intento 3</p>
                      <p className="font-mono text-xl font-bold">1234</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Resultado</p>
                      <div className="flex justify-center space-x-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">4 Fijas</span>
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">0 Picas</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Conclusión</p>
                      <p className="text-sm font-bold text-green-700">¡Ganaste! 🎉</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 rounded-2xl p-4 border border-blue-200">
                  <p className="text-blue-800 text-center">
                    <strong>💡 Tip:</strong> Usa la lógica de las pistas anteriores para hacer mejores intentos. 
                    Cada pista te da información valiosa sobre qué dígitos están en el número secreto.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Game Modes Grid */}
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {gameModes.map((mode, index) => {
              const IconComponent = mode.icon;
              return (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-200/50 h-full">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${mode.color} rounded-2xl mb-6 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {mode.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200/50 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                ¿Listo para el Desafío?
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Pon a prueba tu lógica y habilidades de deducción. ¡Cada partida es una nueva oportunidad de superarte!
              </p>
              <Link
                href="/jugar"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <RiPlayCircleLine className="w-6 h-6 mr-2" />
                Empezar a Jugar
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Comojugar;
