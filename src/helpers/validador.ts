import * as yup from "yup";

export const schemaMain = yup.object().shape({
  number: yup
    .number()
    .typeError("Debe ser un numero")
    .test("len", "Solo un digito", (val) => val?.toString().length === 1)
    .positive("El numero debe ser positivo")
    .min(2, "El minimo numero es 2")
    .max(3, "El maximo numero es 3")
    .required("Ingresa un numero"),
});

export const schemaFijasPicas = yup.object().shape({
  fijas: yup
    .number()
    .typeError("Debe ser un numero")
    .test("len", "Solo un digito", (val) => val?.toString().length === 1)
    .positive("El numero debe ser positivo")
    .min(0, "El minimo numero es 0")
    .max(9, "El maximo numero es 9")
    .required("Ingresa un numero"),
  picas: yup
    .number()
    .typeError("Debe ser un numero")
    .test("len", "Solo un digito", (val) => val?.toString().length === 1)
    .positive("El numero debe ser positivo")
    .min(0, "El minimo numero es 0")
    .max(9, "El maximo numero es 9")
    .required("Ingresa un numero"),
});

export const schemaEntradas = {
  valueAsNumber: true,
  maxLength: {
    value: 1,
    message: "Solo un digito",
  },
  validate: {
    positive: (v: any) => parseInt(v) >= 0 || "El valor debe ser positivo",
  },
  min: {
    value: 0,
    message: "El minimo numero es 0",
  },
  max: {
    value: 9,
    message: "El maximo numero es 9",
  },
  required: "Ingresa un numero",
};
