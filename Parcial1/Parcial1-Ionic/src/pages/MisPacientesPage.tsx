import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react'

const MisPacientesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Pacientes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Listado de pacientes asignados</p>
      </IonContent>
    </IonPage>
  )
}

export default MisPacientesPage
