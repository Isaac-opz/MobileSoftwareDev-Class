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
import { usePushNotifications } from '../hooks/usePushNotifications';

const NotificacionesPush = () => {
  const { token, notificacion } = usePushNotifications();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Notificaciones Push</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>Nota: Para que el Push funcione de verdad, la aplicación debe compilarse a Android/iOS nativo y vincularse con Firebase Cloud Messaging (FCM).</p>
        
        <IonCard>
          <IonCardContent>
            <h3><strong>FCM Token Receptado:</strong></h3>
            <p style={{ wordBreak: 'break-all' }}>{token || 'Esperando token de registro...'}</p>
          </IonCardContent>
        </IonCard>

        {notificacion && (
          <IonCard color="primary">
            <IonCardContent>
              <h3><strong>Nueva Notificación Push!</strong></h3>
              <p>Título: {notificacion.title}</p>
              <p>Cuerpo: {notificacion.body}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesPush;
