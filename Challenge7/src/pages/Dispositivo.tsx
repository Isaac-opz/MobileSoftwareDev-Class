import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react';
import { useDevice } from '../hooks/useDevice';

const Dispositivo = () => {
  const { info, bateria } = useDevice();

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
      <IonContent>
        {info && (
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Modelo</h2>
                <p>{info.model}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h2>Sistema Operativo</h2>
                <p>{info.operatingSystem} {info.osVersion}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h2>Plataforma</h2>
                <p>{info.platform}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}

        {bateria && (
          <IonList>
            <IonItem>
              <IonLabel>
                <h2>Nivel de Batería</h2>
                <p>{bateria.batteryLevel ? (bateria.batteryLevel * 100).toFixed(0) + '%' : 'Desconocido'}</p>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <h2>Cargando</h2>
                <p>{bateria.isCharging ? 'Sí' : 'No'}</p>
              </IonLabel>
            </IonItem>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Dispositivo;
