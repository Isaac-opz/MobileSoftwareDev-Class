import { useState, useEffect } from 'react';
import { Motion } from '@capacitor/motion';

export const useAccelerometer = () => {
  const [aceleracion, setAceleracion] = useState<{ x: number; y: number; z: number } | null>(null);

  useEffect(() => {
    let accelListener: any;

    const iniciarEscucha = async () => {
      accelListener = await Motion.addListener('accel', (event) => {
        setAceleracion({
          x: event.acceleration.x,
          y: event.acceleration.y,
          z: event.acceleration.z
        });
      });
    };

    iniciarEscucha();

    return () => {
      if (accelListener) {
        accelListener.remove();
      }
    };
  }, []);

  return { aceleracion };
};
