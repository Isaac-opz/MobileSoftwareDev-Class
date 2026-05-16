import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar
} from '@ionic/react';
import { 
  locationOutline, 
  cameraOutline, 
  phonePortraitOutline, 
  hardwareChipOutline,
  pulseOutline,
  documentTextOutline,
  notificationsOutline
} from 'ionicons/icons';
import HomeMenuCard from '../components/HomeMenuCard';

const menuItems = [
  {
    href: '/geolocalizacion',
    icon: locationOutline,
    title: 'Geolocalización',
    description: 'Obtiene latitud y longitud usando el GPS del dispositivo.',
    accent: 'bg-emerald-500',
  },
  {
    href: '/camara',
    icon: cameraOutline,
    title: 'Cámara',
    description: 'Captura o selecciona una imagen desde el dispositivo.',
    accent: 'bg-sky-500',
  },
  {
    href: '/movimiento',
    icon: phonePortraitOutline,
    title: 'Movimiento',
    description: 'Lee cambios del acelerómetro en los ejes X, Y y Z.',
    accent: 'bg-violet-500',
  },
  {
    href: '/dispositivo',
    icon: hardwareChipOutline,
    title: 'Dispositivo',
    description: 'Muestra modelo, plataforma, sistema y estado de batería.',
    accent: 'bg-slate-700',
  },
  {
    href: '/vibracion',
    icon: pulseOutline,
    title: 'Vibración',
    description: 'Prueba respuestas hápticas ligeras, fuertes y de éxito.',
    accent: 'bg-rose-500',
  },
  {
    href: '/archivos',
    icon: documentTextOutline,
    title: 'Archivos locales',
    description: 'Guarda y lee texto con el filesystem de Capacitor.',
    accent: 'bg-amber-500',
  },
  {
    href: '/notificaciones-locales',
    icon: notificationsOutline,
    title: 'Notificaciones locales',
    description: 'Programa una notificación local desde un formulario.',
    accent: 'bg-teal-500',
  },
];

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reto 7 - Sensores</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="bg-slate-100">
        <main className="mx-auto max-w-3xl space-y-5 px-4 py-5">
          <section>
            <p className="text-sm font-medium uppercase tracking-wide text-sky-700">
              Capacitor + Tailwind
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-950">
              Reto 7 - Sensores
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Cada tarjeta usa utilidades de Tailwind para practicar layout,
              color, spacing, estados y responsive dentro del reto.
            </p>
          </section>

          <section className="grid gap-3 sm:grid-cols-2">
            {menuItems.map((item) => (
              <HomeMenuCard key={item.href} {...item} />
            ))}
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
