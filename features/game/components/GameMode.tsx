"use client";

import React, { useState, createRef, RefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LuBrain, LuGlobe, LuBot, LuX } from "react-icons/lu";

import MaquinaPistas from "@/features/game/components/MaquinaPistas";
import HumanoHumano from "@/features/game/components/HumanoHumano";
import MaquinaAdivina from "@/features/game/components/MaquinaAdivina";
import MotionFade from "@/components/transitions/MotionFade";
import MotionSimple from "@/components/transitions/MotionSimple";
import { fnHistorial, pistas } from "@/types/game";
import { schemaMain } from "@/features/game/utils/validador";
import type { Dictionary } from "@/lib/types";
import type { Locale } from "@/lib/i18n";

type historialTP = [
  number,
  pistas,
  number | undefined,
  RefObject<HTMLDivElement | null>,
];

// Definir los modos de juego válidos
const MODOS_VALIDOS = {
  hvh: { name: "hvh", component: "HvH", icon: LuBrain },
  hvm: { name: "hvm", component: "HvM", icon: LuBot },
  mvh: { name: "mvh", component: "MvH", icon: LuBot },
  torneo: { name: "torneo", component: "HsvHs", icon: LuGlobe },
} as const;

type ModoType = keyof typeof MODOS_VALIDOS;

interface GameModeProps {
  modo: string;
  dict: Dictionary;
  lang: Locale;
}

export default function GameMode({ modo, dict, lang }: GameModeProps) {
  const router = useRouter();

  const [numeroPrincipal, setNumeroPrincipal] = useState<number>(0);
  const [historial, setHistorial] = useState<historialTP[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaMain),
  });

  // Verificar si el modo es válido
  useEffect(() => {
    if (!modo || !(modo.toLowerCase() in MODOS_VALIDOS)) {
      toast.error(dict.game.errors.invalidNumber || "Modo de juego no válido");
      router.push("/jugar");
      return;
    }
  }, [modo, router, dict]);

  const modoConfig = MODOS_VALIDOS[modo?.toLowerCase() as ModoType];
  const modoDeJuego = modoConfig?.component || "";

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

  // Si el modo no es válido, no renderizar nada
  if (!modo || !(modo.toLowerCase() in MODOS_VALIDOS)) {
    return null;
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background gradients consistent with site design */}
      <span
        className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none"
        aria-hidden="true"
      />

      <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <span className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />

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
                {dict.gamePage?.modePrefix || "Modo:"}{" "}
                {dict.gamePage?.modes?.[
                  modo?.toLowerCase() as keyof typeof dict.gamePage.modes
                ] ||
                  modoConfig?.name ||
                  modo}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                {dict.gamePage?.title || "Fijas y Picas Online"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                {dict.gamePage?.description ||
                  "Desafía tu mente con el clásico juego de lógica y deducción. Adivina el número secreto usando las pistas de fijas y picas."}
              </p>

              <Link
                className="inline-block bg-white text-rose-600 hover:text-rose-700 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 mt-6"
                href={`/${lang}/como-jugar`}
              >
                {dict.gamePage?.detailedInstructions ||
                  "Ver Instrucciones Detalladas"}
              </Link>
            </motion.div>
          </div>

          {/* Game container with design consistency */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
              {/* History sidebar */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                  {modoDeJuego === "HvH"
                    ? dict.gamePage?.player1 || "Jugador 1"
                    : dict.gamePage?.yourHistory || "Tu historial"}
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

              {/* Second history sidebar for HvH mode */}
              {modoDeJuego === "HvH" && (
                <div className="lg:col-span-1 order-3">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 text-center">
                    {dict.gamePage?.player2 || "Jugador 2"}
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

              {/* Main game area */}
              <div className="lg:col-span-4 order-1 lg:order-2 relative">
                {/* Close button */}
                <MotionSimple in={true} time={500}>
                  <button
                    onClick={() => {
                      setHistorial([]);
                      toast.error(
                        dict.gamePage?.gameClosedMessage || "Se cerró el juego"
                      );
                      router.push("/jugar");
                    }}
                    className="absolute top-0 right-0 z-10 bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded-full flex items-center justify-center shadow-lg transition-colors duration-150"
                  >
                    <LuX className="w-5 h-5" />
                  </button>
                </MotionSimple>

                {/* Number input form */}
                <MotionFade in={numeroPrincipal === 0}>
                  <div className="mb-6">
                    <p className="mb-4 text-lg text-gray-800 text-center font-medium">
                      {dict.gamePage?.digitQuestion ||
                        "Hola humano, ¿con cuántos dígitos deseas jugar?"}
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
                          {dict.gamePage?.submitButton || "Ok"}
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
                    dict={dict}
                  />
                )}
                {modoDeJuego === "HvM" && (
                  <MaquinaPistas
                    numeroPrincipal={numeroPrincipal}
                    actualizarHistoial={actualizarHistoial}
                    dict={dict}
                  />
                )}
                {modoDeJuego === "MvH" && (
                  <MaquinaAdivina
                    numeroPrincipal={numeroPrincipal}
                    actualizarHistoial={actualizarHistoial}
                    dict={dict}
                  />
                )}
                {modoDeJuego === "HsvHs" && (
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      {dict.gamePage?.tournamentNotAvailable?.title ||
                        "Lo sentimos"}
                    </h2>
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {dict.gamePage?.tournamentNotAvailable?.description ||
                        "Actualmente no hemos podido desarrollar el modo de juego torneo de fijas y picas. Estamos trabajando arduamente para ofrecerte esta emocionante opción de juego lo más pronto posible."}
                    </p>
                    <p className="text-lg font-bold text-rose-600 mb-6">
                      {dict.gamePage?.tournamentNotAvailable?.githubMessage ||
                        "¡Si te gustaría ayudarnos a desarrollar este modo de juego, no dudes y ve a nuestro GITHUB!"}
                    </p>
                    <p className="text-gray-700 mb-6">
                      {dict.gamePage?.tournamentNotAvailable
                        ?.collaborationMessage ||
                        "Estamos siempre buscando la colaboración de jugadores apasionados como tú. ¡Juntos podemos hacer de fijas y picas un juego aún mejor!"}
                    </p>
                    <a
                      className="inline-block bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                      href="https://github.com/jhairparis/Fijas-y-picas"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dict.gamePage?.tournamentNotAvailable?.helpButton ||
                        "Ayudar!!"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
