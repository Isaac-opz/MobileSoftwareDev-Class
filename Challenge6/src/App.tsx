import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { people, list, nutrition, logOut } from 'ionicons/icons';

import Login from './pages/Login';
import Contactos from './pages/Contactos';
import Tareas from './pages/Tareas';
import Frutas from './pages/Frutas';
import { AuthProvider, AuthContext } from './contexts/AuthContext';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// Componente para proteger las rutas
const RutasProtegidas = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext);

  if (!usuario) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/contactos">
          <Contactos />
        </Route>
        <Route exact path="/tareas">
          <Tareas />
        </Route>
        <Route exact path="/frutas">
          <Frutas />
        </Route>
        <Route exact path="/">
          <Redirect to="/contactos" />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom">
        <IonTabButton tab="contactos" href="/contactos">
          <IonIcon aria-hidden="true" icon={people} />
          <IonLabel>Contactos</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tareas" href="/tareas">
          <IonIcon aria-hidden="true" icon={list} />
          <IonLabel>Tareas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="frutas" href="/frutas">
          <IonIcon aria-hidden="true" icon={nutrition} />
          <IonLabel>Frutas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="salir" onClick={() => cerrarSesion()}>
          <IonIcon aria-hidden="true" icon={logOut} />
          <IonLabel>Salir</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const App = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/">
            <RutasProtegidas />
          </Route>
        </Switch>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
