import Home from "../pages/Home";
import Conocenos from "../pages/Conocenos";
import Comojugar from "../pages/Comojugar";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/conocenos", name: "About", Component: Conocenos },
  { path: "/comojugar", name: "Contact", Component: Comojugar },
];
export default routes;
