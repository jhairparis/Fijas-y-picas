import React, { useEffect, useState, createRef, RefObject } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { arrayC, Props, inputs as InputFormValues } from "@/types/game";
import { schemaEntradas } from "@/features/game/utils/validador";
import type { Dictionary } from "@/lib/types";
import { HiEye, HiEyeOff } from "react-icons/hi";

// Define a type for the input items with their refs
type InputItem = {
  id: string;
  nodeRef: RefObject<HTMLDivElement | null>; // Ref for the CSSTransition's direct child
};

interface MaquinaPistasProps extends Props {
  dict: Dictionary;
}

const MaquinaPistas = ({
  numeroPrincipal,
  actualizarHistoial,
  dict,
}: MaquinaPistasProps) => {
  const [inputItems, setInputItems] = useState<InputItem[]>([]); // Renamed state and updated type
  const [numero, setNumero] = useState<number[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  function init(val: number): number[] {
    const numer: number[] = [];
    for (let i = 0; i < val; i++) {
      const r: number = Math.floor(Math.random() * (10 - 1) + 1);
      if (!numer.includes(r)) {
        numer.push(r);
      } else {
        i--;
      }
    }
    return numer;
  }

  useEffect(() => {
    for (let i = 0; i < numeroPrincipal; i++) unregister(`number${i}`);
    setNumero(init(numeroPrincipal));

    const newItems: InputItem[] = [];
    for (let i = 0; i < numeroPrincipal; i++) {
      newItems.push({
        id: `number${i}`,
        nodeRef: createRef<HTMLDivElement>(), // Create ref here
      });
    }
    setInputItems(newItems); // Store items with their refs
  }, [numeroPrincipal, unregister]); // Added unregister to dependency array

  const miniAI: SubmitHandler<InputFormValues> = data => {
    // Changed inputs to InputFormValues
    const arrayCompleto: Array<arrayC> = [];
    for (let i = 0; i < numeroPrincipal; i++)
      arrayCompleto.push([parseInt(data[`number${i}`]), false]);
    const arrayValores: number[] = [];
    const comprobar = () => {
      let prueba = true;
      arrayCompleto.forEach(arr => arrayValores.push(arr[0]));
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
    let fijas = 0;
    let picas = 0;
    arrayCompleto.forEach((val, i) => {
      if (isNaN(val[0])) {
        toast.error(
          dict.game.errors.invalidNumber.replace("{{position}}", String(i + 1))
        );
      } else if (!numeroR) {
        if (i === numeroPrincipal - 1) {
          actualizarHistoial(parseInt(arrayValores.join("")), {
            picas: 0,
            fijas: 0,
            text: dict.game.errors.duplicateNumber,
          });
          toast.info(dict.game.info.duplicateReminder);
        }
      } else {
        if (val[0] === numero[i]) {
          fijas++;
          val[1] = true;
        }
        if (numero.includes(val[0]) && val[1] === false) {
          picas++;
        }
        if (i === numeroPrincipal - 1) {
          actualizarHistoial(parseInt(arrayValores.join("")), { picas, fijas });
          if (fijas === numeroPrincipal) {
            toast.success(dict.game.success.congratulations);
          } else {
            toast(
              dict.game.info.picasAndFijas
                .replace("{{fijas}}", String(fijas))
                .replace("{{picas}}", String(picas))
            );
          }
        }
      }
    });
  };
  return (
    <>
      <form className="my-4" onSubmit={handleSubmit(miniAI)}>
        <div className="grid grid-cols-3 gap-x-1 gap-y-4">
          <AnimatePresence>
            {inputItems.map((item, i) => {
              // Iterate over inputItems
              const inputId = item.id;
              const val: string | null = errors[inputId]
                ? String(errors[inputId]?.message) // Ensure it's a string
                : null;
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
                    className="absolute left-0 -top-5 text-gray-600 text-sm ml-1 select-none"
                  >
                    {val}
                  </label>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        {inputItems.length > 0 ? ( // Check inputItems.length
          <button type="submit" className="btn btn-yellow">
            {dict.game.ui.attempt}
          </button>
        ) : (
          ""
        )}
      </form>
      {inputItems.length > 0 && ( // Changed inputs[0] to inputItems.length > 0
        <div className="grid grid-cols-2">
          {show && <span>{numero.join("")}</span>}
          <div
            className="col-start-2 flex items-center cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}
          >
            <span>
              {show ? (
                <HiEye className="h-6 w-6 text-gray-500" />
              ) : (
                <HiEyeOff className="h-6 w-6 text-gray-500" />
              )}
            </span>
            <div
              className={`w-14 h-7 flex items-center transition-colors duration-500 ease-in-out ${
                show ? "bg-blue-700" : "bg-gray-300"
              }  rounded-full mx-3 px-1 `}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform duration-500 ease-in-out transform ${
                  show ? "translate-x-7" : "translate-x-0"
                }`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MaquinaPistas;
