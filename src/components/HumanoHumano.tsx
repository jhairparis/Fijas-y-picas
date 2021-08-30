import React, { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Props, inputs, arrayC } from "../helpers/type";

const HumanoHumano = ({ numeroPrincipal, actualizarHistoial }: Props) => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();
  const twoForm = useForm();
  const [inputs, setInputs] = useState<ReactElement<HTMLInputElement>[]>([]);
  const [jugadorUno, setJugadorUno] = useState<string>("dar");
  const [jugadorDos, setJugadorDos] = useState<string>("");
  const [mostrarDigitos, setMostrarDigitos] = useState<boolean>();
  const [mostrarFijasEntrada, setmostrarFijasEntrada] = useState<boolean>();
  const [numeroJugado, setNumeroJugado] = useState<number>(0);

  const recepcionEntradas: SubmitHandler<inputs> = (data) => {
    const arrayCompleto: Array<arrayC> = [];
    for (let i = 0; i < numeroPrincipal; i++)
      arrayCompleto.push([parseInt(data[`number${i}`]), false]);

    const arrayValores: number[] = [];
    arrayCompleto.forEach((arr) => arrayValores.push(arr[0]));
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
        toast.error("Ingresa un digito en la casilla numero: " + (i + 1));
      } else if (!numeroR) {
        if (i === numeroPrincipal - 1) {
          if (jugadorUno === "dar") {
            actualizarHistoial(
              parseInt(arrayValores.join("")),
              {
                picas: 0,
                fijas: 0,
                text: "Hay un valor repetido",
              },
              0
            );
          } else if (jugadorDos === "dar") {
            actualizarHistoial(
              parseInt(arrayValores.join("")),
              {
                picas: 0,
                fijas: 0,
                text: "Hay un valor repetido",
              },
              1
            );
          }
          toast.info("Recuerda ninguna cifra se repite");
        }
      } else {
        if (i === numeroPrincipal - 1) {
          if (jugadorUno === "dar") {
            setJugadorUno("espera");
            setJugadorDos("pista");
            toast.info("Jugador 2 dale las  picas y fijas a juagador 1");
            setNumeroJugado(parseInt(arrayValores.join("")));
            // actualizarHistoial(parseInt(arrayValores.join("")), {}, 0);
          } else if (jugadorDos === "dar") {
            setJugadorUno("pista");
            setJugadorDos("espera");
            toast.info("Jugador 1 dale las  picas y fijas a juagador 2");
            setNumeroJugado(parseInt(arrayValores.join("")));
            // actualizarHistoial(parseInt(arrayValores.join("")), {}, 1);
          }
          setMostrarDigitos(false);
          setmostrarFijasEntrada(true);
        }
      }
    });
  };

  useEffect(() => {
    for (let i = 0; i < numeroPrincipal; i++) unregister(`number${i}`);
    const elementos: ReactElement<HTMLInputElement>[] = [];
    for (let i = 0; i < numeroPrincipal; i++) {
      elementos.push(
        <input
          key={i}
          type="number"
          {...register(`number${i}`, { required: true, min: 0, max: 9 })}
          placeholder={`Digito ${i + 1}`}
          className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
        />
      );
    }
    setInputs(elementos);
    setMostrarDigitos(true);
    if (numeroPrincipal > 0) {
      toast.success("Partida Iniciada");
    }
  }, [numeroPrincipal]);

  const onSubmit: SubmitHandler<inputs> = (data) => {
    const picas = parseInt(data.picas);
    const fijas = parseInt(data.fijas);
    if (picas + fijas > numeroPrincipal) {
      toast.error(
        "la suma de las pistas no puede ser superior al numero de digitos que se escogieron"
      );
    } else if (fijas === numeroPrincipal) {
      if (jugadorUno === "espera") {
        toast.success("Jugador 1 has ganado");
      }
      if (jugadorDos === "espera") {
        toast.success("Jugador 2 has ganado");
      }
    } else {
      if (jugadorUno === "espera") {
        actualizarHistoial(numeroJugado, { picas, fijas }, 0);
        setJugadorUno("");
        setJugadorDos("dar");
        toast.info("Intenta adivinar el numero del jugador 1");
      } else if (jugadorDos === "pista") {
        setJugadorUno("dar");
        setJugadorDos("");
        toast.info("Intenta adivinar el numero del jugador 2");
      } else if (jugadorDos === "espera") {
        setJugadorUno("dar");
        setJugadorDos("");
        actualizarHistoial(numeroJugado, { picas, fijas }, 1);
        toast.info("Intenta adivinar el numero del jugador 2");
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
        <div className="grid grid-cols-3 gap-1">
          {inputs.map((item) => item)}
        </div>
        {inputs.length > 0 ? (
          <button
            type="submit"
            className="mt-5 shadow-0 bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded  w-full focus:outline-none focus:shadow-lg focus:bg-blue-700"
          >
            Intentar
          </button>
        ) : null}
      </form>
      <form
        className={mostrarFijasEntrada ? "my-4 " : "hidden"}
        onSubmit={twoForm.handleSubmit(onSubmit)}
      >
        <span>{numeroJugado}</span>
        <div className="grid grid-cols-3 gap-1">
          <input
            type="number"
            {...twoForm.register("fijas")}
            placeholder="fijas"
            className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
          />
          <input
            {...twoForm.register("picas")}
            type="number"
            placeholder="picas"
            className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
          />
        </div>
        <button
          type="submit"
          className="mt-5 shadow-0 bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded  w-full focus:outline-none focus:shadow-lg focus:bg-blue-700"
        >
          Dar
        </button>
      </form>
    </>
  );
};

export default HumanoHumano;
