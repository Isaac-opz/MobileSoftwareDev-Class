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
import ErrorMessage from '../components/ErrorMessage';
import TailwindCard from '../components/TailwindCard';

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
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-xl space-y-4 px-4 py-5">
          <TailwindCard>
            <h2 className="text-lg font-semibold text-slate-950">Captura de imagen</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Usa la cámara o galería para practicar permisos y renderizado condicional.
            </p>
            <IonButton className="mt-4" expand="block" onClick={tomarFoto}>
              Tomar u obtener foto
            </IonButton>
          </TailwindCard>

          {error && <ErrorMessage message={error} />}

          {foto && (
            <TailwindCard className="overflow-hidden p-0">
              <IonImg className="max-h-96 w-full object-cover" src={foto} alt="Foto capturada" />
            </TailwindCard>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Camara;
