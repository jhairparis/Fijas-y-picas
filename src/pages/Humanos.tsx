import React, { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type historialTP = [number, number];
type arrayC = [number, boolean];
interface inputs {
  [key: string]: string;
}
const Humanos = () => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();
  const twoForm = useForm();
  const [numeroPrincipal, setNumeroPrincipal] = useState(2);
  const [partida, setPartida] = useState<boolean>(false);
  const [inputs, setInputs] = useState<ReactElement<HTMLInputElement>[]>([]);
  const [historial, setHistorial] = useState<historialTP[]>([]);
  const [jugadorUno, setJugadorUno] = useState<string>("dar");
  const [jugadorDos, setJugadorDos] = useState<string>("");
  const [mostrarDigitos, setMostrarDigitos] = useState<boolean>();
  const [mostrarFijasEntrada, setmostrarFijasEntrada] = useState<boolean>();
  const [numeroJugado, setNumeroJugado] = useState<string>();

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
          if (jugadorUno) {
            setHistorial([...historial, [parseInt(arrayValores.join("")), 0]]);
          } else if (jugadorDos) {
            setHistorial([...historial, [parseInt(arrayValores.join("")), 1]]);
          }
          toast.info("Recuerda ninguna cifra se repite");
        }
      } else {
        if (jugadorUno === "dar") {
          setJugadorUno("espera");
          setJugadorDos("pista");
          toast.info("Jugador 2 dale las  picas y fijas a juagador 1");
          setNumeroJugado(arrayValores.join(""));
        } else if (jugadorDos === "dar") {
          setJugadorUno("pista");
          setJugadorDos("espera");
          toast.info("Jugador 1 dale las  picas y fijas a juagador 2");
          setNumeroJugado(arrayValores.join(""));
        }
        setMostrarDigitos(false);
        setmostrarFijasEntrada(true);
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 1 && value < 9) {
      for (let i = 0; i < numeroPrincipal; i++) unregister(`number${i}`);
      setNumeroPrincipal(parseInt(e.target.value));
      const elementos: ReactElement<HTMLInputElement>[] = [];
      for (let i = 0; i < value; i++) {
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
      setPartida(true);
      toast.info("Partida Iniciada y inicia Jugador 1");
      setMostrarDigitos(true);
      toast("Intenta adivinar el numero del jugador 2");
    } else {
      toast.error("Ingresa un numero entre 2 y 9");
    }
  };

  const onSubmit: SubmitHandler<inputs> = (data) => {
    const picas = parseInt(data.picas);
    const fijas = parseInt(data.fijas);
    if (picas + fijas > numeroPrincipal) {
      toast.error(
        "la suma de las pistas no puede ser superior al numero de digitos que se escogieron"
      );
    } else {
      if (jugadorUno === "espera") {
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
        toast.info("Intenta adivinar el numero del jugador 2");
      }
      setmostrarFijasEntrada(false);
      setMostrarDigitos(true);
    }
  };
  return (
    <div className="flex font-init bg-red-300 h-screen">
      <div className="flex-none">
        {historial?.map((item, i) => {
          const c = ["red", "green", "blue", "yellow", "gray", "purple"];
          return (
            <>
              {item[0] === 0 ? (
                jugadorUno ? (
                  <div
                    key={i}
                    className={`w-full mx-auto my-2 p-2 rounded-full bg-${
                      i < c.length ? c[i] : c[0]
                    }-500`}
                  >
                    {item[0]}
                  </div>
                ) : (
                  <></>
                )
              ) : item[0] === 1 ? (
                jugadorDos ? (
                  <div
                    key={i}
                    className={`w-full mx-auto my-2 p-2 rounded-full bg-purple-500`}
                  >
                    {item[0]}
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </>
          );
        })}
      </div>
      <div className="flex-1 flex justify-center items-center h-full">
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h1 className="font-bold text-4xl text-center my-4">Fijas y Picas</h1>
          <div className="flex justify-center items-baseline flex-wrap font-init">
            <div className="flex m-2">
              <button className="btn-group border rounded rounded-r-none hover:scale-110 hover:bg-blue-200  bg-green-100 text-black border-blue-600">
                Humano Vs Humano
              </button>
              <button className="btn-group border border-l-0 rounded rounded-l-none hover:scale-110 hover:bg-green-200  bg-blue-100 text-black border-green-600">
                Humano Vs Maquina
              </button>
            </div>
          </div>
          <p>Hola humano invita a tu amigo</p>
          <span>Numero de digitos con los que van a juagar</span>
          <input
            type="number"
            onChange={onChange}
            value={numeroPrincipal}
            disabled={partida}
            placeholder="3"
            className="flex-1 appearance-none mr-6 border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparen"
          />
          {"Juan esta " + jugadorUno}
          {"Maria esta " + jugadorDos}
          <form
            className={mostrarDigitos ? "my-4 " : "hidden"}
            onSubmit={handleSubmit(miniAI)}
          >
            <div className="grid grid-cols-3 gap-1">
              {inputs.map((item) => item)}
            </div>
            <button
              type="submit"
              className="mt-5 shadow-0 bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded  w-full focus:outline-none focus:shadow-lg focus:bg-blue-700"
            >
              Comenzar
            </button>
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
              Comenzar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Humanos;
