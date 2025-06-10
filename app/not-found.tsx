import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      <Image
        src="/not found.svg"
        alt="Not Found"
        width={300}
        height={300}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        ¡Ups! Página no encontrada
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Parece que la página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default NotFound;
