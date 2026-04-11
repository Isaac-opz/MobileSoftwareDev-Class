import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { useAccelerometer } from '../hooks/useAccelerometer';

const Movimiento = () => {
  const { aceleracion } = useAccelerometer();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Movimiento</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Mueve tu dispositivo para ver los cambios en los ejes.</p>
        
        {aceleracion ? (
          <IonCard>
            <IonCardContent>
              <p><strong>X:</strong> {aceleracion.x}</p>
              <p><strong>Y:</strong> {aceleracion.y}</p>
              <p><strong>Z:</strong> {aceleracion.z}</p>
            </IonCardContent>
          </IonCard>
        ) : (
          <p>Esperando datos del acelerómetro o dispositivo no compatible...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Movimiento;
