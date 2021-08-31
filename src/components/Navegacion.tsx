import React from "react";
import { Link, NavLink } from "react-router-dom";
import routes from "../routes";

const Navegacion = () => {
  return (
    <header className="w-full bg-gray-600">
      <div className="py-2 px-1 lg:mx-4 xl:mx-12">
        <nav className="flex items-center justify-between flex-wrap">
          <div className="relative">
            <Link
              className="transition duration-500 ease-in-out text-gray-900 font-logo text-xl select-none hover:text-indigo-400"
              to="/"
            >
              Fijas y Picas
            </Link>
          </div>
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
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
            <div className="text-sm lg:flex-grow xl:mx-8">
              {routes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className="link"
                  activeClassName="active"
                  exact
                >
                  {route.name}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navegacion;
