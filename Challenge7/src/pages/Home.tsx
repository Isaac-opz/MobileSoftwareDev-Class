import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/react';
import { 
  locationOutline, 
  cameraOutline, 
  phonePortraitOutline, 
  hardwareChipOutline,
  pulseOutline,
  documentTextOutline,
  notificationsOutline,
  cloudDownloadOutline
} from 'ionicons/icons';

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reto 7 - Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/geolocalizacion" button>
            <IonIcon icon={locationOutline} slot="start" />
            <IonLabel>Geolocalización</IonLabel>
          </IonItem>
          
          <IonItem routerLink="/camara" button>
            <IonIcon icon={cameraOutline} slot="start" />
            <IonLabel>Cámara</IonLabel>
          </IonItem>

          <IonItem routerLink="/movimiento" button>
            <IonIcon icon={phonePortraitOutline} slot="start" />
            <IonLabel>Movimiento (Acelerómetro)</IonLabel>
          </IonItem>

          <IonItem routerLink="/dispositivo" button>
            <IonIcon icon={hardwareChipOutline} slot="start" />
            <IonLabel>Dispositivo e Info</IonLabel>
          </IonItem>

          <IonItem routerLink="/vibracion" button>
            <IonIcon icon={pulseOutline} slot="start" />
            <IonLabel>Vibración (Haptics)</IonLabel>
          </IonItem>

          <IonItem routerLink="/archivos" button>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel>Archivos Locales</IonLabel>
          </IonItem>

          <IonItem routerLink="/notificaciones-locales" button>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Notificaciones Locales</IonLabel>
          </IonItem>

          <IonItem routerLink="/notificaciones-push" button>
            <IonIcon icon={cloudDownloadOutline} slot="start" />
            <IonLabel>Notificaciones Push</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
