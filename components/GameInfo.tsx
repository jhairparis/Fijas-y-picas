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
                ¿Qué es Fijas y Picas?
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
                  El Juego
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Fijas y Picas es un juego de lógica y deducción donde debes adivinar 
                  un número secreto de 4 dígitos únicos. Cada intento te dará pistas 
                  que te ayudarán a descifrar el código:
                </p>
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center p-4 bg-white rounded-xl border-2 border-green-200 shadow-lg"
                  >
                    <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-green-500 text-white shadow-md flex-shrink-0 mr-4">
                      <span className="font-bold">F</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Fija</div>
                      <div className="text-gray-600 text-sm">Dígito correcto en posición correcta</div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center p-4 bg-white rounded-xl border-2 border-amber-200 shadow-lg"
                  >
                    <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-amber-500 text-white shadow-md flex-shrink-0 mr-4">
                      <span className="font-bold">P</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 mb-1">Pica</div>
                      <div className="text-gray-600 text-sm">Dígito correcto en posición incorrecta</div>
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
                  Historia
                </h3>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="p-6 bg-white rounded-2xl border-2 border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <p className="text-lg text-gray-600 leading-relaxed">
                      También conocido como &ldquo;Bulls and Cows&rdquo; o &ldquo;Mastermind&rdquo;, este juego 
                      tiene sus raíces en los juegos de papel y lápiz del siglo XIX.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="p-6 bg-gradient-to-r from-rose-50 to-amber-50 rounded-2xl border-2 border-rose-200 shadow-lg"
                  >
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Se popularizó enormemente con la versión de mesa creada por 
                      Mordecai Meirowitz en 1970. La versión digital ha mantenido la esencia del juego original: 
                      desafiar tu mente con pura lógica y estrategia, sin depender de la suerte.
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
                ¿Listo para el desafío?
              </h3>
              <p className="text-lg text-gray-700 mb-8 text-center leading-relaxed">
                Pon a prueba tu capacidad de deducción y descubre si puedes 
                resolver el código en el menor número de intentos posible.
              </p>
              <div className="flex justify-center space-x-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span className="text-3xl mb-3 block">🧠</span>
                    <p className="text-sm font-semibold text-gray-700">Lógica</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span className="text-3xl mb-3 block">🎯</span>
                    <p className="text-sm font-semibold text-gray-700">Precisión</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                  className="text-center"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <span className="text-3xl mb-3 block">⚡</span>
                    <p className="text-sm font-semibold text-gray-700">Estrategia</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
