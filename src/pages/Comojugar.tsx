import React from "react";

const Comojugar = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Como jugar Fijas y Picas
      </h1>
      <div className="mx-auto w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Modo Clásico</h2>
        <p className="text-gray-700 mb-4">
          En este modo, dos jugadores se enfrentan para adivinar el número
          secreto del otro. El primero en adivinarlo gana.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Modo Contra la Computadora
        </h2>
        <p className="text-gray-700 mb-4">
          En este modo, un jugador se enfrenta a la computadora para adivinar un
          número generado aleatoriamente por ella.
        </p>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Modo Torneo</h2>
        <p className="text-gray-700 mb-4">
          En este modo, varios jugadores compiten entre sí en un formato de
          eliminación, donde el último jugador en adivinar el número secreto en
          cada ronda avanza a la siguiente. El ganador del torneo es el último
          jugador en quedarse en pie.
        </p>
      </div>
    </div>
  );
};

export default Comojugar;
