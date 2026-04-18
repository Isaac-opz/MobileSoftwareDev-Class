import { useState, useEffect } from 'react';
import { realtimeDb } from '../firebase/config';
import { ref, onValue, push, set, remove } from 'firebase/database';

export const useRealtime = (rutaRuta) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    try {
      const dbRef = ref(realtimeDb, rutaRuta);
      const unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        const docs = [];
        if (data) {
          for (let id in data) {
            docs.push({ id, ...data[id] });
          }
        }
        setDatos(docs);
      });
      
      // Limpiamos la suscripción
      return () => unsubscribe();
    } catch (e) {
      console.log('Firebase posiblemente no esté configurado aún.');
    }
  }, [rutaRuta]);

  const agregar = async (nuevoItem) => {
    try {
      const dbRef = ref(realtimeDb, rutaRuta);
      await push(dbRef, nuevoItem);
    } catch (err) {
      console.error(err);
    }
  };

  const actualizar = async (id, camposActualizados) => {
    try {
      // Necesita obtener los datos existentes y fusionarlos si es necesario
      // O simplemente usar set para sobreescribir
      const itemRef = ref(realtimeDb, `${rutaRuta}/${id}`);
      await set(itemRef, camposActualizados);
    } catch (err) {
      console.error(err);
    }
  };

  const eliminar = async (id) => {
    try {
      const itemRef = ref(realtimeDb, `${rutaRuta}/${id}`);
      await remove(itemRef);
    } catch (err) {
      console.error(err);
    }
  };

  return { datos, agregar, actualizar, eliminar };
};
