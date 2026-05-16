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
import { useDevice } from '../hooks/useDevice';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import TailwindCard from '../components/TailwindCard';

const Dispositivo = () => {
  const { info, bateria, cargando, error, obtenerInformacion } = useDevice();

  const batteryLevel = bateria?.batteryLevel;
  const batteryPercent = batteryLevel != null ? `${(batteryLevel * 100).toFixed(0)}%` : 'No disponible';
  const chargingStatus =
    bateria?.isCharging == null ? 'No disponible' : bateria.isCharging ? 'Sí' : 'No';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Información del Dispositivo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">Lectura del dispositivo</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              La batería es el dato reportado por Android/Capacitor y puede variar según el
              fabricante o ahorro de energía.
            </p>
            <IonButton
              className="mt-4"
              disabled={cargando}
              expand="block"
              onClick={obtenerInformacion}
            >
              {cargando ? 'Actualizando...' : 'Actualizar datos'}
            </IonButton>
          </TailwindCard>

          {error && <ErrorMessage message={error} />}

          {info && (
            <TailwindCard>
              <h2 className="mb-2 text-lg font-semibold text-slate-950">
                Datos del dispositivo
              </h2>
              <InfoRow label="Modelo" value={info.model} />
              <InfoRow label="Sistema operativo" value={`${info.operatingSystem} ${info.osVersion}`} />
              <InfoRow label="Plataforma" value={info.platform} />
            </TailwindCard>
          )}

          {bateria && (
            <TailwindCard>
              <h2 className="mb-2 text-lg font-semibold text-slate-950">Batería</h2>
              <div className="mb-3 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${(batteryLevel ?? 0) * 100}%` }}
                />
              </div>
              <InfoRow label="Nivel" value={batteryPercent} />
              <InfoRow label="Cargando" value={chargingStatus} />
            </TailwindCard>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Dispositivo;
