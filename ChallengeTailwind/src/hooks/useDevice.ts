import { useState, useEffect } from 'react';
import { Device, DeviceInfo, BatteryInfo } from '@capacitor/device';

export const useDevice = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [bateria, setBateria] = useState<BatteryInfo | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const obtenerInformacion = async () => {
    setCargando(true);
    setError('');
    try {
      const infoDispositivo = await Device.getInfo();
      const infoBateria = await Device.getBatteryInfo();
      setInfo(infoDispositivo);
      setBateria(infoBateria);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo leer la información del dispositivo');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerInformacion();
  }, []);

  return { info, bateria, cargando, error, obtenerInformacion };
};
