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

const SistemaArchivos = () => {
  const [texto, setTexto] = useState('');
  const { contenidoLeido, error, escribirArchivo, leerArchivo } = useFilesystem();

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
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Texto a guardar</IonLabel>
          <IonInput 
            value={texto} 
            onIonChange={e => setTexto(e.detail.value!)} 
          />
        </IonItem>
        <IonButton expand="block" onClick={() => escribirArchivo(texto)}>
          Escribir Archivo
        </IonButton>

        <br />

        <IonButton expand="block" color="secondary" onClick={leerArchivo}>
          Leer Archivo
        </IonButton>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {contenidoLeido && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid gray' }}>
            <strong>Contenido:</strong>
            <p>{contenidoLeido}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SistemaArchivos;
