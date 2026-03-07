import { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonBadge,
  setupIonicReact
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { medkit, people, person } from 'ionicons/icons'

import LoginPage from './pages/LoginPage'
import VisitasPage from './pages/VisitasPage'
import DetalleVisitaPage from './pages/DetalleVisitaPage'
import MisPacientesPage from './pages/MisPacientesPage'
import PerfilMedicoPage from './pages/PerfilMedicoPage'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/palettes/dark.system.css'
import './theme/variables.css'

setupIonicReact()

const visitasIniciales = [
  { id: 1, paciente: 'Juan Perez', estado: 'pendiente', motivo: '' },
  { id: 2, paciente: 'Maria Lopez', estado: 'pendiente', motivo: '' },
  { id: 3, paciente: 'Carlos Garcia', estado: 'finalizada', motivo: '' }
]

const App: React.FC = () => {
  const estaLogueado = localStorage.getItem('usuario_medico') !== null

  const [visitas, setVisitas] = useState(() => {
    const guardadas = localStorage.getItem('medicare_visitas')
    return guardadas ? JSON.parse(guardadas) : visitasIniciales
  })

  useEffect(() => {
    localStorage.setItem('medicare_visitas', JSON.stringify(visitas))
  }, [visitas])

  const pendientes = visitas.filter((v: any) => v.estado === 'pendiente').length

  return (
    <IonApp>
      <IonReactRouter>
        {!estaLogueado ? (
          <IonRouterOutlet>
            <Route exact path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </IonRouterOutlet>
        ) : (
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/visitas" render={() => <VisitasPage visitas={visitas} setVisitas={setVisitas} />} />
              <Route exact path="/visitas/:id" component={DetalleVisitaPage} />
              <Route exact path="/pacientes" component={MisPacientesPage} />
              <Route exact path="/perfil" component={PerfilMedicoPage} />
              <Route exact path="/">
                <Redirect to="/visitas" />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="visitas" href="/visitas">
                <IonIcon icon={medkit} />
                <IonLabel>Visitas</IonLabel>
                {pendientes > 0 && <IonBadge color="danger">{pendientes}</IonBadge>}
              </IonTabButton>
              <IonTabButton tab="pacientes" href="/pacientes">
                <IonIcon icon={people} />
                <IonLabel>Pacientes</IonLabel>
              </IonTabButton>
              <IonTabButton tab="perfil" href="/perfil">
                <IonIcon icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        )}
      </IonReactRouter>
    </IonApp>
  )
}

export default App
