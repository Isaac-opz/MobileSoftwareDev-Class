import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';

export const useGeolocation = () => {
  const [posicion, setPosicion] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let watchId;
    const iniciarWatch = async () => {
      try {
        watchId = await Geolocation.watchPosition({
          enableHighAccuracy: true
        }, (position) => {
          if (position) setPosicion(position.coords);
        });
      } catch (err) {
        console.error(err);
      }
    };
    iniciarWatch();
    return () => {
      if (watchId) Geolocation.clearWatch({ id: watchId });
    };
  }, []);

  // Obtener posición una vez
  const obtenerPosicionActual = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      setPosicion(coordinates.coords);
      return coordinates.coords;
    } catch (err) {
      setError('No se pudo obtener la ubicación');
      console.error(err);
      return null;
    }
  };

  // Calcular distancia entre dos puntos (fórmula Haversine simple)
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Radio de la Tierra en metros
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en metros
  };

  return { posicion, error, obtenerPosicionActual, calcularDistancia };
};
