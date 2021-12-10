import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navegacion from "./components/Navegacion";
import { ToastContainer } from "react-toastify";
import routes from "./routes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Navegacion />
      <TransitionGroup>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <Component />
                </CSSTransition>
              )}
            </Route>
          ))}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </TransitionGroup>
      <ToastContainer />
    </Router>
  );
};

export default App;
