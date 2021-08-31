import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navegacion from "./components/Navegacion";
import { ToastContainer } from "react-toastify";
import routes from "./routes";
import { CSSTransition } from "react-transition-group";

const App = () => {
  return (
    <Router>
      <Navegacion />
      <Switch>
        <div className="rutas">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
      </Switch>
      <ToastContainer />
    </Router>
  );
};

export default App;
