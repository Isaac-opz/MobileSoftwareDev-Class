import { useState, useEffect } from 'react';
import { useFirestore } from './useFirestore';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Motion } from '@capacitor/motion';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useMisiones = (usuarioId) => {
  const { datos: usuarioDoc, actualizar } = useFirestore('usuarios');
  const [puntos, setPuntos] = useState(0);
  const [misiones, setMisiones] = useState([
    { id: 1, nombre: 'Evidencia', descripcion: 'Tomar una foto con la cámara', completada: false, puntos: 50 },
    { id: 2, nombre: 'Movimiento Real', descripcion: 'Moverse 30 metros de tu posición', completada: false, puntos: 100 },
    { id: 3, nombre: 'Permanencia Activa', descripcion: 'Estar quieto 10 segundos', completada: false, puntos: 150 }
  ]);

  useEffect(() => {
    if (usuarioDoc && usuarioDoc.length > 0) {
      const user = usuarioDoc.find(u => u.id === usuarioId);
      if (user) {
        if (user.puntos !== undefined) setPuntos(user.puntos);
        if (user.misiones) setMisiones(user.misiones);
      }
    }

    const localData = localStorage.getItem(`progreso_${usuarioId}`);
    if (localData) {
      const parsed = JSON.parse(localData);
      setPuntos(parsed.puntos);
      setMisiones(parsed.misiones);
    }
  }, [usuarioDoc, usuarioId]);

  const guardarProgreso = async (nuevasMisiones, nuevosPuntos) => {
    const data = { puntos: nuevosPuntos, misiones: nuevasMisiones };

    localStorage.setItem(`progreso_${usuarioId}`, JSON.stringify(data));

    await actualizar(usuarioId, data);
  };

  const completarMision = async (id) => {
    const nuevasMisiones = misiones.map(m => {
      if (m.id === id && !m.completada) {
        Haptics.impact({ style: ImpactStyle.Heavy });
        LocalNotifications.schedule({
          notifications: [{ title: '¡Misión Completada!', body: `Has ganado ${m.puntos} puntos`, id: id }]
        });
        return { ...m, completada: true };
      }
      return m;
    });

    const mision = misiones.find(m => m.id === id);
    if (mision && !mision.completada) {
      const nuevosPuntos = puntos + mision.puntos;
      setPuntos(nuevosPuntos);
      setMisiones(nuevasMisiones);
      await guardarProgreso(nuevasMisiones, nuevosPuntos);
    }
  };

  const tomarEvidencia = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });
      if (image) {
        await completarMision(1);
        return image.webPath;
      }
    } catch (error) {
      console.error('Error al tomar foto', error);
    }
  };

  const detectarQuieto = (callbackProgreso, callbackFinal) => {
    let tiempoInicio = null;
    const umbral = 1.0;

    const handleListener = async () => {
      const listener = await Motion.addListener('accel', (event) => {
        const { x, y, z } = event.acceleration;
        const movimiento = Math.sqrt(x * x + y * y + z * z);

        if (movimiento < umbral) {
          if (!tiempoInicio) tiempoInicio = Date.now();

          const tiempoTranscurrido = (Date.now() - tiempoInicio) / 1000;
          callbackProgreso(Math.min(tiempoTranscurrido / 10, 1));

          if (tiempoTranscurrido >= 10) {
            callbackFinal();
            completarMision(3);
            listener.remove();
          }
        } else {
          tiempoInicio = null; // Resetea si se mueve
          callbackProgreso(0);
        }
      });
      return listener;
    };

    const listenerPromise = handleListener();

    return () => {
      listenerPromise.then(l => l.remove());
    };
  };

  return { puntos, misiones, tomarEvidencia, completarMision, detectarQuieto };
};
