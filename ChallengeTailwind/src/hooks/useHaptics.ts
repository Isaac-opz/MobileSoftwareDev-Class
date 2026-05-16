import { useState } from 'react';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

type HapticsStatus = 'idle' | 'success' | 'error';

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'El dispositivo no reportó soporte de vibración';
};

export const useHaptics = () => {
  const [estado, setEstado] = useState<HapticsStatus>('idle');
  const [mensaje, setMensaje] = useState('');

  const ejecutar = async (
    descripcion: string,
    vibracionMs: number,
    feedback?: () => Promise<void>
  ) => {
    try {
      await Haptics.vibrate({ duration: vibracionMs });
      if (feedback) {
        await feedback();
      }
      setEstado('success');
      setMensaje(`${descripcion} enviada al dispositivo.`);
    } catch (error: unknown) {
      setEstado('error');
      setMensaje(getErrorMessage(error));
    }
  };

  const vibrarLigero = async () => {
    await ejecutar('Vibración ligera', 120, () => Haptics.impact({ style: ImpactStyle.Light }));
  };

  const vibrarFuerte = async () => {
    await ejecutar('Vibración fuerte', 450, () => Haptics.impact({ style: ImpactStyle.Heavy }));
  };

  const vibrarNotificacion = async () => {
    await ejecutar('Vibración de éxito', 250, () =>
      Haptics.notification({ type: NotificationType.Success })
    );
  };

  return { estado, mensaje, vibrarLigero, vibrarFuerte, vibrarNotificacion };
};
