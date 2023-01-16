import React, { useEffect, useState } from "react";
enum peticion {
  exito,
  fallo,
  nada,
}
const e =
  "bg-green-50 border border-green-500 text-green-900 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ";
const f =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 ";

const n =
  "block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const Newsletter = () => {
  const [subscribe, setSubscribe] = useState<peticion>(peticion.nada);
  const [style, setStyle] = useState(n);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (subscribe === peticion.nada) setStyle(n);
    if (subscribe === peticion.exito) setStyle(e);
    if (subscribe === peticion.fallo) setStyle(f);
    if (subscribe != peticion.nada) setEmail("");
  }, [subscribe]);

  const onSubmit = () => {
    if (!emailRegex.test(email)) setSubscribe(peticion.fallo);

    const url: any = import.meta.env.VITE_API;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSubscribe(peticion.exito);
      })
      .catch((error) => {
        setSubscribe(peticion.fallo);
        console.log(error);
      });

    setTimeout(() => {
      setSubscribe(peticion.nada);
    }, 3000);
  };

  function handleChange(event: any) {
    setEmail(event.target.value);
  }

  return (
    <div>
      <h6 className="text-gray-800 font-medium mb-2">Subscribete</h6>
      <p className="text-sm text-gray-600 mb-4">
        Get the latest news and articles to your inbox every month.
      </p>

      <div className="mb-6">
        <div className="relative">
          <input
            type="email"
            className={style}
            value={email}
            onChange={handleChange}
            placeholder={
              subscribe === peticion.exito
                ? "Gracias por subcribirte"
                : subscribe === peticion.fallo
                ? "No se puedo subribirte"
                : "nombre@jhairparis.com"
            }
          />
          {subscribe === peticion.nada ? (
            <button
              type="button"
              onClick={() => onSubmit()}
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enviar
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
