import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonImg,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useCamera } from '../hooks/useCamera';

const Camara = () => {
  const { foto, error, tomarFoto } = useCamera();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Cámara</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={tomarFoto}>
          Tomar u Obtener Foto
        </IonButton>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {foto && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <IonImg src={foto} alt="Foto capturada" />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Camara;
