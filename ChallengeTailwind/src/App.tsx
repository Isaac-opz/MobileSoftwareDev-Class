import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Home from './pages/Home';
import Geolocalizacion from './pages/Geolocalizacion';
import Camara from './pages/Camara';
import Movimiento from './pages/Movimiento';
import Dispositivo from './pages/Dispositivo';
import Vibracion from './pages/Vibracion';
import SistemaArchivos from './pages/SistemaArchivos';
import NotificacionesLocales from './pages/NotificacionesLocales';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/geolocalizacion">
          <Geolocalizacion />
        </Route>
        <Route exact path="/camara">
          <Camara />
        </Route>
        <Route exact path="/movimiento">
          <Movimiento />
        </Route>
        <Route exact path="/dispositivo">
          <Dispositivo />
        </Route>
        <Route exact path="/vibracion">
          <Vibracion />
        </Route>
        <Route exact path="/archivos">
          <SistemaArchivos />
        </Route>
        <Route exact path="/notificaciones-locales">
          <NotificacionesLocales />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
