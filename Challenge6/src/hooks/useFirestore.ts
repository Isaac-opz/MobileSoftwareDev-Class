import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export const useFirestore = (coleccionNombre) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    // Capturamos posibles fallos si la DB no está lista
    try {
      const collectionRef = collection(db, coleccionNombre);
      const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        setDatos(docs);
      });
      return () => unsubscribe();
    } catch (e) {
      console.log('Firebase posiblemente no esté configurado aún.');
    }
  }, [coleccionNombre]);

  const agregar = async (nuevoItem) => {
    try {
      await addDoc(collection(db, coleccionNombre), nuevoItem);
    } catch (err) {
      console.error(err);
    }
  };

  const actualizar = async (id, camposActualizados) => {
    try {
      const docRef = doc(db, coleccionNombre, id);
      await updateDoc(docRef, camposActualizados);
    } catch (err) {
      console.error(err);
    }
  };

  const eliminar = async (id) => {
    try {
      const docRef = doc(db, coleccionNombre, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error(err);
    }
  };

  return { datos, agregar, actualizar, eliminar };
};
