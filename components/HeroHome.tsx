import React from "react";
import { RiPlayCircleLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";

function HeroHome() {
  return (
    <section className="relative">
      <div
        className="absolute pointer-events-none top-[45%]"
        aria-hidden="true"
      >
        <Image
          src="/im3.svg"
          alt="hola"
          width={1360}
          height={100}
          className="w-[1360px] opacity-75"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4">
              Juega ya!{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-amber-500">
                Fijas y Picas
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Un juego de adivinanza donde una persona elige un número de 3
                dígitos y la otra trata de adivinarlo con unas pistas.
              </p>
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div>
                  <Link
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                    href="/jugar"
                  >
                    Juega ahora mismo
                  </Link>
                </div>
                <div>
                  <a
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4"
                    href="https://github.com/jhairparis/Fijas-y-picas"
                  >
                    Ver codigo
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="relative flex justify-center mb-8">
              <div className="flex flex-col justify-center">
                <Image
                  className="mx-auto"
                  src="/images/hero-image.png"
                  width={768}
                  height={432}
                  alt="Hero"
                />
              </div>
              <Link
                className="absolute top-full flex items-center transform -translate-y-1/2 bg-white rounded-full font-medium group p-4 shadow-lg"
                href="/jugar"
              >
                <RiPlayCircleLine className="w-6 h-6 fill-current text-gray-400 group-hover:text-blue-600 flex-shrink-0" />
                <span className="ml-3">Vamos a jugar</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;
