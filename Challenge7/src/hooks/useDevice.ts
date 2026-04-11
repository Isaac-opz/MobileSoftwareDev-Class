import { useState, useEffect } from 'react';
import { Device, DeviceInfo, BatteryInfo } from '@capacitor/device';

export const useDevice = () => {
  const [info, setInfo] = useState<DeviceInfo | null>(null);
  const [bateria, setBateria] = useState<BatteryInfo | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const infoDispositivo = await Device.getInfo();
      const infoBateria = await Device.getBatteryInfo();
      setInfo(infoDispositivo);
      setBateria(infoBateria);
    };

    obtenerInformacion();
  }, []);

  return { info, bateria };
};
