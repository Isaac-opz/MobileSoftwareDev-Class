import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

export const useNetwork = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Obtener el estado actual
    const initNetworkStatus = async () => {
      const status = await Network.getStatus();
      setIsOnline(status.connected);
    };

    initNetworkStatus();

    // Escuchar cambios de red
    const networkListener = Network.addListener('networkStatusChange', status => {
      setIsOnline(status.connected);
    });

    // Limpieza del listener
    return () => {
      networkListener.then(listener => listener.remove());
    };
  }, []);

  return { isOnline };
};
