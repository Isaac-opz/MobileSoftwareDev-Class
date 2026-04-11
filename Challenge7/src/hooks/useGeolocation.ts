import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [coordenadas, setCoordenadas] = useState<{ latitud: number; longitud: number } | null>(null);
  const [error, setError] = useState<string>('');

  const obtenerUbicacion = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setCoordenadas({
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      });
      setError('');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { coordenadas, error, obtenerUbicacion };
};
