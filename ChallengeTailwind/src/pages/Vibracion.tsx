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
import ErrorMessage from '../components/ErrorMessage';
import TailwindCard from '../components/TailwindCard';

const Vibracion = () => {
  const { estado, mensaje, vibrarLigero, vibrarFuerte, vibrarNotificacion } = useHaptics();

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
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">Pruebas hápticas</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              En Android se usa vibración perceptible como camino principal para que la demo
              se note en dispositivo real.
            </p>
            <div className="mt-4 grid gap-3">
              <IonButton expand="block" onClick={vibrarLigero}>
                Vibración ligera
              </IonButton>
              <IonButton expand="block" color="secondary" onClick={vibrarFuerte}>
                Vibración fuerte
              </IonButton>
              <IonButton expand="block" color="success" onClick={vibrarNotificacion}>
                Vibración de éxito
              </IonButton>
            </div>
          </TailwindCard>

          {mensaje && estado === 'success' && (
            <TailwindCard className="border-emerald-200 bg-emerald-50 text-sm text-emerald-800">
              {mensaje}
            </TailwindCard>
          )}

          {mensaje && estado === 'error' && <ErrorMessage message={mensaje} />}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Vibracion;
