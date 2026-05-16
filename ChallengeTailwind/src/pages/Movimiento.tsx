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
import { useAccelerometer } from '../hooks/useAccelerometer';
import InfoRow from '../components/InfoRow';
import TailwindCard from '../components/TailwindCard';

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
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">Acelerómetro</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Mueve el dispositivo para ver cómo cambian los valores de cada eje.
            </p>
          </TailwindCard>

          {aceleracion ? (
            <TailwindCard>
              <InfoRow label="Eje X" value={aceleracion.x} />
              <InfoRow label="Eje Y" value={aceleracion.y} />
              <InfoRow label="Eje Z" value={aceleracion.z} />
            </TailwindCard>
          ) : (
            <TailwindCard className="border-amber-200 bg-amber-50 text-sm text-amber-800">
              Esperando datos del acelerómetro o dispositivo no compatible.
            </TailwindCard>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Movimiento;
