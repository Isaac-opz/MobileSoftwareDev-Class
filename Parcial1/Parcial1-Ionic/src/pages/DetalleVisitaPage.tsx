import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/react'

const DetalleVisitaPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalle de Visita</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Detalle de la visita seleccionada</p>
      </IonContent>
    </IonPage>
  )
}

export default DetalleVisitaPage
