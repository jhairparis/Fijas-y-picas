import React from "react";
import { Link } from "react-router-dom";
import { RiGithubFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              <Link to="/" className="inline-block" aria-label="Cruip">
                F y P
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              <Link
                to="/privacidad"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Terminos
              </Link>{" "}
              ·{" "}
              <Link
                to="/privacidad"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Politicas de privacidad
              </Link>
            </div>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Productos</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="https://smartschool.jhairparis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Smart School
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://fijasypicas.jhairparis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Fijas y picas
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://nearbybusiness.jhairparis.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  NearbyBusiness
                </a>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="text-gray-800 font-medium mb-2">Compañia</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <a
                  href="https://jhairparis.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Acerca de nosotros
                </a>
              </li>
              <li className="mb-2">
                <Link
                  to="/priacidad"
                  className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                >
                  Politicas de privacidad
                </Link>
              </li>
            </ul>
          </div>

          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <Newsletter />
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a
                href="https://twitter.com/@jhairparis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-8 h-8 text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Twitter"
              >
                <RiTwitterFill className="text-lg" />
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://github.com/illustriousloop/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-8 h-8 text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
                <RiGithubFill className="text-lg" />
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://www.instagram.com/jhairparis/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-8 h-8 text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Instagram"
              >
                <RiInstagramFill className="text-lg" />
              </a>
            </li>
          </ul>

          <div className="text-sm text-gray-600 mr-4">
            Made by{" "}
            <a
              className="text-blue-600 hover:underline"
              href="https://jhairparis.com/"
            >
              Illustriousloop
            </a>
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
