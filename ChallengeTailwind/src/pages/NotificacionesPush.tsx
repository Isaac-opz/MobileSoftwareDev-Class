import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { usePushNotifications } from '../hooks/usePushNotifications';
import InfoRow from '../components/InfoRow';
import TailwindCard from '../components/TailwindCard';

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
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard className="border-sky-200 bg-sky-50">
            <h2 className="text-lg font-semibold text-slate-950">Push notifications</h2>
            <p className="mt-1 text-sm leading-6 text-slate-700">
              Para funcionar en serio debe compilarse a Android/iOS y vincularse con Firebase Cloud Messaging.
            </p>
          </TailwindCard>

          <TailwindCard>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              FCM token recibido
            </h3>
            <p className="mt-2 break-all rounded-md bg-slate-100 p-3 text-sm text-slate-800">
              {token || 'Esperando token de registro...'}
            </p>
          </TailwindCard>

          {notificacion && (
            <TailwindCard className="border-indigo-200 bg-indigo-50">
              <h3 className="mb-2 text-lg font-semibold text-indigo-950">
                Nueva notificación push
              </h3>
              <InfoRow label="Título" value={notificacion.title} />
              <InfoRow label="Cuerpo" value={notificacion.body} />
            </TailwindCard>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesPush;
