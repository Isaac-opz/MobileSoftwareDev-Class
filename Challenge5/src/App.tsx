import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonLoading, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import TaskFormPage from './pages/TaskFormPage';
import TaskDetailPage from './pages/TaskDetailPage';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const AppRoutes: React.FC = () => {
  const { usuario, cargando } = useAuthContext();

  if (cargando) {
    return (
      <div style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <IonSpinner color="primary" />
      </div>
    );
  }

  return (
    <IonReactRouter>
      {!usuario ? (
        <IonRouterOutlet>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          {/* Catch-all route to redirect any unknown unauthenticated route back to login */}
          <Redirect to="/login" />
        </IonRouterOutlet>
      ) : (
        <TasksProvider>
          <IonRouterOutlet>
            <Route exact path="/tasks" component={TasksPage} />
            <Route exact path="/tasks/new" component={TaskFormPage} />
            <Route exact path="/tasks/:id/edit" component={TaskFormPage} />
            <Route exact path="/tasks/:id/detail" component={TaskDetailPage} />
            <Route exact path="/">
              <Redirect to="/tasks" />
            </Route>
            {/* Catch-all route to redirect any known authenticated route back to tasks */}
            <Redirect to="/tasks" />
          </IonRouterOutlet>
        </TasksProvider>
      )}
    </IonReactRouter>
  );
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </IonApp>
);

export default App;
