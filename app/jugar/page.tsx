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
import { GiClassicalKnowledge, GiWorld } from "react-icons/gi";
import { SiProbot } from "react-icons/si";

type historialTP = [
  number,
  pistas,
  number | undefined,
  RefObject<HTMLDivElement | null>
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
  const colores = ["red", "green", "blue", "yellow", "gray", "purple"];

  let v = 0;
  const noRepeticion = (i: number) => {
    v++;
    if (i < colores.length) return colores[i];
    else {
      if (v > colores.length - 1) v = 0;
      return colores[v];
    }
  };

  const actualizarHistoial: fnHistorial = (val, pista, user) => {
    setHistorial([
      ...historial,
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
    <div className="grid grid-cols-6 gap-2 font-sans">
      <div className="col-span-1 flex flex-col justify-center">
        <AnimatePresence>
          {historial?.map((item, i) => {
            const color = noRepeticion(i);
            const valor: string = ilustrarPicasYFijas(item);
            return modoDeJuego === "HvH" ? (
              item[2] === 0 ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                  className={`burbleHistory burbleHistory-${color}`}
                >
                  {valor}
                </motion.div>
              ) : null
            ) : (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                className={`burbleHistory burbleHistory-${color}`}
              >
                {valor}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
      <div className="col-span-4 flex justify-center items-center">
        <div className="p-6 max-w-lg mx-auto">
          <MotionSimple in={modoDeJuego !== ""} time={500}>
            <button
              onClick={() => {
                setModoDeJuego("");
                setHistorial([]);
                toast.error("Se cerro el juego");
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </button>
          </MotionSimple>

          <div className="p-4">
            <h1 className="font-logo text-4xl text-center my-4 select-none hover:text-gray-700">
              Fijas y Picas
            </h1>
            <p className="text-gray-700 mb-4">
              A lo largo de la historia, este juego ha sido una prueba de la
              astucia, la deducción y la lógica de los jugadores.
              <span className="text-lg font-bold text-indigo-600">
                {" "}
                Pero no te dejes engañar por su simplicidad,
              </span>{" "}
              porque detrás de cada partida se esconde una oportunidad única de
              <span className="text-lg font-bold text-indigo-600">
                {" "}
                desafiar a tus habilidades y mejorar tus estrategias.
              </span>{" "}
              ¡Así que no te rindas nunca, siempre está el próximo número
              secreto esperando por ti! ¡Buena suerte y disfruta del juego!
              <br />
              <br />
            </p>
            <p className="text-gray-700 mb-4">
              ¡No olvides visitar las{" "}
              <Link
                className="text-lg font-bold text-indigo-600"
                href="/como-jugar" // Changed from to to href
              >
                instrucciones{" "}
              </Link>{" "}
              para aprender a jugar!
            </p>
          </div>

          <MotionFade in={modoDeJuego === ""}>
            <button
              type="button"
              onClick={() => setModoDeJuego("HvH")}
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <GiClassicalKnowledge
                aria-hidden="true"
                className="w-8 h-8 mr-2 fill-current"
              />
              Modo Clasico (H Vs H)
            </button>
            <button
              type="button"
              onClick={() => setModoDeJuego("HsvHs")}
              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              <GiWorld
                aria-hidden="true"
                className="w-8 h-8 mr-2 fill-current"
              />
              Torneo Online (Hs Vs Hs)
            </button>

            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => setModoDeJuego("HvM")}
              >
                <SiProbot
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 fill-current"
                />
                Modo Contra la computadora (H Vs M)
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => setModoDeJuego("MvH")}
              >
                <SiProbot
                  aria-hidden="true"
                  className="w-8 h-8 mr-2 fill-current"
                />
                Modo Contra la computadora (M Vs H)
              </button>
            </div>
          </MotionFade>

          <MotionFade in={modoDeJuego !== "" && numeroPrincipal === 0}>
            <p className="my-4">
              Hola humano, con cuantos digitos deseas jugar
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="my-3 flex">
              <div className="relative">
                <input
                  type="number"
                  id="number"
                  {...register("number")}
                  placeholder="3"
                  className={`rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800  bg-white ${
                    errors.number
                      ? "focus:border-red-400"
                      : "focus:border-blue-400"
                  } border-gray-200 placeholder-gray-400 focus:outline-none`}
                />
                <label
                  htmlFor="number"
                  className="absolute left-0 -top-5 text-gray-600 text-sm ml-1 select-none"
                >
                  {val}
                </label>
              </div>
              <button
                type="submit"
                disabled={errors.number ? true : false}
                className={`px-4 rounded-r-lg select-none ${
                  errors.number ? "bg-red-400" : "bg-blue-400"
                } text-gray-800 font-bold p-2 uppercase ${
                  errors.number ? "border-red-400" : "border-blue-400"
                } border-t border-b border-r focus:outline-none`}
              >
                Ok
              </button>
            </form>
          </MotionFade>
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
            <div className="text-center p-4">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Lo sentimos
              </h1>
              <p className="text-gray-700 mb-4">
                Actualmente no hemos podido desarrollar el modo de juego torneo
                de fijas y picas. Estamos trabajando arduamente para ofrecerte
                esta emocionante opción de juego lo más pronto posible.
                <br />
                <span className="text-lg font-bold text-indigo-600">
                  ¡Si te gustaría ayudarnos a desarrollar este modo de juego, no
                  dudes y ve a nuestro GITHUB!
                </span>
                <br />
                Estamos siempre buscando la colaboración de jugadores
                apasionados como tú. ¡Juntos podemos hacer de fijas y picas un
                juego aún mejor!
              </p>
              <a
                className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                href="https://github.com/IllustriousLoop/Fijas-y-picas"
              >
                Ayudar!!
              </a>
            </div>
          )}
        </div>
      </div>
      {modoDeJuego === "HvH" ? (
        <div className="col-span-1 flex flex-col justify-center">
          <AnimatePresence>
            {historial?.map((item, i) => {
              const color = noRepeticion(i);
              const valor: string = ilustrarPicasYFijas(item);
              return item[2] === 1 ? (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                  className={`burbleHistory burbleHistory-${color}`}
                >
                  {valor}
                </motion.div>
              ) : null;
            })}
          </AnimatePresence>
        </div>
      ) : null}
    </div>
  );
};

export default Game;
