import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton,
  IonButton
} from '@ionic/react';
import { useHaptics } from '../hooks/useHaptics';

const Vibracion = () => {
  const { vibrarLigero, vibrarFuerte, vibrarNotificacion } = useHaptics();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Vibración (Haptics)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Nota: Esto puede no funcionar en el navegador web.</p>
        <IonButton expand="block" onClick={vibrarLigero}>
          Vibración Ligera
        </IonButton>
        <IonButton expand="block" color="secondary" onClick={vibrarFuerte}>
          Vibración Fuerte
        </IonButton>
        <IonButton expand="block" color="success" onClick={vibrarNotificacion}>
          Vibración de Éxito
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Vibracion;
