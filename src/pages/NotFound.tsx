import React from "react";
import notFound from "../resource/not found.svg";

const NotFound = () => {
  return (
    <div className="gradient text-white min-h-screen flex items-center">
      <div className="container mx-auto p-4 flex flex-wrap items-center">
        <div className="w-full md:w-5/12 text-center p-4">
          <img src={notFound} alt="Not Found" />
        </div>
        <div className="w-full md:w-7/12 text-center md:text-left p-4">
          <div className="text-6xl font-medium">404</div>
          <div className="text-lg mb-8">
            La pagina que estas buscando no existe o ha sido movida.
          </div>
          <a href="/" className="border border-white rounded p-4">
            Ir al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
