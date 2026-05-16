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
import ErrorMessage from '../components/ErrorMessage';
import TailwindCard from '../components/TailwindCard';

const NotificacionesLocales = () => {
  const [titulo, setTitulo] = useState('Prueba');
  const [mensaje, setMensaje] = useState('Esta es una notificación local');
  const { estado, mensajeEstado, pendientes, mostrarNotificacion } = useLocalNotifications();

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
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">
              Crear notificación local
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Personaliza título y mensaje. La app crea un canal Android y programa una
              notificación de prueba para unos segundos después.
            </p>
            <div className="mt-4 space-y-3">
              <IonItem className="rounded-lg border border-slate-200">
                <IonLabel position="floating">Título</IonLabel>
                <IonInput value={titulo} onIonChange={(e) => setTitulo(e.detail.value!)} />
              </IonItem>
              <IonItem className="rounded-lg border border-slate-200">
                <IonLabel position="floating">Mensaje</IonLabel>
                <IonInput value={mensaje} onIonChange={(e) => setMensaje(e.detail.value!)} />
              </IonItem>
            </div>

            <IonButton
              expand="block"
              disabled={estado === 'loading'}
              className="mt-4"
              onClick={() => mostrarNotificacion(titulo, mensaje)}
            >
              {estado === 'loading' ? 'Programando...' : 'Programar notificación (3 seg)'}
            </IonButton>
          </TailwindCard>

          {mensajeEstado && estado !== 'error' && (
            <TailwindCard
              className={
                estado === 'scheduled'
                  ? 'mt-4 border-emerald-200 bg-emerald-50 text-sm text-emerald-800'
                  : 'mt-4 border-sky-200 bg-sky-50 text-sm text-sky-800'
              }
            >
              <p>{mensajeEstado}</p>
              {estado === 'scheduled' && (
                <p className="mt-1 text-xs text-emerald-700">
                  Pendientes reportadas por Capacitor: {pendientes}
                </p>
              )}
            </TailwindCard>
          )}

          {mensajeEstado && estado === 'error' && <ErrorMessage message={mensajeEstado} />}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default NotificacionesLocales;
