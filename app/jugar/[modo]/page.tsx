"use client";
import React, { useState, createRef, RefObject, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import MaquinaPistas from "../../../components/game/MaquinaPistas";
import { yupResolver } from "@hookform/resolvers/yup";
import HumanoHumano from "../../../components/game/HumanoHumano";
import { toast } from "react-toastify";
import { fnHistorial, pistas } from "../../../helpers/type";
import { schemaMain } from "../../../helpers/validador";
import MotionFade from "../../../components/transitions/MotionFade";
import MotionSimple from "../../../components/transitions/MotionSimple";
import { motion, AnimatePresence } from "framer-motion";
import MaquinaAdivina from "../../../components/game/MaquinaAdivina";
import Link from "next/link";
import { LuBrain, LuGlobe, LuBot, LuX } from "react-icons/lu";

type historialTP = [
  number,
  pistas,
  number | undefined,
  RefObject<HTMLDivElement | null>,
];

// Definir los modos de juego válidos
const MODOS_VALIDOS = {
  hvh: { name: "Humano vs Humano", component: "HvH", icon: LuBrain },
  hvm: { name: "Humano vs Máquina", component: "HvM", icon: LuBot },
  mvh: { name: "Máquina vs Humano", component: "MvH", icon: LuBot },
  torneo: { name: "Torneo Online", component: "HsvHs", icon: LuGlobe },
} as const;

type ModoType = keyof typeof MODOS_VALIDOS;

const GameMode = () => {
  const params = useParams();
  const router = useRouter();
  const modo = params.modo as string;

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
      toast.error("Modo de juego no válido");
      router.push("/jugar");
      return;
    }
  }, [modo, router]);

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
                Modo: {modoConfig.name}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-rose-900 to-amber-900 bg-clip-text text-transparent mb-8 leading-tight">
                Fijas y Picas Online
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                Desafía tu mente con el clásico juego de lógica y deducción.
                Adivina el número secreto usando las pistas de{" "}
                <strong>fijas</strong> y <strong>picas</strong>.
              </p>

              <Link
                className="inline-block bg-white text-rose-600 hover:text-rose-700 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-xl hover:scale-105 mt-6"
                href="/como-jugar"
              >
                Ver Instrucciones Detalladas
              </Link>
            </motion.div>
          </div>

          {/* Game container with design consistency */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
              {/* History sidebar */}
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

              {/* Main game area */}
              <div className="lg:col-span-4 order-1 lg:order-2 relative">
                {/* Close button */}
                <MotionSimple in={true} time={500}>
                  <button
                    onClick={() => {
                      setHistorial([]);
                      toast.error("Se cerró el juego");
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameMode;
