import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'No se pudo acceder a la cámara';
};

export const useCamera = () => {
  const [foto, setFoto] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>('');

  const tomarFoto = async () => {
    try {
      const imagen = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Prompt
      });
      setFoto(imagen.dataUrl);
      setError('');
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    }
  };

  return { foto, error, tomarFoto };
};
