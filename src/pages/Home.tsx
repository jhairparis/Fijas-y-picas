import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

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
            {...register(`number${i}`, { required: true, min: 0, max: 9 })}
            placeholder={`Digito ${i + 1}`}
            className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
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
        toast.error("Ingresa un digito en la casilla numero: " + (i + 1));
      } else if (!numeroR) {
        if (i === numeroPrincipal - 1) {
          setHistorial([
            ...historial,
            [parseInt(arrayValores.join("")), "Hay un valor repetido"],
          ]);
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
          setHistorial([
            ...historial,
            [parseInt(arrayValores.join("")), { picas, fijas }],
          ]);
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
    <div className="flex font-init bg-red-300 h-screen">
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
          <p>Hola humano, con cuantos digitos deseas jugar</p>
          <input
            type="number"
            onChange={onChange}
            value={numeroPrincipal}
            placeholder="3"
            className="flex-1 appearance-none mr-6 border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparen"
          />
          <form className="my-4" onSubmit={handleSubmit(miniAI)}>
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
          <span>{numero.join("")}</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
