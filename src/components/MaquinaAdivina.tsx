import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Props } from "../helpers/type";
import bug from "../resource/bug.svg";

type pistas = {
  fijas: string;
  picas: string;
};
interface historia {
  [0]: number[];
  [1]: { fijas: number; picas: number };
}

const numeroH9 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let ultimo = false;
const MaquinaAdivina = ({ numeroPrincipal, actualizarHistoial }: Props) => {
  const [adivinado, setAdivinado] = useState<[number, number[]]>([0, []]);
  const [historial, setHistorial] = useState<historia[]>([]); //Numeros correctos y pistas
  const { register, handleSubmit, reset } = useForm();

  function genracionNumeros(): [number, number[]] {
    const ad: number[] = [];
    for (let i = 0; i < numeroPrincipal; i++) {
      const index = Math.floor(Math.random() * (10 - 1) + 1) - 1;
      if (numeroH9[index] !== undefined) {
        const n = numeroH9[index];
        //si ad tiene ya incluido  n
        if (ad.includes(n)) i--;
        else ad.push(n);
      } else {
        i--;
      }
    }
    console.log(numeroH9);
    return [parseInt(ad.join("")), ad];
  }

  useEffect(() => {
    genracionNumeros();
  }, []);

  useEffect(() => {
    if (isNaN(numeroPrincipal)) {
      toast.error("Los digitos no son validosnumero ");
    } else {
      setAdivinado(genracionNumeros());
    }
  }, [numeroPrincipal]);

  const comprobar = (arrayValores: number[]) => {
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

  const generador1fija = (x: number[]): [number, number[]] => {
    const numTemp: number[] = [];
    for (let i = 0; i < numeroPrincipal; i++) {
      const dx = Math.floor(Math.random() * (10 - 1) + 1) - 1;
      if (numeroH9[dx] !== undefined) {
        const n = numeroH9[dx];
        if (numTemp.includes(n)) i--;
        else numTemp.push(n);
        console.log(numTemp);
      } else {
        i--;
      }
    }
    const index = Math.floor(Math.random() * (numeroPrincipal - 0) + 0) - 1;

    return [parseInt(numTemp.join("")), numTemp];
  };

  const yaSeIntentaron: any[] = [];

  useEffect(() => {
    const nI = historial.length - 1;
    const si: any = historial[nI]
      ? historial[nI][1]
      : { fijas: NaN, picas: NaN };

    if (si?.fijas === 0 && si?.picas === 0) {
      console.log("Hey!!");
    } else {
      if (yaSeIntentaron[0]) {
        console.log("ya se intento", yaSeIntentaron);
      }
      if (si.fijas > 0 && si.picas === 0) {
        console.log("solo fijas");
        const tem = generador1fija(historial[nI][0]);
        // yaSeIntentaron.push([tem, si]);
        // console.log(yaSeIntentaron);
        setAdivinado([tem[0], tem[1]]);
      }
      if (si.fijas === 0 && si.picas > 0) {
        console.log("solo picas");
      }
      if (si.fijas > 0 && si.picas > 0) {
        console.log("fijas y picas");
        // for (let j = 0; j < historial[i][0].length; j++) {}
      }
    }
    // reset();
  }, [historial]);

  const onSubmit: SubmitHandler<pistas> = (data) => {
    const fijas: number = parseInt(data.fijas),
      picas: number = parseInt(data.picas),
      temp: number = fijas + picas;
    if (temp > numeroPrincipal) {
      toast.error("Revisa las pistas dadas");
    } else if (fijas === numeroPrincipal) {
      toast.success("He ganado!!");
    } else if (fijas === 0 && picas === 0) {
      if (!ultimo) {
        actualizarHistoial(adivinado[0], { picas, fijas });
      }
      for (let i = 0; i < adivinado[1].length; i++) {
        if (numeroH9.includes(adivinado[1][i])) {
          //remover el numeros de numeroH9
          const index = numeroH9.indexOf(adivinado[1][i]);
          if (index > -1) {
            numeroH9.splice(index, 1);
          }
        }
      }
      const Lenght = numeroH9.length;
      if (Lenght > numeroPrincipal) {
        console.log("Nuevo Numero");
        setAdivinado(genracionNumeros());
      } else if (Lenght === numeroPrincipal) {
        toast.error("Ultimo numero que genero");
        setAdivinado(genracionNumeros());
      } else if (Lenght / numeroPrincipal !== numeroPrincipal) {
        if (Lenght === 0) {
          if (!ultimo) {
            toast.error("Perdiste");
            console.log("-->", Lenght, ultimo);
            ultimo = true;
          }
        } else {
          toast.error("Revisa las pistas dadas");
          ultimo = true;
        }
      }
    } else {
      actualizarHistoial(adivinado[0], { picas, fijas });
      setHistorial([...historial, [adivinado[1], { fijas, picas }]]);
    }
  };

  return numeroPrincipal ? (
    <div>
      {true ? (
        <img src={bug} className="animate-pulse" alt="Bug" />
      ) : (
        <>
          <span>{adivinado[0] ? adivinado[0] : ""}</span>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" {...register("fijas")} placeholder="fijas" />
            <br />
            <input type="number" {...register("picas")} placeholder="picas" />
            <button type="submit">Enviar</button>
          </form>
        </>
      )}
    </div>
  ) : (
    <></>
  );
};

export default MaquinaAdivina;
