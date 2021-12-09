import React from "react";
import { Link, NavLink } from "react-router-dom";
import routes from "../routes";
import Fade from "./Base/Fade";

const Navegacion = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <header
      className={`w-full bg-gray-600 ${!open ? "h-12" : "h-auto"}`}
      style={{ transition: " width 2s, height 4s" }}
    >
      <div className="py-2 px-1 mx-2 lg:mx-4 xl:mx-12">
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
            <button
              className="flex items-center px-3 py-1 text-white border-white hover:text-white hover:border-white focus:outline-none"
              onClick={(e) => setOpen(!open)}
            >
              <Fade in={open}>
                {!open ? (
                  <svg
                    className="fill-current h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                  </svg>
                ) : (
                  <svg
                    className="fill-current h-6 w-6 text-white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
                  </svg>
                )}
              </Fade>
            </button>
          </div>
          <div
            className={`w-full flex-grow lg:flex items-center lg:w-auto transition duration-500 ease-in-out transform ${
              open ? "translate-x-0" : "-translate-x-full opacity-0"
            } lg:translate-x-0 lg:opacity-100`}
          >
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
