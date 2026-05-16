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
import { useFilesystem } from '../hooks/useFilesystem';
import ErrorMessage from '../components/ErrorMessage';
import TailwindCard from '../components/TailwindCard';

const SistemaArchivos = () => {
  const [texto, setTexto] = useState('');
  const { contenidoLeido, error, mensaje, estado, escribirArchivo, leerArchivo } = useFilesystem();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Sistema de Archivos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">Archivo local</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Escribe texto y guárdalo en el almacenamiento privado de la app. En Android
              moderno no requiere permisos de archivos públicos.
            </p>
            <IonItem className="mt-4 rounded-lg border border-slate-200">
              <IonLabel position="floating">Texto a guardar</IonLabel>
              <IonInput
                value={texto}
                onIonChange={(e) => setTexto(e.detail.value!)}
              />
            </IonItem>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <IonButton expand="block" onClick={() => escribirArchivo(texto)}>
                Escribir archivo
              </IonButton>
              <IonButton expand="block" color="secondary" onClick={leerArchivo}>
                Leer archivo
              </IonButton>
            </div>
          </TailwindCard>

          {mensaje && (
            <TailwindCard
              className={
                estado === 'saved' || estado === 'loaded'
                  ? 'border-emerald-200 bg-emerald-50 text-sm text-emerald-800'
                  : 'text-sm'
              }
            >
              {mensaje}
            </TailwindCard>
          )}

          {error && <ErrorMessage message={error} />}

          {contenidoLeido && (
            <TailwindCard>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Contenido
              </h3>
              <p className="mt-2 rounded-md bg-slate-100 p-3 text-sm text-slate-800">
                {contenidoLeido}
              </p>
            </TailwindCard>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default SistemaArchivos;
