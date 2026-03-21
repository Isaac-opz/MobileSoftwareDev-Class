import React from "react";
import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router";
import { IonRouterOutlet } from "@ionic/react";
import Login from "./pages/Login";
import List from "./pages/List";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

import "./App.css";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          <Route path="/login" exact={true} render={() => {
            const isLogged = localStorage.getItem("logged") === "true";
            return isLogged ? <Redirect to="/list" /> : <Login />;
          }} />

          <Route path="/list" exact={true} render={() => {
            const isLogged = localStorage.getItem("logged") === "true";
            return !isLogged ? <Redirect to="/login" /> : <List />;
          }} />

          <Route path="/" exact={true} render={() => {
            const isLogged = localStorage.getItem("logged") === "true";
            return <Redirect to={isLogged ? "/list" : "/login"} />;
          }} />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
