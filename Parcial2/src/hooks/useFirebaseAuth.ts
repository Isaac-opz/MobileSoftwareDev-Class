import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';

export const useFirebaseAuth = () => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  const iniciarSesion = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registrar = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const cerrarSesion = async () => {
    return signOut(auth);
  };

  return { usuario, cargando, iniciarSesion, registrar, cerrarSesion };
};
