import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import { RiGithubFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500" />

      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/5 to-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-amber-500/5 to-orange-500/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent mb-4">
                Fijas y Picas
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Un juego de lógica y deducción que desafiará tu mente. Adivina
                el número secreto y conviértete en el campeón de fijas y picas.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25 border-2 border-transparent hover:border-rose-400"
                >
                  <RiGithubFill
                    className="text-gray-400 group-hover:text-rose-400 transition-colors duration-300"
                    size={20}
                  />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25 border-2 border-transparent hover:border-amber-400"
                >
                  <RiInstagramFill
                    className="text-gray-400 group-hover:text-amber-400 transition-colors duration-300"
                    size={20}
                  />
                </a>
                <a
                  href="#"
                  className="group flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-500/25 border-2 border-transparent hover:border-orange-400"
                >
                  <RiTwitterFill
                    className="text-gray-400 group-hover:text-orange-400 transition-colors duration-300"
                    size={20}
                  />
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/como-jugar"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  ¿Cómo jugar?
                </Link>
              </li>
              <li>
                <Link
                  href="/jugar"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Jugar
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 mr-0 group-hover:mr-3"></span>
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <Newsletter />
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Fijas y Picas. Todos los derechos
              reservados.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/terminos"
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                Términos de Servicio
              </Link>
              <Link
                href="/privacidad"
                className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
              >
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
