import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Conocenos from "./pages/Conocenos";
import Comojugar from "./pages/Comojugar";
import Navegacion from "./components/Navegacion";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Router>
      <Navegacion />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/conocenos">
          <Conocenos />
        </Route>
        <Route exact path="/comojugar">
          <Comojugar />
        </Route>
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
