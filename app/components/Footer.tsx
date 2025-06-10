import React from "react";
import Link from "next/link"; // Changed from react-router-dom
import { RiGithubFill, RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import Newsletter from "./Newsletter";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h5 className="text-xl font-bold mb-4">Fijas y Picas</h5>
          <p className="text-gray-400">
            Un juego de lógica y deducción. Adivina el número secreto y
            conviértete en el campeón.
          </p>
        </div>
        <div>
          <h5 className="text-xl font-bold mb-4">Enlaces Rápidos</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/como-jugar" className="hover:text-gray-300">
                ¿Cómo jugar?
              </Link>
            </li>
            <li>
              <Link href="/jugar" className="hover:text-gray-300">
                Jugar
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="hover:text-gray-300">
                Política de Privacidad
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="text-xl font-bold mb-4">Contacto</h5>
          <p className="text-gray-400">
            ¿Preguntas o sugerencias? Contáctanos.
          </p>
          {/* TODO: Add contact form or email link */}
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        © {new Date().getFullYear()} Fijas y Picas. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}

export default Footer;
