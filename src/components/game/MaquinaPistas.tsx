import React, { ReactElement, useEffect, useState, KeyboardEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { arrayC, Props, inputs } from "../../helpers/type";
import { schemaEntradas } from "../../helpers/validador";

const MaquinaPistas = ({ numeroPrincipal, actualizarHistoial }: Props) => {
  const [inputs, setInputs] = useState<ReactElement<HTMLInputElement>[]>([]);
  const [numero, setNumero] = useState<number[]>([]);
  const [show, setShow] = useState<boolean>(false);

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
        <TransitionGroup className="grid grid-cols-3 gap-x-1 gap-y-4">
          {inputs.map((item, i) => {
            let val: any = errors[`number${i}`]
              ? errors[`number${i}`]?.message
              : null;
            return (
              <CSSTransition key={i} timeout={500} classNames="item">
                <div className="relative">
                  {item}
                  <label
                    htmlFor={`number${i}`}
                    className="absolute left-0 -top-5 text-gray-600 text-sm ml-1 select-none"
                  >
                    {val}
                  </label>
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        {inputs.length > 0 ? (
          <button type="submit" className="btn btn-yellow">
            Intentar
          </button>
        ) : (
          ""
        )}
      </form>
      {inputs[0] && (
        <div className="grid grid-cols-2">
          {show && <span>{numero.join("")}</span>}
          <div
            className="col-start-2 flex items-center cursor-pointer"
            onClick={(e) => {
              setShow(!show);
            }}
          >
            <span>
              {show ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="h-6 w-6 text-gray-500"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="h-6 w-6 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                </svg>
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
