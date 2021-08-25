import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type historialTP = [number, {} | string];
type arrayC = [number, boolean];
interface inputs {
  [key: string]: string;
}
const Home = () => {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm();
  const [numeroPrincipal, setNumeroPrincipal] = useState(2);
  const [inputs, setInputs] = useState<ReactElement<HTMLInputElement>[]>([]);
  const [numero, setNumero] = useState<number[]>([]);
  const [historial, setHistorial] = useState<historialTP[]>([]);
  const [respuesta, setRespuesta] = useState("");

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

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(target.value);
    if (value > 1 && value < 9) {
      for (let i = 0; i < numeroPrincipal; i++) {
        unregister(`number${i}`);
      }
      setNumero(init(value));
      setNumeroPrincipal(value);
      setInputs([]);
      const elementos: ReactElement<HTMLInputElement>[] = [];
      for (let i = 0; i < value; i++) {
        elementos.push(
          <input
            key={i}
            type="number"
            {...register(`number${i}`)}
            placeholder="Ingrese un número"
            className="flex-1 appearance-none mr-6 border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparen"
          />
        );
      }
      setInputs(elementos);
    }
  };

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
        setRespuesta("Ingresa valores");
      } else if (!numeroR) {
        if (i === numeroPrincipal - 1) {
          setHistorial([
            ...historial,
            [parseInt(arrayValores.join("")), "Hay un valor repetido"],
          ]);
        }
        setRespuesta("Recuerda ninguna cifra se repite");
      } else {
        if (val[0] === numero[i]) {
          fijas++;
          val[1] = true;
        }
        if (numero.includes(val[0]) && val[1] === false) {
          picas++;
        }
        if (i === numeroPrincipal - 1) {
          setHistorial([
            ...historial,
            [parseInt(arrayValores.join("")), { picas, fijas }],
          ]);
          if (fijas === numeroPrincipal) {
            setRespuesta("¡¡¡GANASTE!!!");
          } else {
            setRespuesta(`hay ${fijas} fijas y ${picas} picas`);
          }
        }
      }
    });
  };
  return (
    <div>
      <button>Humano Vs Maquina</button>
      <button>Humano Vs Humano</button>
      <button>Maquina Vs Maquina</button>
      <div className="flex w-screen h-screen font-init bg-red-300">
        <div className="flex-none">
          {historial?.map((item, i) => {
            const c = ["red", "green", "blue", "yellow", "gray", "purple"];
            return (
              <div
                key={i}
                className={`w-full mx-auto my-2 p-2 rounded-full bg-${
                  i < c.length ? c[i] : c[0]
                }-500`}
              >
                {item[0]}
              </div>
            );
          })}
        </div>
        <div className="flex-1 flex justify-center items-center h-full">
          <div className="absolute top-0 right-0 mt-5 mr-5 shadow-md cursor-pointer transition duration-500 ease-in-out bg-green-300 hover:bg-green-500 border border-green-700 px-5 py-2 rounded-sm text-green-800 capitalize">
            <span>{respuesta}</span>
          </div>
          <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
            <h1 className="font-bold text-4xl text-center my-4">
              Fijas y Picas
            </h1>
            <p>Hola humano, con cuantos digitos deseas jugar</p>
            <input
              type="number"
              onChange={onChange}
              value={numeroPrincipal}
              placeholder="3"
              className="flex-1 appearance-none mr-6 border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparen"
            />
            <form onSubmit={handleSubmit(miniAI)}>
              <div className="flex flex-row">{inputs.map((item) => item)}</div>
              <span>{numero.join("")}</span>
              <button
                type="submit"
                className="mt-5 shadow-0 bg-blue-500 hover:bg-blue-700 hover:shadow-lg text-white font-bold py-2 px-4 rounded  w-full focus:outline-none focus:shadow-lg focus:bg-blue-700"
              >
                Comenzar
              </button>
            </form>
          </div>
        </div>
        help E
      </div>
    </div>
  );
};

export default Home;
