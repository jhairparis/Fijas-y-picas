import React from "react";
import { Link } from "react-router-dom";

const Navegacion = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/conocenos">Conocemos</Link>
          </li>
          <li>
            <Link to="/comojugar">Como Juagar</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navegacion;
