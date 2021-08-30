import React from "react";
import { Link } from "react-router-dom";

const Navegacion = () => {
  return (
    <header className="w-full bg-gray-600">
      <div className="py-2 px-1 lg:mx-4 xl:mx-12">
        <nav className="flex items-center justify-between flex-wrap  ">
          <div className="flex items-center flex-no-shrink text-white mr-6 ">
            <span className="mt-2">Fijas y Picas</span>
          </div>
          <div className="block lg:hidden">
            <button className="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
              <svg
                className="fill-current h-6 w-6 text-white"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
          <div className="w-full flex-grow lg:flex items-center lg:w-auto hidden">
            <div className="text-sm lg:flex-grow mt-2 xl:mx-8">
              <Link to="/" className="link">
                Inicio
              </Link>
              <Link to="/conocenos" className="link">
                Conocemos
              </Link>
              <Link to="/comojugar" className="link">
                Como Juagar
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navegacion;
