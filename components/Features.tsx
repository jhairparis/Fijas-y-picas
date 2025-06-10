"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiClassicalKnowledge, GiWorld } from "react-icons/gi";
import { SiProbot } from "react-icons/si";
import Image from "next/image";

function Features() {
  const [tab, setTab] = useState(1);

  const tabs = useRef<HTMLDivElement>(null);

  const heightFix = () => {
    if (tabs.current?.children[tab]) {
      const childElement = tabs.current.children[tab - 1] as HTMLElement;
      tabs.current.style.height = childElement.offsetHeight + "px";
    }
  };

  useEffect(() => {
    heightFix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <section className="relative">
      <div
        className="absolute inset-0 bg-gray-100 pointer-events-none mb-16"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="h2 mb-4">Explora los modos de juego</h1>
            <p className="text-xl text-gray-600">
              Se reciben pistas sobre cuántos dígitos están en la posición
              correcta (fijas) y cuántos están en el número pero en posición
              incorrecta (picas). ¡Muy divertido y desafiante!
            </p>
          </div>

          {/* Section content */}
          <div className="md:grid md:grid-cols-12 md:gap-6">
            {/* Content */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 md:mt-6">
              <div className="md:pr-4 lg:pr-12 xl:pr-16 mb-8">
                <h3 className="h3 mb-3">Tres Modos de Juego</h3>
                <p className="text-xl text-gray-600">
                  ¡Elige tu modo de juego preferido en nuestro juego de fijas y
                  picas! Enfrenta a otros jugadores en el modo clásico, a la
                  computadora en el modo contra la computadora o compite en un
                  torneo contra otros jugadores. ¡Demuestra tus habilidades de
                  lógica y deducción en cada partida y conviértete en el mejor
                  jugador de fijas y picas de todos!
                </p>
              </div>
              <div className="mb-8 md:mb-0">
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 1
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#1"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(1);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      ¡Modo Clásico!
                    </div>
                    <div className="text-gray-600">
                      En este emocionante juego, dos jugadores se enfrentan para
                      adivinar el número secreto del otro. ¿Te atreves a retar a
                      tus amigos y familiares a una emocionante partida de fijas
                      y picas? ¡Demuestra tus habilidades de lógica y deducción
                      y conviértete en el mejor jugador de fijas y picas de
                      todos! ¡Anímate a jugar ahora mismo!
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <GiClassicalKnowledge />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 2
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#2"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(2);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      ¡Modo Contra la computadora!
                    </div>
                    <div className="text-gray-600">
                      ¡Disfruta de un emocionante desafío en el modo contra la
                      computadora de fijas y picas! Adivina el número secreto
                      generado aleatoriamente por la computadora y demuestra tus
                      habilidades de lógica y deducción. ¡Anímate a jugar ahora
                      mismo!
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <SiProbot />
                  </div>
                </a>
                <a
                  className={`flex items-center text-lg p-5 rounded border transition duration-300 ease-in-out mb-3 ${
                    tab !== 3
                      ? "bg-white shadow-md border-gray-200 hover:shadow-lg"
                      : "bg-gray-200 border-transparent"
                  }`}
                  href="#3"
                  onClick={(e) => {
                    e.preventDefault();
                    setTab(3);
                  }}
                >
                  <div>
                    <div className="font-bold leading-snug tracking-tight mb-1">
                      Torneo Online
                    </div>
                    <div className="text-gray-600">
                      ¡Únete al emocionante modo torneo de fijas y picas!
                      Compite contra otros jugadores en un formato de
                      eliminación y lleva a tu equipo a la victoria. ¡Demuestra
                      tus habilidades de lógica y deducción y conviértete en el
                      mejor jugador de fijas y picas de todos!
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-8 h-8 bg-white rounded-full shadow flex-shrink-0 ml-3">
                    <GiWorld />
                  </div>
                </a>
              </div>
            </div>

            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1">
              <div className="transition-all">
                <div
                  className="relative flex flex-col text-center lg:text-right"
                  data-aos="zoom-y-out"
                  ref={tabs}
                >
                  <AnimatePresence mode="wait">
                    {/* Item 1 */}
                    {tab === 1 && (
                      <motion.div
                        key="item-1"
                        className="w-full"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{
                          duration: 0.7,
                          ease: "easeInOut",
                        }}
                        onAnimationStart={() => heightFix()}
                      >
                        <div className="relative inline-flex flex-col">
                          <Image // Used next/image
                            className="md:max-w-none mx-auto rounded"
                            src="/images/features-bg-1.png" // Updated path
                            width={500}
                            height={462}
                            alt="Features bg 1"
                          />
                        </div>
                      </motion.div>
                    )}
                    {/* Item 2 */}
                    {tab === 2 && (
                      <motion.div
                        key="item-2"
                        className="w-full"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{
                          duration: 0.7,
                          ease: "easeInOut",
                        }}
                        onAnimationStart={() => heightFix()}
                      >
                        <div className="relative inline-flex flex-col">
                          <Image // Used next/image
                            className="md:max-w-none mx-auto rounded"
                            src="/images/features-bg-2.png" // Updated path
                            width={500}
                            height={462}
                            alt="Features bg 2"
                          />
                        </div>
                      </motion.div>
                    )}
                    {/* Item 3 */}
                    {tab === 3 && (
                      <motion.div
                        key="item-3"
                        className="w-full"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{
                          duration: 0.7,
                          ease: "easeInOut",
                        }}
                        onAnimationStart={() => heightFix()}
                      >
                        <div className="relative inline-flex flex-col">
                          <Image // Used next/image
                            className="md:max-w-none mx-auto rounded"
                            src="/images/features-bg-3.png" // Updated path
                            width={500}
                            height={462}
                            alt="Features bg 3"
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
