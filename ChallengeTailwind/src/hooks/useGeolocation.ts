import { useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';

type Coordinates = {
  latitud: number;
  longitud: number;
  precision: number;
};

type LocationStatus = 'idle' | 'loading' | 'success' | 'error';

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : 'No se pudo obtener la ubicación';
};

export const useGeolocation = () => {
  const [coordenadas, setCoordenadas] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string>('');
  const [estado, setEstado] = useState<LocationStatus>('idle');

  const obtenerUbicacion = async () => {
    setEstado('loading');
    setError('');

    try {
      const permisosActuales = await Geolocation.checkPermissions();
      const permisos =
        permisosActuales.location === 'granted' || permisosActuales.coarseLocation === 'granted'
          ? permisosActuales
          : await Geolocation.requestPermissions({ permissions: ['location', 'coarseLocation'] });

      if (permisos.location !== 'granted' && permisos.coarseLocation !== 'granted') {
        throw new Error('Permiso de ubicación denegado');
      }

      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000,
        enableLocationFallback: true,
      });

      setCoordenadas({
        latitud: position.coords.latitude,
        longitud: position.coords.longitude,
        precision: position.coords.accuracy,
      });
      setEstado('success');
      setError('');
    } catch (err: unknown) {
      setEstado('error');
      setError(getErrorMessage(err));
    }
  };

  return { coordenadas, error, estado, obtenerUbicacion };
};
