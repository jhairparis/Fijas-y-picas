import React, { Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Props } from "../../helpers/type";
import { CSSTransition, TransitionGroup } from "react-transition-group";

type pistas = {
  fijas: string;
  picas: string;
};

let interacciones = 0;
let camino = "0";
let contador = 0;
let contador2 = 0;
let contador3 = 0;
let unidadesTemporales = 0;
let decenasTemporales = 0;
let milesTemporales = 0;

let unidades: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let recurso: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
let decenas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let memoria: number[] = [];
let miles: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let esGanador: boolean = false;
let adivinado: number[] = [];

const MaquinaAdivina = ({ numeroPrincipal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const removerDelRecurso = (value: number) => {
    for (let i = 0; i < recurso.length; i++) {
      if (recurso[i] == value) {
        recurso.splice(i, 1);
        break;
      }
    }
  };

  const removerDeDecenas = (value: number) => {
    for (let i = 0; i < decenas.length; i++) {
      if (decenas[i] == value) {
        decenas.splice(i, 1);
        break;
      }
    }
  };

  const removerDeUnidades = (value: number) => {
    for (let i = 0; i < unidades.length; i++) {
      if (unidades[i] == value) {
        unidades.splice(i, 1);
        break;
      }
    }
  };
  const removerDeMiles = (value: number) => {
    for (let i = 0; i < miles.length; i++) {
      if (miles[i] == value) {
        miles.splice(i, 1);
        break;
      }
    }
  };

  useEffect(() => {
    adivinado.splice(0, adivinado.length);
    esGanador = false;
    camino = "0";
    unidades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    recurso = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    decenas = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < numeroPrincipal; i++) {
      let n = Math.floor(Math.random() * (10 - 1) + 1);
      if (adivinado.includes(n)) i--;
      else adivinado.push(n);
    }
    interacciones++;
  }, [numeroPrincipal]);

  const getPicasFijas = (fijas: number, picas: number) => {
    if (interacciones != 0) interacciones++;
    if (picas + fijas > numeroPrincipal) {
      toast.error(
        "La suma de las pistas no debe se mayor a el numero de digitos escogido"
      );
      toast.success("La maquina es la ganadora");
      esGanador = true;
    } else if (fijas == numeroPrincipal) {
      toast.success("La maquina es la ganadora");
      toast.error("Has perdido");
      esGanador = true;
    } else if (camino == "win") {
      interacciones--;
      toast.info("Revise mis respuesta y soy el ganador");
      toast.success("La maquina es la ganadora");
      toast.error("Has perdido");
      esGanador = true;
    } else {
      if (numeroPrincipal == 2) {
        let U = adivinado[1];
        let T = adivinado[0];
        if (fijas == 0 && picas == 0) {
          if (camino === "0") {
            removerDelRecurso(T);
            removerDelRecurso(U);
            removerDeDecenas(T);
            removerDeDecenas(U);
            removerDeUnidades(T);
            removerDeUnidades(U);

            adivinado.splice(0, adivinado.length);
            if (recurso.length > 2) {
              adivinado.push(recurso[recurso.length - 1]);
              adivinado.push(recurso[recurso.length - 2]);
            } else if (recurso.length == 2 && recurso[1] != 0) {
              camino = "win";
              adivinado.push(recurso[1]);
              adivinado.push(recurso[0]);
            } else {
              camino = "win";
              adivinado.push(recurso[0]);
              adivinado.push(recurso[1]);
            }
          } else if (camino === "1") {
            camino = "12";
            removerDelRecurso(memoria[0]);
            removerDelRecurso(memoria[2]);

            removerDeDecenas(memoria[0]);
            removerDeDecenas(memoria[1]);
            removerDeDecenas(memoria[2]);
            unidadesTemporales = memoria[1];

            adivinado.splice(0, adivinado.length);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
              adivinado.push(unidadesTemporales);
            } else {
              for (let i = 0; i < decenas.length; i++) {
                if (i < decenas.length) {
                  adivinado.push(decenas[i]);
                  adivinado.push(decenas[i + 1]);
                  break;
                } else {
                  toast.error("No fue posible encontrar el numero");
                  toast.success("Eres el ganador");
                }
              }
            }
          } else if (camino === "2") {
            camino = "21";
            contador2++;
            if (contador2 == 2) {
              removerDeDecenas(memoria[0]);
              removerDeDecenas(memoria[1]);
              removerDeDecenas(memoria[2]);
              unidadesTemporales = memoria[0];
            } else {
              removerDeDecenas(T);
              removerDeDecenas(U);
            }
            adivinado.splice(0, adivinado.length);
            if (decenas.length < 2) {
              camino = "win";
              adivinado.push(decenas[0]);
              adivinado.push(unidadesTemporales);
            } else {
              for (let i = 0; i < decenas.length; i++) {
                adivinado.push(decenas[i]);
                adivinado.push(decenas[i + 1]);
                break;
              }
            }
          } else if (camino === "21") {
            removerDeDecenas(T);
            removerDeDecenas(U);
            adivinado.splice(0, adivinado.length);
            if (decenas.length < 2) {
              camino = "win";
              adivinado.push(decenas[0]);
              adivinado.push(unidadesTemporales);
            } else {
              for (let i = 0; i < decenas.length; i++) {
                adivinado.push(decenas[i]);
                adivinado.push(decenas[i + 1]);
                break;
              }
            }
          } else {
            if (camino === "12" || camino === "21") {
              removerDeDecenas(T);
              removerDeDecenas(U);
              adivinado.splice(0, adivinado.length);
              if (decenas.length == 1 && camino === "12") {
                camino = "win";
                adivinado.push(decenas[0]);
                adivinado.push(memoria[1]);
              } else if (decenas.length == 1 && camino === "21") {
                camino = "win";
                adivinado.push(decenas[0]);
                adivinado.push(memoria[0]);
              } else {
                for (let i = 0; i < decenas.length; i++) {
                  if (decenas.length > 1) {
                    adivinado.push(decenas[i]);
                    adivinado.push(decenas[i + 1]);
                    break;
                  } else {
                    toast.error("I couldn't found number");
                    toast.success("You are Winner");
                  }
                }
              }
            } else if (camino === "11" || camino === "23") {
              removerDeUnidades(T);
              removerDeUnidades(U);
              adivinado.splice(0, adivinado.length);
              if (unidades.length == 1) {
                if (camino === "11") {
                  camino = "win";
                  adivinado.push(memoria[0]);
                  adivinado.push(unidades[0]);
                } else {
                  camino = "win";
                  adivinado.push(memoria[1]);
                  adivinado.push(unidades[0]);
                }
              } else {
                for (let i = 0; i < unidades.length; i++) {
                  if (unidades.length > 1) {
                    adivinado.push(unidades[i]);
                    adivinado.push(unidades[i + 1]);
                    break;
                  } else {
                    toast.error("I couldn't found number");
                    toast.success("You are Winner");
                  }
                }
              }
            }
          }
        } else if (fijas == 1 && picas == 0) {
          if (camino === "0") {
            camino = "1";
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < recurso.length; i++) {
              if (recurso[i] != U && recurso[i] != T) {
                adivinado.push(T);
                adivinado.push(recurso[i]);
                memoria.push(T);
                memoria.push(U);
                memoria.push(recurso[i]);
                break;
              }
            }
          } else if (camino === "1") {
            camino = "11";
            removerDelRecurso(memoria[1]);
            removerDelRecurso(memoria[2]);
            decenasTemporales = memoria[0];

            removerDeUnidades(memoria[0]);
            removerDeUnidades(memoria[1]);
            removerDeUnidades(memoria[2]);

            adivinado.splice(0, adivinado.length);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(memoria[0]);
              adivinado.push(unidades[0]);
            } else {
              contador = 0;
              for (let i = 0; i < unidades.length; i++) {
                if (unidades[i] != 0) {
                  if (contador < 2) {
                    contador++;
                    memoria.push(unidades[i]);
                  } else {
                    adivinado.push(memoria[3]);
                    adivinado.push(memoria[4]);
                    break;
                  }
                } else {
                  adivinado.push(memoria[3]);
                }
              }
            }
          } else if (camino === "11") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(decenasTemporales);
            adivinado.push(U);
          } else if (camino === "12") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(T);
            adivinado.push(unidadesTemporales);
          } else if (camino === "2") {
            camino = "23";
            decenasTemporales = memoria[1];
            removerDeUnidades(memoria[0]);
            removerDeUnidades(memoria[1]);
            removerDeUnidades(memoria[2]);
            adivinado.splice(0, adivinado.length);

            if (unidades.length > 1) {
              adivinado.push(unidades[0]);
              adivinado.push(unidades[1]);
            } else {
              camino = "win";
              adivinado.push(decenasTemporales);
              adivinado.push(unidades[0]);
            }
          } else if (camino === "21") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(T);
            adivinado.push(unidadesTemporales);
          } else if (camino === "23") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(decenasTemporales);
            adivinado.push(U);
          }
        } else if (fijas == 0 && picas == 1) {
          adivinado.splice(0, adivinado.length);
          if (camino === "0") {
            camino = "2";
            contador2++;
            for (let i = 0; i < recurso.length; i++) {
              if (recurso[i] != U && recurso[i] != T) {
                adivinado.push(U);
                adivinado.push(recurso[i]);
                memoria.push(T);
                memoria.push(U);
                memoria.push(recurso[i]);
                break;
              }
            }
          } else if (camino === "1") {
            if (U == 0) {
              interacciones--;
              toast.error("Que!! estos no es posible");
            } else {
              camino = "win";
              decenasTemporales = memoria[2];
              unidadesTemporales = memoria[1];
              adivinado.push(decenasTemporales);
              adivinado.push(unidadesTemporales);
            }
          } else if (camino === "11") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(decenasTemporales);
            adivinado.push(T);
          } else if (camino === "12") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(memoria[1]);
          } else if (camino === "2") {
            if (U == 0) {
              toast.error("Que!! estos no es posible");
            } else {
              camino = "win";
              adivinado.splice(0, adivinado.length);
              adivinado.push(U);
              adivinado.push(memoria[0]);
            }
          } else if (camino === "21") {
            camino = "win";
            unidadesTemporales = memoria[0];
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(unidadesTemporales);
          } else if (camino === "23") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(decenasTemporales);
            adivinado.push(T);
          }
        } else if (fijas == 1 && picas == 1) {
          camino = "win";
          toast.error("Que!! estos no es posible");
        } else if (picas == 2) {
          if (U == 0) {
            toast.error("Revisa tus respuestas");
          } else {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(T);
          }
        } else if (fijas < 0 || fijas > 2 || picas < 0 || picas > 2) {
          toast.error("Esto valores no son posibles");
        } else {
          toast.error("las picas y fijas deben estar entre 0 y 2");
        }
      } else if (numeroPrincipal == 3) {
        let U = adivinado[2];
        let T = adivinado[1];
        let H = adivinado[0];
        if (fijas == 0 && picas == 0) {
          if (camino === "0") {
            removerDelRecurso(H);
            removerDelRecurso(T);
            removerDelRecurso(U);

            removerDeDecenas(H);
            removerDeDecenas(T);
            removerDeDecenas(U);

            removerDeUnidades(H);
            removerDeUnidades(T);
            removerDeUnidades(U);

            removerDeMiles(H);
            removerDeMiles(T);
            removerDeMiles(U);

            adivinado.splice(0, adivinado.length);
            if (recurso.length == 4) {
              camino = "win";
              adivinado.push(recurso[recurso.length - 1]);
              adivinado.push(recurso[recurso.length - 2]);
              adivinado.push(recurso[recurso.length - 3]);
            } else if (recurso.length > 1) {
              adivinado.push(recurso[recurso.length - 1]);
              adivinado.push(recurso[recurso.length - 2]);
              adivinado.push(recurso[recurso.length - 3]);
            }
          } else if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "031") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0311") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            camino = "12";
            removerDelRecurso(memoria[0]);
            removerDelRecurso(memoria[1]);
            removerDelRecurso(memoria[2]);
            removerDelRecurso(memoria[3]);

            removerDeMiles(memoria[0]);
            removerDeMiles(memoria[1]);
            removerDeMiles(memoria[2]);
            removerDeMiles(memoria[3]);

            removerDeUnidades(memoria[0]);
            removerDeUnidades(memoria[1]);
            removerDeUnidades(memoria[2]);
            removerDeUnidades(memoria[3]);

            removerDeDecenas(memoria[0]);
            removerDeDecenas(memoria[1]);
            removerDeDecenas(memoria[2]);
            removerDeDecenas(memoria[3]);

            decenasTemporales = memoria[1];
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < unidades.length; i++) {
              if (i < unidades.length) {
                adivinado.push(unidades[i]);
                adivinado.push(unidades[i + 1]);
                adivinado.push(unidades[i + 2]);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "112") {
            removerDelRecurso(H);
            removerDelRecurso(T);
            removerDelRecurso(U);

            removerDeMiles(H);
            removerDeMiles(T);
            removerDeMiles(U);

            removerDeDecenas(H);
            removerDeDecenas(T);
            removerDeDecenas(U);

            removerDeUnidades(H);
            removerDeUnidades(T);
            removerDeUnidades(U);
            adivinado.splice(0, adivinado.length);
            if (miles.length == 0) {
              esGanador = true;

              toast.success("Yo gane");
            } else {
              for (let i = 0; i < miles.length; i++) {
                if (i < decenas.length) {
                  adivinado.push(miles[i]);
                  adivinado.push(miles[i + 1]);
                  adivinado.push(miles[i + 2]);
                  break;
                } else {
                  console.log("I couldn't found number");
                }
              }
            }
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "113") {
            removerDelRecurso(H);
            removerDelRecurso(T);
            removerDelRecurso(U);

            removerDeMiles(H);
            removerDeMiles(T);
            removerDeMiles(U);

            removerDeDecenas(H);
            removerDeDecenas(T);
            removerDeDecenas(U);

            removerDeUnidades(H);
            removerDeUnidades(T);
            removerDeUnidades(U);

            adivinado.splice(0, adivinado.length);
            if (decenas.length == 0) {
              esGanador = true;

              toast.success("Yo gane");
            } else {
              for (let i = 0; i < decenas.length; i++) {
                if (i < decenas.length) {
                  adivinado.push(decenas[i]);
                  adivinado.push(decenas[i + 1]);
                  adivinado.push(decenas[i + 2]);
                  break;
                } else {
                  console.log("I couldn't found number");
                }
              }
            }
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas == 1 && picas == 0) {
          if (camino === "0") {
            camino = "1";
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < recurso.length; i++) {
              if (recurso[i] != T && recurso[i] != U && recurso[i] != H) {
                adivinado.push(H);
                adivinado.push(recurso[i]);
                adivinado.push(U);
                memoria.push(H);
                memoria.push(T);
                memoria.push(U);
                memoria.push(recurso[i]);
                break;
              }
            }
          } else if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(memoria[2]);
            adivinado.push(memoria[1]);
          } else if (camino === "0211") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(memoria[2]);
            adivinado.push(memoria[1]);
            adivinado.push(memoria[0]);
          } else if (camino === "02111") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(memoria[1]);
            adivinado.push(memoria[0]);
            adivinado.push(memoria[2]);
          } else if (camino === "03") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "031") {
            camino = "0311";
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            if (decenas.length > 0) {
              adivinado.push(decenas[decenas.length - 1]);
            } else {
              adivinado.push(0);
            }
            adivinado.push(memoria[2]);
          } else if (camino === "0311") {
            camino = "03111";
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
            } else {
              adivinado.push(miles[miles.length - 1]);
            }
            adivinado.push(memoria[1]);
            adivinado.push(memoria[2]);
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            camino = "11";
            adivinado.splice(0, adivinado.length);

            adivinado.push(H);
            adivinado.push(U);
            adivinado.push(T);
          } else if (camino === "11") {
            camino = "113";
            removerDeMiles(memoria[0]);
            removerDeMiles(memoria[1]);
            removerDeMiles(memoria[2]);
            removerDeMiles(memoria[3]);

            removerDelRecurso(memoria[0]);
            removerDelRecurso(memoria[1]);
            removerDelRecurso(memoria[2]);
            removerDelRecurso(memoria[3]);

            removerDeDecenas(memoria[0]);
            removerDeDecenas(memoria[1]);
            removerDeDecenas(memoria[2]);
            removerDeDecenas(memoria[3]);

            removerDeUnidades(memoria[0]);
            removerDeUnidades(memoria[1]);
            removerDeUnidades(memoria[2]);
            removerDeUnidades(memoria[3]);

            milesTemporales = memoria[0];
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < miles.length; i++) {
              if (i < miles.length) {
                adivinado.push(miles[i]);
                adivinado.push(miles[i + 1]);
                adivinado.push(miles[i + 2]);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "112") {
            camino = "1121";
            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(unidadesTemporales);
            adivinado.push(T);
            adivinado.push(U);
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1122") {
            camino = "1121";
            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(unidadesTemporales);
            adivinado.push(T);
            adivinado.push(U);
          } else if (camino === "113") {
            camino = "1131";
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(T);
            adivinado.push(milesTemporales);
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132") {
            camino = "1131";
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(T);
            adivinado.push(milesTemporales);
          } else if (camino === "12") {
            camino = "121";
            adivinado.splice(0, adivinado.length);

            adivinado.push(H);
            adivinado.push(U);
            adivinado.push(decenasTemporales);
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas == 0 && picas == 1) {
          if (camino === "0") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            camino = "0211";
            adivinado.splice(0, adivinado.length);
            adivinado.push(miles[0]);
            adivinado.push(memoria[1]);
            adivinado.push(unidades[0]);
          } else if (camino === "0211") {
            camino = "02111";
            adivinado.splice(0, adivinado.length);
            adivinado.push(unidades[0]);
            adivinado.push(decenas[0]);
            adivinado.push(memoria[2]);
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "031") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0311") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "11") {
            camino = "112";
            unidadesTemporales = T;

            removerDelRecurso(memoria[0]);
            removerDeMiles(memoria[0]);
            removerDeDecenas(memoria[0]);
            removerDeUnidades(memoria[0]);
            removerDelRecurso(memoria[1]);
            removerDeMiles(memoria[1]);
            removerDeDecenas(memoria[1]);
            removerDeUnidades(memoria[1]);
            removerDelRecurso(memoria[2]);
            removerDeMiles(memoria[2]);
            removerDeDecenas(memoria[2]);
            removerDeUnidades(memoria[2]);
            removerDelRecurso(memoria[3]);
            removerDeMiles(memoria[3]);
            removerDeDecenas(memoria[3]);
            removerDeUnidades(memoria[3]);
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < miles.length; i++) {
              if (i < miles.length) {
                adivinado.push(miles[i]);
                adivinado.push(miles[i + 1]);
                adivinado.push(miles[i + 2]);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "112") {
            camino = "1122";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
            contador2++;
          } else if (camino === "1121") {
            camino = "11312";
            milesTemporales = memoria[0];
            removerDelRecurso(memoria[1]);
            removerDeMiles(memoria[1]);
            removerDeDecenas(memoria[1]);
            removerDeUnidades(memoria[1]);

            removerDelRecurso(memoria[0]);
            removerDeMiles(memoria[0]);
            removerDeDecenas(memoria[0]);
            removerDeUnidades(memoria[0]);

            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < decenas.length; i++) {
              if (i < decenas.length) {
                adivinado.push(milesTemporales);
                adivinado.push(decenas[i]);
                adivinado.push(unidadesTemporales);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1122") {
            adivinado.splice(0, adivinado.length);
            if (contador2 == 2) {
              esGanador = true;
              toast.success("Yo gane");
            } else {
              adivinado.push(U);
              adivinado.push(H);
              adivinado.push(T);
            }
            contador2++;
          } else if (camino === "113") {
            camino = "1132";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
            contador++;
          } else if (camino === "1131") {
            camino = "11312";
            unidadesTemporales = memoria[2];
            removerDelRecurso(memoria[1]);
            removerDeMiles(memoria[1]);
            removerDeDecenas(memoria[1]);
            removerDeUnidades(memoria[1]);

            removerDelRecurso(memoria[2]);
            removerDeMiles(memoria[2]);
            removerDeDecenas(memoria[2]);
            removerDeUnidades(memoria[2]);
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < decenas.length; i++) {
              if (i < decenas.length) {
                adivinado.push(milesTemporales);
                adivinado.push(decenas[i]);
                adivinado.push(unidadesTemporales);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132") {
            adivinado.splice(0, adivinado.length);
            if (contador == 2) {
              esGanador = true;
              toast.success("Yo gane");
            } else {
              adivinado.push(U);
              adivinado.push(H);
              adivinado.push(T);
            }
            contador++;
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas == 1 && picas == 1) {
          if (camino === "0") {
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < numeroPrincipal; i++) {
              let n = Math.random() * 9 + 1;
              if (adivinado.includes(n)) i--;
              else adivinado.push(n);
            }
          } else if (camino === "01") {
            camino = "011";
            milesTemporales = H;
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            adivinado.splice(0, adivinado.length);
            adivinado.push(T);
            adivinado.push(U);
            adivinado.push(milesTemporales);
          } else if (camino === "011") {
            camino = "0112";
            decenasTemporales = T;
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            adivinado.push(decenasTemporales);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(unidades[0]);
            } else {
              adivinado.push(unidades[unidades.length - 1]);
            }
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            camino = "032";
            adivinado.splice(0, adivinado.length);
            adivinado.push(T);
            adivinado.push(H);
            adivinado.push(U);
          } else if (camino === "031") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0311") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            camino = "03211";
            milesTemporales = H;
            unidadesTemporales = T;
            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
            } else {
              adivinado.push(decenas[decenas.length - 1]);
            }
            adivinado.push(unidadesTemporales);
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1121") {
            camino = "11211";
            decenasTemporales = T;
            removerDelRecurso(memoria[0]);
            removerDeMiles(memoria[0]);
            removerDeDecenas(memoria[0]);
            removerDeUnidades(memoria[0]);

            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < miles.length; i++) {
              if (i < miles.length) {
                adivinado.push(miles[i]);
                adivinado.push(decenasTemporales);
                adivinado.push(unidadesTemporales);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "113") {
            esGanador = true;

            toast.success("Yo gane");
            console.log("You lose");
          } else if (camino === "1131") {
            camino = "11311";
            decenasTemporales = T;
            removerDelRecurso(memoria[2]);
            removerDeMiles(memoria[2]);
            removerDeDecenas(memoria[2]);
            removerDeUnidades(memoria[2]);

            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);
            adivinado.splice(0, adivinado.length);
            for (let i = 0; i < unidades.length; i++) {
              if (i < unidades.length) {
                adivinado.push(milesTemporales);
                adivinado.push(decenasTemporales);
                adivinado.push(unidades[i]);
                break;
              } else {
                console.log("I couldn't found number");
              }
            }
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            camino = "1211";
            milesTemporales = H;
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            removerDelRecurso(memoria[1]);
            removerDeMiles(memoria[1]);
            removerDeDecenas(memoria[1]);
            removerDeUnidades(memoria[1]);

            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            adivinado.push(decenasTemporales);
            adivinado.push(unidades[unidades.length - 1]);
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas == 2 && picas == 0) {
          if (camino === "0") {
            camino = "01";
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(U);
            adivinado.push(T);
          } else if (camino === "0111") {
            camino = "0111";
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
            } else {
              adivinado.push(decenas[decenas.length - 1]);
            }
            adivinado.push(unidadesTemporales);
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            adivinado.push(decenasTemporales);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(unidades[0]);
            } else {
              adivinado.push(unidades[unidades.length - 1]);
            }
          } else if (camino === "012") {
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            adivinado.splice(0, adivinado.length);
            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
            } else {
              adivinado.push(miles[miles.length - 1]);
            }
            adivinado.push(decenasTemporales);
            adivinado.push(unidadesTemporales);
          } else if (camino === "02") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            camino = "031";
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);

            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(T);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(unidades[0]);
            } else {
              adivinado.push(unidades[unidades.length - 1]);
            }
          } else if (camino === "031") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(T);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(unidades[0]);
            } else {
              adivinado.push(unidades[unidades.length - 1]);
            }
          } else if (camino === "0311") {
            camino = "03112";
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            adivinado.push(memoria[0]);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
            } else {
              adivinado.push(decenas[decenas.length - 1]);
            }
            adivinado.push(memoria[2]);
          } else if (camino === "03111") {
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            adivinado.splice(0, adivinado.length);
            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
            } else {
              adivinado.push(miles[miles.length - 1]);
            }
            adivinado.push(memoria[1]);
            adivinado.push(memoria[2]);
          } else if (camino === "03112") {
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            adivinado.push(memoria[0]);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
            } else {
              adivinado.push(decenas[decenas.length - 1]);
            }
            adivinado.push(memoria[2]);
          } else if (camino === "032") {
            camino = "0321";
            decenasTemporales = U;
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(decenasTemporales);
            adivinado.push(T);
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03211") {
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
            } else {
              adivinado.push(decenas[decenas.length - 1]);
            }
            adivinado.push(unidadesTemporales);
          } else if (camino === "03212") {
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
            } else {
              adivinado.push(miles[miles.length - 1]);
            }
            adivinado.push(decenasTemporales);
            adivinado.push(unidadesTemporales);
          } else if (camino === "1") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "112") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(T);
            adivinado.push(unidadesTemporales);
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11211") {
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);
            adivinado.splice(0, adivinado.length);
            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
              adivinado.push(decenasTemporales);
              adivinado.push(unidadesTemporales);
            } else {
              for (let i = 0; i < miles.length; i++) {
                if (i < miles.length) {
                  adivinado.push(miles[i]);
                  adivinado.push(decenasTemporales);
                  adivinado.push(unidadesTemporales);
                  break;
                } else {
                  console.log("I couldn't found number");
                }
              }
            }
          } else if (camino === "113") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            adivinado.push(T);
            adivinado.push(U);
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11311") {
            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);

            adivinado.splice(0, adivinado.length);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(milesTemporales);
              adivinado.push(decenasTemporales);
              adivinado.push(unidades[0]);
            } else {
              for (let i = 0; i < unidades.length; i++) {
                if (i < unidades.length) {
                  adivinado.push(milesTemporales);
                  adivinado.push(decenasTemporales);
                  adivinado.push(unidades[i]);
                  break;
                } else {
                  console.log("I couldn't found number");
                }
              }
            }
          } else if (camino === "11312") {
            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            if (unidades.length == 1) {
              camino = "win";
              adivinado.push(milesTemporales);
              adivinado.push(decenas[0]);
              adivinado.push(unidadesTemporales);
            } else {
              for (let i = 0; i < decenas.length; i++) {
                if (i < unidades.length) {
                  adivinado.push(milesTemporales);
                  adivinado.push(decenas[i]);
                  adivinado.push(unidadesTemporales);
                  break;
                } else {
                  console.log("I couldn't found number");
                }
              }
            }
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1211") {
            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);
            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            adivinado.push(decenasTemporales);
            if (unidades.length > 1) {
              adivinado.push(unidades[unidades.length - 1]);
            } else {
              camino = "win";
              adivinado.push(unidades[0]);
            }
          } else if (camino === "1212") {
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);
            adivinado.splice(0, adivinado.length);
            if (miles.length > 1) {
              adivinado.push(miles[miles.length - 1]);
            } else {
              camino = "win";
              adivinado.push(miles[0]);
            }
            adivinado.push(decenasTemporales);
            adivinado.push(unidadesTemporales);
          }
        } else if (fijas == 0 && picas == 2) {
          if (camino === "0") {
            camino = "03";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
            contador3++;
          } else if (camino === "01") {
            camino = "012";
            decenasTemporales = U;
            unidadesTemporales = T;
            removerDelRecurso(U);
            removerDeMiles(U);
            removerDeDecenas(U);
            removerDeUnidades(U);

            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            adivinado.splice(0, adivinado.length);
            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
            } else {
              adivinado.push(miles[miles.length - 1]);
            }
            adivinado.push(decenasTemporales);
            adivinado.push(unidadesTemporales);
          } else if (camino === "011") {
            camino = "0111";
            unidadesTemporales = H;
            removerDelRecurso(H);
            removerDeMiles(H);
            removerDeDecenas(H);
            removerDeUnidades(H);

            removerDelRecurso(T);
            removerDeMiles(T);
            removerDeDecenas(T);
            removerDeUnidades(T);

            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            if (decenas.length == 1) {
              camino = "win";
              adivinado.push(decenas[0]);
            } else {
              adivinado.push(decenas[decenas.length - 1]);
            }
            adivinado.push(unidadesTemporales);
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
            if (contador3 == 2) {
              esGanador = true;

              toast.success("Yo gane");
            }
            contador3++;
          } else if (camino === "031") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0311") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            camino = "03212";
            decenasTemporales = U;
            unidadesTemporales = T;
            adivinado.splice(0, adivinado.length);
            if (miles.length == 1) {
              camino = "win";
              adivinado.push(miles[0]);
            } else {
              adivinado.push(miles[miles.length - 1]);
            }
            adivinado.push(decenasTemporales);
            adivinado.push(unidadesTemporales);
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            camino = "1212";
            adivinado.splice(0, adivinado.length);
            unidadesTemporales = T;

            removerDelRecurso(H);
            removerDeDecenas(H);
            removerDeUnidades(H);
            removerDeMiles(H);

            removerDelRecurso(unidadesTemporales);
            removerDeDecenas(unidadesTemporales);
            removerDeUnidades(unidadesTemporales);
            removerDeMiles(unidadesTemporales);
            if (miles.length > 0) {
              adivinado.push(miles[miles.length - 1]);
              adivinado.push(decenasTemporales);
              adivinado.push(unidadesTemporales);
            }
          } else if (camino === "112") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(T);
            adivinado.push(H);
            adivinado.push(unidadesTemporales);
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "113") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(milesTemporales);
            adivinado.push(U);
            adivinado.push(T);
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "12") {
            camino = "122";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(decenasTemporales);
            adivinado.push(H);
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas == 2 && picas == 1) {
          esGanador = true;

          toast.success("Yo gane");
        } else if (fijas == 1 && picas == 2) {
          if (camino === "0") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            camino = "021";
            memoria.splice(0, memoria.length);
            memoria.push(H);
            memoria.push(T);
            memoria.push(U);

            adivinado.splice(0, adivinado.length);
            adivinado.push(H);
            adivinado.push(decenas[0]);
            adivinado.push(unidades[0]);
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "031") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0311") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "113") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas == 3) {
          if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "113") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (picas == 3) {
          if (camino === "0") {
            camino = "02";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "01") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "011") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "012") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02") {
            camino = "win";
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "021") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "02111") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "031") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0311") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03111" || camino === "03112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "032") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "0321") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "03211" || camino === "03212") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1") {
            adivinado.splice(0, adivinado.length);
            adivinado.push(U);
            adivinado.push(H);
            adivinado.push(T);
          } else if (camino === "11") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "112") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "113") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1131") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "11311" || camino === "11312") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1132" || camino === "1122") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "121") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1211") {
            esGanador = true;

            toast.success("Yo gane");
          } else if (camino === "1212") {
            esGanador = true;

            toast.success("Yo gane");
          }
        } else if (fijas < 0 || fijas > 3 || picas < 0 || picas > 3) {
          toast.error("Esto valores no son posibles");
        } else {
          toast.error("las picas y fijas deben estar entre 0 y 2");
        }
      }
    }
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    const fijas: number = parseInt(data.fijas),
      picas: number = parseInt(data.picas);
    getPicasFijas(fijas, picas);
  };
  let val: any = errors[`number1`] ? errors[`number1`].message : null;
  let val2: any = errors[`number2`] ? errors[`number2`].message : null;
  return numeroPrincipal ? (
    <div>
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span>
            {adivinado.map((value, i) => (
              <Fragment key={i}>{value}</Fragment>
            ))}
          </span>
          <br />
          <TransitionGroup className="grid grid-cols-3 gap-x-1 gap-y-4">
            <CSSTransition timeout={500} classNames="item">
              <div className="relative">
                <input
                  type="number1"
                  {...register("picas")}
                  className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
                  placeholder="picas"
                />
                <label
                  htmlFor={`number1`}
                  className="absolute left-0 -top-5 text-gray-600 text-sm ml-1 select-none"
                >
                  {val}
                </label>
              </div>
            </CSSTransition>
            <CSSTransition timeout={500} classNames="item">
              <div className="relative">
                <input
                  type="number2"
                  {...register("fijas")}
                  className={`w-full mt-2 mr-6 py-2 px-4 text-base appearance-none border-2 border-transparent focus:border-purple-600 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg focus:outline-none`}
                  placeholder="fijas"
                />
                <label
                  htmlFor={`number2`}
                  className="absolute left-0 -top-5 text-gray-600 text-sm ml-1 select-none"
                >
                  {val2}
                </label>
              </div>
            </CSSTransition>
          </TransitionGroup>
          <button type="submit" className="btn btn-red">
            Intentar
          </button>
        </form>
      </>
    </div>
  ) : (
    <></>
  );
};

export default MaquinaAdivina;
