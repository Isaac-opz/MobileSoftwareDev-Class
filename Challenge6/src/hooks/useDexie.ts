import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/dexieConfig';

export const useDexie = (tablaNombre) => {
  // Nos suscribimos a los cambios de la tabla
  const datos = useLiveQuery(() => db[tablaNombre].toArray(), [tablaNombre]) || [];

  const agregar = async (nuevoItem) => {
    try {
      await db[tablaNombre].add(nuevoItem);
    } catch (err) {
      console.error(err);
    }
  };

  const actualizar = async (id, camposActualizados) => {
    try {
      await db[tablaNombre].update(id, camposActualizados);
    } catch (err) {
      console.error(err);
    }
  };

  const eliminar = async (id) => {
    try {
      await db[tablaNombre].delete(id);
    } catch (err) {
      console.error(err);
    }
  };

  return { datos, agregar, actualizar, eliminar };
};
