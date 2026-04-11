import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import { useGeolocation } from '../hooks/useGeolocation';

const Geolocalizacion = () => {
  const { coordenadas, error, obtenerUbicacion } = useGeolocation();

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
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={obtenerUbicacion}>
          Obtener Mi Ubicación
        </IonButton>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        {coordenadas && (
          <IonCard>
            <IonCardContent>
              <p><strong>Latitud:</strong> {coordenadas.latitud}</p>
              <p><strong>Longitud:</strong> {coordenadas.longitud}</p>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Geolocalizacion;
