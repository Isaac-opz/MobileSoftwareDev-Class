import { useState } from 'react';
import { LocalNotifications } from '@capacitor/local-notifications';

type NotificationStatus = 'idle' | 'loading' | 'scheduled' | 'denied' | 'error';

const DEMO_CHANNEL_ID = 'demo';

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'No se pudo programar la notificación';
};

export const useLocalNotifications = () => {
  const [estado, setEstado] = useState<NotificationStatus>('idle');
  const [mensajeEstado, setMensajeEstado] = useState('');
  const [pendientes, setPendientes] = useState(0);

  const mostrarNotificacion = async (titulo: string, mensaje: string) => {
    setEstado('loading');
    setMensajeEstado('Solicitando permiso y preparando canal de Android...');

    try {
      const permisosActuales = await LocalNotifications.checkPermissions();
      const permisos =
        permisosActuales.display === 'granted'
          ? permisosActuales
          : await LocalNotifications.requestPermissions();

      if (permisos.display !== 'granted') {
        setEstado('denied');
        setMensajeEstado('Permiso de notificaciones denegado.');
        return;
      }

      await LocalNotifications.createChannel({
        id: DEMO_CHANNEL_ID,
        name: 'Demo notifications',
        description: 'Canal de prueba para ChallengeTailwind',
        importance: 5,
        visibility: 1,
        lights: true,
        lightColor: '#0ea5e9',
        vibration: true,
      });

      const id = Date.now() % 2147483647;
      await LocalNotifications.schedule({
        notifications: [
          {
            title: titulo || 'Prueba',
            body: mensaje || 'Esta es una notificación local',
            id,
            channelId: DEMO_CHANNEL_ID,
            schedule: { at: new Date(Date.now() + 1000 * 3) },
            extra: { source: 'ChallengeTailwind' },
          },
        ],
      });

      const pending = await LocalNotifications.getPending();
      setPendientes(pending.notifications.length);
      setEstado('scheduled');
      setMensajeEstado(`Notificación programada. Pendientes: ${pending.notifications.length}.`);
    } catch (error: unknown) {
      setEstado('error');
      setMensajeEstado(getErrorMessage(error));
    }
  };

  return { estado, mensajeEstado, pendientes, mostrarNotificacion };
};
