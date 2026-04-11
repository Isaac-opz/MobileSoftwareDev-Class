import { Haptics, ImpactStyle } from '@capacitor/haptics';

export const useHaptics = () => {
  const vibrarLigero = async () => {
    await Haptics.impact({ style: ImpactStyle.Light });
  };

  const vibrarFuerte = async () => {
    await Haptics.impact({ style: ImpactStyle.Heavy });
  };

  const vibrarNotificacion = async () => {
    await Haptics.notification({ type: 'SUCCESS' });
  };

  return { vibrarLigero, vibrarFuerte, vibrarNotificacion };
};
