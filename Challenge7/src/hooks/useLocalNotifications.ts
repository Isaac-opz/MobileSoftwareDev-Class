import { LocalNotifications } from '@capacitor/local-notifications';

export const useLocalNotifications = () => {
  const mostrarNotificacion = async (titulo: string, mensaje: string) => {
    // Pedir permisos primero
    const permisos = await LocalNotifications.requestPermissions();
    if (permisos.display === 'granted') {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: titulo,
            body: mensaje,
            id: new Date().getTime(),
            schedule: { at: new Date(Date.now() + 1000 * 3) }, // 3 segundos default
            actionTypeId: '',
            extra: null
          }
        ]
      });
    }
  };

  return { mostrarNotificacion };
};
