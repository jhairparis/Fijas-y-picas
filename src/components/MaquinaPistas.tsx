import React, { ReactElement, useEffect, useState } from "react";
import { Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { arrayC, Props, inputs } from "../helpers/type";
import { schemaEntradas } from "../helpers/validador";

const MaquinaPistas = ({ numeroPrincipal, actualizarHistoial }: Props) => {
  const [inputs, setInputs] = useState<ReactElement<HTMLInputElement>[]>([]);
  const [numero, setNumero] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();

  function init(val: number): number[] {
    let numer: number[] = [];
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
    setInputs([]);
    const elementos: ReactElement<HTMLInputElement>[] = [];
    for (let i = 0; i < numeroPrincipal; i++) {
      elementos.push(
        <input
          key={i}
          type="number"
          id={`number${i}`}
          {...register(`number${i}`, schemaEntradas)}
          placeholder={`Digito ${i + 1}`}
          className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
        />
      );
    }
    setInputs(elementos);
  }, [numeroPrincipal]);

  const miniAI: SubmitHandler<inputs> = (data) => {
    const arrayCompleto: Array<arrayC> = [];
    for (let i = 0; i < numeroPrincipal; i++)
      arrayCompleto.push([parseInt(data[`number${i}`]), false]);
    const arrayValores: number[] = [];
    const comprobar = () => {
      let prueba = true;
      arrayCompleto.forEach((arr) => arrayValores.push(arr[0]));
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
        toast.error("Ingresa un digito en la casilla numero: " + (i + 1));
      } else if (!numeroR) {
        if (i === numeroPrincipal - 1) {
          actualizarHistoial(parseInt(arrayValores.join("")), {
            picas: 0,
            fijas: 0,
            text: "Hay un valor repetido",
          });
          toast.info("Recuerda ninguna cifra se repite");
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
            toast.success("¡¡¡GANASTE!!! 🚀");
          } else {
            toast(`hay ${fijas} fijas y ${picas} picas`);
          }
        }
      }
    });
  };
  return (
    <>
      <form className="my-4" onSubmit={handleSubmit(miniAI)}>
        <div className="grid grid-cols-3 gap-x-1 gap-y-4">
          {inputs.map((item, i) => {
            return (
              <Fragment>
                <div className="relative">
                  {item}
                  <label
                    htmlFor={`number${i}`}
                    className="absolute left-0 -top-5 text-gray-600 text-sm ml-1 select-none"
                  >
                    {errors[`number${i}`] ? errors[`number${i}`].message : null}
                  </label>
                </div>
              </Fragment>
            );
          })}
        </div>
        {inputs.length > 0 ? (
          <button
            type="submit"
            className="mt-5 shadow-0 bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded  w-full focus:outline-none focus:shadow-lg focus:bg-blue-700"
          >
            Comenzar
          </button>
        ) : (
          ""
        )}
      </form>
      <span>{numero.join("")}</span>
    </>
  );
};

export default MaquinaPistas;
