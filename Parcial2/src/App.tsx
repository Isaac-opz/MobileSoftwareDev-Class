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
import { logOut, flag } from 'ionicons/icons';

import Login from './pages/Login';
import Misiones from './pages/Misiones';
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
const RutasProtegidas: React.FC = () => {
  const { usuario, cerrarSesion } = useContext(AuthContext) as any;

  if (!usuario) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/misiones">
          <Misiones />
        </Route>
        <Route exact path="/">
          <Redirect to="/misiones" />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom">
        <IonTabButton tab="misiones" href="/misiones">
          <IonIcon aria-hidden="true" icon={flag} />
          <IonLabel>Misiones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="salir" onClick={() => cerrarSesion()}>
          <IonIcon aria-hidden="true" icon={logOut} />
          <IonLabel>Cerrar Sesión</IonLabel>
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
