import { useState, useEffect } from 'react';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';

export const usePushNotifications = () => {
  const [token, setToken] = useState<string>('');
  const [notificacion, setNotificacion] = useState<PushNotificationSchema | null>(null);

  useEffect(() => {
    const registrarPush = async () => {
      // Necesita estar en un dispositivo nativo real para funcionar completamente
      const permisos = await PushNotifications.requestPermissions();
      if (permisos.receive === 'granted') {
        PushNotifications.register();
      }
    };

    registrarPush();

    // Listeners
    PushNotifications.addListener('registration', (t) => {
      setToken(t.value);
    });

    PushNotifications.addListener('pushNotificationReceived', (n) => {
      setNotificacion(n);
    });

    return () => {
      PushNotifications.removeAllListeners();
    };
  }, []);

  return { token, notificacion };
};
