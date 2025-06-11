"use client";
import React, { useState, createRef, RefObject } from "react";
import { useForm } from "react-hook-form";
import MaquinaPistas from "../../components/game/MaquinaPistas";
import { yupResolver } from "@hookform/resolvers/yup";
import HumanoHumano from "../../components/game/HumanoHumano";
import { toast } from "react-toastify";
import { fnHistorial, pistas } from "../../helpers/type";
import { schemaMain } from "../../helpers/validador";
import MotionFade from "../../components/transitions/MotionFade";
import MotionSimple from "../../components/transitions/MotionSimple";
import { motion, AnimatePresence } from "framer-motion";
import MaquinaAdivina from "../../components/game/MaquinaAdivina";
import Link from "next/link";
import { LuBrain, LuGlobe, LuBot, LuX } from "react-icons/lu";

type historialTP = [
  number,
  pistas,
  number | undefined,
  RefObject<HTMLDivElement | null>,
];

const Game = () => {
  const [numeroPrincipal, setNumeroPrincipal] = useState<number>(0);
  const [historial, setHistorial] = useState<historialTP[]>([]);
  const [modoDeJuego, setModoDeJuego] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaMain),
  });

  const colores = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-gray-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];

  const noRepeticion = (i: number): string => {
    return colores[i % colores.length];
  };

  const actualizarHistoial: fnHistorial = (val, pista, user) => {
    setHistorial(prevHistorial => [
      ...prevHistorial,
      [val, pista, user, createRef<HTMLDivElement>()],
    ]);
  };

  const onSubmit = (data: { number: number }) => {
    setNumeroPrincipal(data.number);
  };

  const ilustrarPicasYFijas = (item: historialTP): string => {
    let valor: string = "";
    if (item[1].text !== undefined) {
      valor = item[0] + " " + item[1].text;
    } else {
      valor = item[0] + " ";
      const { fijas, picas } = item[1];
      for (let i = 0; i < (fijas > picas ? fijas : picas); i++) {
        if (i < fijas) {
          valor += " 🎯";
        }
        if (i < picas) {
          valor += " 🤡";
        }
      }
    }
    return valor;
  };

  const val: string = String(errors.number?.message || "");

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
                Jugar Ahora
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-6 leading-tight">
                Jugar picas y fijas online – Desafía tu mente con lógica pura
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Desde sus orígenes en los tradicionales juegos de lápiz y papel
                del siglo XIX hasta su adaptación digital actual,{" "}
                <strong>picas y fijas</strong> (también llamado{" "}
                <em>fijas y picas</em>) sigue siendo un reto universal de
                astucia, deducción y estrategia. En esta versión online podrás
                enfrentarte a un número secreto generado aleatoriamente por
                nuestro servidor o retar a amigos en tiempo real, todo desde tu
                navegador, sin descargas ni instalaciones.
              </p>
            </motion.div>
          </div>

          {/* Quick Rules Banner - Optimized for new position */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-rose-600 to-amber-600 rounded-3xl p-6 md:p-8 text-white text-center shadow-2xl mb-8"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-3">
                ¿Listo para el Desafío?
              </h2>
              <p className="text-base md:text-lg opacity-90 mb-4 leading-relaxed">
                Cada partida es única. El número secreto cambia, y con él tu
                necesidad de diseñar nuevas estrategias.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
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
            </div>
          </motion.div>

          {/* Game container with design consistency */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 md:p-8">
            <div
              className={`grid grid-cols-1 gap-6 ${
                modoDeJuego !== "" ? "lg:grid-cols-6" : ""
              }`}
            >
              {/* History sidebar - only show when game mode is selected */}
              {modoDeJuego !== "" && (
                <div className="lg:col-span-1 order-2 lg:order-1">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                    {modoDeJuego === "HvH" ? "Jugador 1" : "Tu historial"}
                  </h3>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {historial?.map((item, i) => {
                        const color = noRepeticion(i);
                        const valor: string = ilustrarPicasYFijas(item);
                        return modoDeJuego === "HvH" ? (
                          item[2] === 0 ? (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className={`${color} text-white text-sm font-medium text-center p-2 rounded-lg shadow`}
                            >
                              {valor}
                            </motion.div>
                          ) : null
                        ) : (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`${color} text-white text-sm font-medium text-center p-2 rounded-lg shadow`}
                          >
                            {valor}
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Main game area */}
              <div
                className={`${
                  modoDeJuego !== "" ? "lg:col-span-4" : ""
                } order-1 lg:order-2 relative`}
              >
                {/* Close button */}
                <MotionSimple in={modoDeJuego !== ""} time={500}>
                  <button
                    onClick={() => {
                      setModoDeJuego("");
                      setHistorial([]);
                      toast.error("Se cerró el juego");
                    }}
                    className="absolute top-0 right-0 z-10 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full flex items-center justify-center shadow-lg transition-colors duration-150"
                  >
                    <LuX className="w-5 h-5" />
                  </button>
                </MotionSimple>

                {/* Game mode selection */}
                <MotionFade in={modoDeJuego === ""}>
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 text-center">
                      Selecciona un modo de juego
                    </h2>
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => setModoDeJuego("HvH")}
                        className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-3 text-center flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      >
                        <LuBrain
                          aria-hidden="true"
                          className="w-6 h-6 mr-2 fill-current"
                        />
                        Modo Clásico (H Vs H)
                      </button>

                      <button
                        type="button"
                        onClick={() => setModoDeJuego("HsvHs")}
                        className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-lg px-5 py-3 text-center flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                      >
                        <LuGlobe
                          aria-hidden="true"
                          className="w-6 h-6 mr-2 fill-current"
                        />
                        Torneo Online (Hs Vs Hs)
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 font-medium rounded-lg text-base px-4 py-3 text-center flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                          onClick={() => setModoDeJuego("HvM")}
                        >
                          <LuBot
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 fill-current"
                          />
                          H Vs M
                        </button>

                        <button
                          type="button"
                          className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 font-medium rounded-lg text-base px-4 py-3 text-center flex items-center justify-center shadow-md hover:shadow-lg transition-all"
                          onClick={() => setModoDeJuego("MvH")}
                        >
                          <LuBot
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 fill-current"
                          />
                          M Vs H
                        </button>
                      </div>
                    </div>
                  </div>
                </MotionFade>

                {/* Number input form */}
                <MotionFade in={modoDeJuego !== "" && numeroPrincipal === 0}>
                  <div className="mb-6">
                    <p className="mb-4 text-lg text-gray-800 text-center font-medium">
                      Hola humano, ¿con cuántos dígitos deseas jugar?
                    </p>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex justify-center"
                    >
                      <div className="flex">
                        <input
                          type="number"
                          {...register("number")}
                          placeholder="3"
                          className={`rounded-l-lg p-3 border-t border-b border-l text-gray-800 bg-white ${
                            errors.number
                              ? "focus:border-red-400 border-red-300"
                              : "focus:border-amber-400 border-gray-300"
                          } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                            errors.number
                              ? "focus:ring-red-300"
                              : "focus:ring-amber-300"
                          }`}
                        />
                        <button
                          type="submit"
                          disabled={!!errors.number}
                          className={`px-6 rounded-r-lg select-none ${
                            errors.number
                              ? "bg-red-400 border-red-400"
                              : "bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 border-amber-400"
                          } text-white font-bold p-3 uppercase border-t border-b border-r focus:outline-none transition-all duration-150`}
                        >
                          Ok
                        </button>
                      </div>
                    </form>
                    {errors.number && (
                      <p className="text-red-600 text-sm mt-2 text-center">
                        {val}
                      </p>
                    )}
                  </div>
                </MotionFade>

                {/* Game components */}
                {modoDeJuego === "HvH" && (
                  <HumanoHumano
                    numeroPrincipal={numeroPrincipal}
                    actualizarHistoial={actualizarHistoial}
                  />
                )}
                {modoDeJuego === "HvM" && (
                  <MaquinaPistas
                    numeroPrincipal={numeroPrincipal}
                    actualizarHistoial={actualizarHistoial}
                  />
                )}
                {modoDeJuego === "MvH" && (
                  <MaquinaAdivina
                    numeroPrincipal={numeroPrincipal}
                    actualizarHistoial={actualizarHistoial}
                  />
                )}
                {modoDeJuego === "HsvHs" && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Lo sentimos
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      Actualmente no hemos podido desarrollar el modo de juego
                      torneo de fijas y picas. Estamos trabajando arduamente
                      para ofrecerte esta emocionante opción de juego lo más
                      pronto posible.
                    </p>
                    <p className="text-lg font-bold text-rose-600 mb-6">
                      ¡Si te gustaría ayudarnos a desarrollar este modo de
                      juego, no dudes y ve a nuestro GITHUB!
                    </p>
                    <p className="text-gray-700 mb-6">
                      Estamos siempre buscando la colaboración de jugadores
                      apasionados como tú. ¡Juntos podemos hacer de fijas y
                      picas un juego aún mejor!
                    </p>
                    <a
                      className="inline-block bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                      href="https://github.com/IllustriousLoop/Fijas-y-picas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ayudar!!
                    </a>
                  </div>
                )}
              </div>

              {/* Second history sidebar for HvH mode */}
              {modoDeJuego === "HvH" && (
                <div className="lg:col-span-1 order-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                    Jugador 2
                  </h3>
                  <div className="space-y-2">
                    <AnimatePresence>
                      {historial?.map((item, i) => {
                        const color = noRepeticion(i);
                        const valor: string = ilustrarPicasYFijas(item);
                        return item[2] === 1 ? (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`${color} text-white text-sm font-medium text-center p-2 rounded-lg shadow`}
                          >
                            {valor}
                          </motion.div>
                        ) : null;
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Information section - Interactive Timeline Design */}
          <div className="max-w-6xl mx-auto mt-16">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-amber-500/10 rounded-full blur-3xl" />
                <h2 className="relative text-3xl md:text-4xl font-bold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent mb-4">
                  ¿Por qué jugar picas y fijas online?
                </h2>
              </div>
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

            {/* Interactive Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Benefit Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-purple-200/50"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🧠</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Potencia Mental
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Cada partida fortalece tu pensamiento lógico y capacidad de
                    deducción estratégica.
                  </p>
                </div>
              </motion.div>

              {/* Benefit Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-amber-200/50"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Precisión
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Desarrolla tu habilidad para procesar pistas y tomar
                    decisiones precisas bajo presión.
                  </p>
                </div>
              </motion.div>

              {/* Benefit Card 3 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="group relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-rose-200/50 md:col-span-2 lg:col-span-1"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-rose-400/20 to-pink-400/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Agilidad Mental
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Mejora tu velocidad de procesamiento y capacidad de
                    adaptación a nuevos desafíos.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Game Modes - Timeline/Accordion Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                  Modos de Juego Disponibles
                </h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  ¡Elige tu modo de juego preferido en nuestro juego de fijas y
                  picas! Cada modo ofrece una experiencia única de lógica y
                  deducción.
                </p>
              </div>

              <div className="space-y-6">
                {/* Classic Mode - Expanded Layout */}
                <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl border border-purple-200/30">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <LuBrain className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-2xl font-bold text-gray-900">
                            Clásico Humano vs Humano
                          </h4>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                            Más Popular
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          En este emocionante juego, dos jugadores se enfrentan
                          para adivinar el número secreto del otro. ¿Te atreves
                          a retar a tus amigos y familiares a una emocionante
                          partida de fijas y picas? ¡Demuestra tus habilidades
                          de lógica y deducción y conviértete en el mejor
                          jugador de fijas y picas de todos!
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg border border-purple-200">
                            👥 2 Jugadores
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg border border-purple-200">
                            🧠 Estrategia
                          </span>
                          <span className="px-3 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg border border-purple-200">
                            ⚡ Tiempo Real
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Mode - Compact Layout */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl border border-emerald-200/30">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                          <LuBot className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            Humano vs Máquina
                          </h4>
                          <span className="text-sm text-emerald-600 font-medium">
                            Entrena tus habilidades
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        ¡Disfruta de un emocionante desafío contra la
                        computadora! Adivina el número secreto generado
                        aleatoriamente y demuestra tus habilidades de lógica.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded border border-emerald-200">
                          🤖 IA Avanzada
                        </span>
                        <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs rounded border border-emerald-200">
                          📊 Práctica
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-200/30">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500"></div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                          <LuBot className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            Máquina vs Humano
                          </h4>
                          <span className="text-sm text-amber-600 font-medium">
                            Desafío inverso
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        La IA intenta adivinar tu número secreto. Observa cómo
                        nuestros algoritmos avanzados procesan las pistas que
                        les das.
                      </p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded border border-amber-200">
                          🔄 Rol Inverso
                        </span>
                        <span className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded border border-amber-200">
                          🧮 Algoritmos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tournament Mode - Special Layout */}
                <div className="relative overflow-hidden bg-gradient-to-r from-rose-500/5 to-pink-500/5 rounded-2xl border border-rose-200/30">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 to-pink-500"></div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg relative">
                          <LuGlobe className="w-10 h-10 text-white" />
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-yellow-800 text-xs font-bold">
                              !
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-2xl font-bold text-gray-900">
                            Torneo Online
                          </h4>
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                            Próximamente
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          ¡Únete al emocionante modo torneo de fijas y picas!
                          Compite contra otros jugadores en un formato de
                          eliminación y lleva a tu equipo a la victoria.
                          ¡Demuestra tus habilidades de lógica y deducción y
                          conviértete en el mejor jugador de fijas y picas de
                          todos!
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
                            🌍 Multijugador Global
                          </span>
                          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
                            🏆 Eliminatorias
                          </span>
                          <span className="px-3 py-1 bg-rose-50 text-rose-600 text-sm rounded-lg border border-rose-200">
                            📈 Rankings
                          </span>
                        </div>
                        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg p-4 border border-rose-200">
                          <p className="text-sm text-rose-700 mb-2">
                            <strong>¡Ayúdanos a desarrollar este modo!</strong>
                          </p>
                          <p className="text-sm text-gray-600 mb-3">
                            Estamos buscando colaboradores apasionados para
                            hacer realidad esta característica.
                          </p>
                          <a
                            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            href="https://github.com/IllustriousLoop/Fijas-y-picas"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>👨‍💻</span>
                            Contribuir en GitHub
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;
