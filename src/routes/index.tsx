import Home from "../pages/Home";
import Conocenos from "../pages/Conocenos";
import Comojugar from "../pages/Comojugar";

const routes = [
  { path: "/", name: "Inicio", Component: Home },
  { path: "/conocenos", name: "Conocenos", Component: Conocenos },
  { path: "/comojugar", name: "Como Jugar ", Component: Comojugar },
];
export default routes;
