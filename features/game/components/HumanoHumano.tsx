import React, { useEffect, useState, createRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Props, inputs as InputFormType, arrayC } from "@/types/game";
import {
  schemaEntradas,
  schemaFijasPicas,
} from "@/features/game/utils/validador";
import MotionSimple from "@/components/transitions/MotionSimple";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Dictionary } from "@/lib/types";

// Define a type for the input items with their refs
type InputItem = {
  id: string;
  nodeRef: React.RefObject<HTMLDivElement | null>; // Ref for the CSSTransition's direct child
  // Add any other properties needed for rendering the input, if not using register directly
};

type FijasPicasForm = {
  fijas: number;
  picas: number;
};

interface HumanoHumanoProps extends Props {
  dict: Dictionary;
}

const HumanoHumano = ({
  numeroPrincipal,
  actualizarHistoial,
  dict,
}: HumanoHumanoProps) => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();
  const twoForm = useForm({ resolver: yupResolver(schemaFijasPicas) });

  const [inputItems, setInputItems] = useState<InputItem[]>([]); // Changed state name and type
  const [jugadorUno, setJugadorUno] = useState<string>("dar");
  const [jugadorDos, setJugadorDos] = useState<string>("");
  const [mostrarDigitos, setMostrarDigitos] = useState<boolean>();
  const [mostrarFijasEntrada, setmostrarFijasEntrada] = useState<boolean>();
  const [numeroJugado, setNumeroJugado] = useState<number>(0);

  const recepcionEntradas: SubmitHandler<InputFormType> = data => {
    const arrayCompleto: Array<arrayC> = [];
    for (let i = 0; i < numeroPrincipal; i++)
      arrayCompleto.push([parseInt(data[`number${i}`]), false]);

    const arrayValores: number[] = [];
    arrayCompleto.forEach(arr => arrayValores.push(arr[0]));
    const comprobar = () => {
      let prueba = true;
      //comprobar si hay un elemento repetido en arrayValores
      for (let i = 0; i < arrayValores.length; i++) {
        for (let j = 0; j < arrayValores.length; j++) {
          if (i !== j && arrayValores[i] === arrayValores[j]) {
            prueba = false;
          }
        }
      }
      return prueba;
    };
    const numeroR = comprobar();
    arrayCompleto.forEach((val, i) => {
      if (isNaN(val[0])) {
        toast.error(
          dict.game.errors.invalidNumber.replace("{{position}}", String(i + 1))
        );
      } else if (!numeroR) {
        if (i === numeroPrincipal - 1) {
          if (jugadorUno === "dar") {
            actualizarHistoial(
              parseInt(arrayValores.join("")),
              {
                picas: 0,
                fijas: 0,
                text: dict.game.errors.duplicateNumber,
              },
              0
            );
          } else if (jugadorDos === "dar") {
            actualizarHistoial(
              parseInt(arrayValores.join("")),
              {
                picas: 0,
                fijas: 0,
                text: dict.game.errors.duplicateNumber,
              },
              1
            );
          }
          toast.info(dict.game.info.duplicateReminder);
        }
      } else {
        if (i === numeroPrincipal - 1) {
          if (jugadorUno === "dar") {
            setJugadorUno("espera");
            setJugadorDos("pista");
            toast.info(dict.game.info.player2GivePicas);
            setNumeroJugado(parseInt(arrayValores.join("")));
          } else if (jugadorDos === "dar") {
            setJugadorUno("pista");
            setJugadorDos("espera");
            toast.info(dict.game.info.player1GivePicas);
            setNumeroJugado(parseInt(arrayValores.join("")));
          }
          setMostrarDigitos(false);
          setmostrarFijasEntrada(true);
        }
      }
    });
  };

  useEffect(() => {
    for (let i = 0; i < numeroPrincipal; i++) unregister(`number${i}`);

    const newItems: InputItem[] = [];
    for (let i = 0; i < numeroPrincipal; i++) {
      newItems.push({
        id: `number${i}`,
        nodeRef: createRef<HTMLDivElement>(), // Create ref here
      });
    }
    setInputItems(newItems); // Store items with their refs
    setMostrarDigitos(true);
    if (numeroPrincipal > 0) {
      toast.success(dict.game.success.gameStarted);
    }
  }, [numeroPrincipal, unregister, dict.game.success.gameStarted]); // Added unregister and dict to dependency array

  const onSubmitFijasPicas: SubmitHandler<FijasPicasForm> = data => {
    const picas = data.picas;
    const fijas = data.fijas;
    if (picas + fijas > numeroPrincipal) {
      toast.error(dict.game.errors.sumExceeded);
    } else if (fijas === numeroPrincipal) {
      if (jugadorUno === "espera") {
        toast.success(dict.game.success.player1Won);
      }
      if (jugadorDos === "espera") {
        toast.success(dict.game.success.player2Won);
      }
    } else {
      if (jugadorUno === "espera") {
        actualizarHistoial(numeroJugado, { picas, fijas }, 0);
        setJugadorUno("");
        setJugadorDos("dar");
        toast.info(dict.game.info.guessPlayer1);
      } else if (jugadorDos === "pista") {
        setJugadorUno("dar");
        setJugadorDos("");
        toast.info(dict.game.info.guessPlayer2);
      } else if (jugadorDos === "espera") {
        setJugadorUno("dar");
        setJugadorDos("");
        actualizarHistoial(numeroJugado, { picas, fijas }, 1);
        toast.info(dict.game.info.guessPlayer2);
      }
      setmostrarFijasEntrada(false);
      setMostrarDigitos(true);
    }
  };

  return (
    <>
      <form
        className={mostrarDigitos ? "my-4 " : "hidden"}
        onSubmit={handleSubmit(recepcionEntradas)}
      >
        <div className="grid grid-cols-3 gap-x-1 gap-y-4">
          <AnimatePresence>
            {inputItems.map((item, i) => {
              const inputId = `number${i}`;
              const val: string = errors[inputId]
                ? String(errors[inputId]?.message || "")
                : "";
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                  className="relative"
                >
                  <input
                    id={inputId}
                    type="number"
                    {...register(inputId, schemaEntradas)}
                    placeholder={dict.game.ui.digit.replace(
                      "{{number}}",
                      String(i + 1)
                    )}
                    className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
                  />
                  <label
                    htmlFor={inputId}
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm ml-1 select-none"
                  >
                    {val}
                  </label>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {inputItems.length > 0 && (
          <MotionSimple in={inputItems.length > 0} time={500}>
            <button type="submit" className="btn btn-blue">
              {dict.game.ui.attempt}
            </button>
          </MotionSimple>
        )}
      </form>
      <form
        className={mostrarFijasEntrada ? "my-4 " : "hidden"}
        onSubmit={twoForm.handleSubmit(onSubmitFijasPicas)}
      >
        <span>{numeroJugado}</span>
        <div className="grid grid-cols-3 gap-1 mt-4">
          <div className="relative">
            <input
              type="number"
              id="fijas"
              {...twoForm.register("fijas")}
              placeholder={dict.game.ui.fijas}
              className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
            />
            <label
              htmlFor="fijas"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm ml-1 select-none"
            >
              {twoForm.formState.errors.fijas?.message}
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              id="picas"
              {...twoForm.register("picas")}
              placeholder={dict.game.ui.picas}
              className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
            />
            <label
              htmlFor="picas"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm ml-1 select-none"
            >
              {twoForm.formState.errors.picas?.message}
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-green">
          {dict.game.ui.give}
        </button>
      </form>
    </>
  );
};

export default HumanoHumano;
