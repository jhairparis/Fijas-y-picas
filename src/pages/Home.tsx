import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MaquinaPistas from "../components/MaquinaPistas";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HumanoHumano from "../components/HumanoHumano";
import { toast } from "react-toastify";
import { fnHistorial, pistas } from "../helpers/type";

type historialTP = [number, pistas, number | undefined];

const schema = yup.object().shape({
  number: yup
    .number()
    .typeError("Debe ser un numero")
    .positive("El numero debe ser positivo")
    .min(2, "El minimo numero es 2")
    .max(8, "El maximo numero es 8")
    .required("Ingresa un numero"),
});
const Home = () => {
  const [numeroPrincipal, setNumeroPrincipal] = useState<number>(0);
  const [historial, setHistorial] = useState<historialTP[]>([]);
  const [modoDeJuego, setModoDeJuego] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const actualizarHistoial: fnHistorial = (val, pista, user) => {
    setHistorial([...historial, [val, pista, user]]);
  };
  const onSubmit = (data: { number: number }) => {
    setNumeroPrincipal(data.number);
  };
  const ilustrarPicasYFijas = (item: historialTP): string => {
    let valor: string = "";
    if (item[1].text !== undefined) {
      valor = item[1].text;
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
  return (
    <div className="flex font-init bg-red-300 h-screen">
      <div className="flex-none">
        {modoDeJuego === "HvH"
          ? historial?.map((item, i) => {
              let valor: string = ilustrarPicasYFijas(item);
              return item[2] === 0 ? (
                <div
                  key={i}
                  className="w-full mx-auto my-2 p-2 rounded-full bg-green-600"
                >
                  {valor}
                </div>
              ) : (
                <></>
              );
            })
          : historial?.map((item, i) => {
              const c = ["red", "green", "blue", "yellow", "gray", "purple"];
              return (
                <div
                  key={i}
                  className={`w-full mx-auto my-2 p-2 rounded-full bg-${
                    c[i > c.length ? i - c.length : i]
                  }-500`}
                >
                  {item[0]}
                </div>
              );
            })}
      </div>
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          {modoDeJuego !== "" ? (
            <button
              onClick={(e) => {
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
          ) : null}
          <h1 className="font-bold text-4xl text-center my-4">Fijas y Picas</h1>
          {modoDeJuego !== "" ? (
            <>
              <p>Hola humano, con cuantos digitos deseas jugar</p>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="my-3 mx-2 flex"
              >
                <input
                  type="number"
                  {...register("number")}
                  placeholder="3"
                  className={`rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800  bg-white focus:border-${
                    errors.number ? "red" : "blue"
                  }-400 border-gray-200 placeholder-gray-400 focus:outline-none`}
                />
                <button
                  type="submit"
                  className={`px-4 rounded-r-lg bg-blue-400 text-gray-800 font-bold p-2 uppercase border-${
                    errors.number ? "red" : "blue"
                  }-400 border-t border-b border-r focus:outline-none`}
                >
                  Ok
                </button>
              </form>
              {errors.number?.message}
            </>
          ) : (
            <div className="flex justify-center items-baseline flex-wrap font-init">
              <div className="flex m-2">
                <button
                  onClick={(e) => setModoDeJuego("HvH")}
                  className="btn-group border rounded rounded-r-none hover:scale-110 hover:bg-blue-200  bg-green-100 text-black border-blue-600"
                >
                  Humano Vs Humano
                </button>
                <button
                  onClick={(e) => setModoDeJuego("HvM")}
                  className="btn-group border border-l-0 rounded rounded-l-none hover:scale-110 hover:bg-green-200  bg-blue-100 text-black border-green-600"
                >
                  Humano Vs Maquina
                </button>
              </div>
            </div>
          )}
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
        </div>
      </div>
      {modoDeJuego === "HvH" ? (
        <div className="flex-none">
          {historial?.map((item, i) => {
            let valor: string = ilustrarPicasYFijas(item);
            return item[2] === 1 ? (
              <div
                key={i + Math.floor(Math.random())}
                className="w-full mx-auto my-2 p-2 rounded-full bg-blue-600"
              >
                {valor}
              </div>
            ) : null;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
