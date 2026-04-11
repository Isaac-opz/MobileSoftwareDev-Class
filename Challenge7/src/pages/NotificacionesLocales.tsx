import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton,
  IonButton,
  IonInput,
  IonItem,
  IonLabel
} from '@ionic/react';
import { useLocalNotifications } from '../hooks/useLocalNotifications';

const NotificacionesLocales = () => {
  const [titulo, setTitulo] = useState('Prueba');
  const [mensaje, setMensaje] = useState('Esta es una notificación local');
  const { mostrarNotificacion } = useLocalNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Notificaciones Locales</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Título</IonLabel>
          <IonInput value={titulo} onIonChange={e => setTitulo(e.detail.value!)} />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Mensaje</IonLabel>
          <IonInput value={mensaje} onIonChange={e => setMensaje(e.detail.value!)} />
        </IonItem>

        <IonButton 
          expand="block" 
          className="ion-margin-top"
          onClick={() => mostrarNotificacion(titulo, mensaje)}
        >
          Programar Notificación (3 seg)
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesLocales;
