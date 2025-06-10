import React from "react";
import { RiPlayCircleLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import FloatingNumbers3D from "./FloatingNumbers3D";

function HeroHome() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-rose-50 to-amber-50 pointer-events-none" aria-hidden="true" />
      
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-rose-400/8 to-amber-400/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/6 to-orange-400/6 rounded-full blur-3xl" />
      
      <div
        className="absolute pointer-events-none inset-0 w-full h-full opacity-80"
        aria-hidden="true"
      >
        <FloatingNumbers3D />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent text-sm font-semibold tracking-wider uppercase mb-4">
                El Juego de Lógica Definitivo
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tighter tracking-tighter mb-6">
              <span className="text-gray-900">Juega ya!</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500">
                Fijas y Picas
              </span>
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed">
                Un juego de adivinanza donde una persona elige un número de 3
                dígitos y la otra trata de adivinarlo con unas pistas.
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center sm:space-x-4">
                <div className="mb-4 sm:mb-0">
                  <Link
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                    href="/jugar"
                  >
                    Juega ahora mismo
                  </Link>
                </div>
                <div>
                  <a
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-rose-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                    href="https://github.com/jhairparis/Fijas-y-picas"
                  >
                    Ver código
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative flex justify-center mb-16">
              <div className="flex flex-col justify-center">
                <Image
                  className="mx-auto rounded-3xl shadow-2xl"
                  src="/images/hero-image.png"
                  width={768}
                  height={432}
                  alt="Hero"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <Link
                className="flex items-center bg-white hover:bg-gradient-to-r hover:from-rose-50 hover:to-amber-50 rounded-full font-semibold group p-5 shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-rose-200 transition-all duration-300"
                href="/jugar"
              >
                <RiPlayCircleLine className="w-7 h-7 fill-current text-rose-500 group-hover:text-amber-600 flex-shrink-0 transition-colors duration-300" />
                <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors duration-300">Vamos a jugar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
