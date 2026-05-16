import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import TailwindCard from '../components/TailwindCard';

const Geolocalizacion = () => {
  const { coordenadas, error, estado, obtenerUbicacion } = useGeolocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Geolocalización</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">Ubicación actual</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Presiona el botón para pedir permiso y leer una ubicación reciente. Si el GPS
              tarda, la app espera hasta 30 segundos antes de mostrar error.
            </p>
            <IonButton
              className="mt-4"
              disabled={estado === 'loading'}
              expand="block"
              onClick={obtenerUbicacion}
            >
              {estado === 'loading' ? 'Buscando ubicación...' : 'Obtener mi ubicación'}
            </IonButton>
          </TailwindCard>

          {estado === 'loading' && (
            <TailwindCard className="border-sky-200 bg-sky-50 text-sm text-sky-800">
              Esperando respuesta del GPS o de los servicios de ubicación del teléfono.
            </TailwindCard>
          )}

          {error && <ErrorMessage message={error} />}

          {coordenadas && (
            <TailwindCard>
              <InfoRow label="Latitud" value={coordenadas.latitud.toFixed(6)} />
              <InfoRow label="Longitud" value={coordenadas.longitud.toFixed(6)} />
              <InfoRow label="Precisión" value={`${coordenadas.precision.toFixed(0)} m`} />
            </TailwindCard>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Geolocalizacion;
