import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { auth } from '../firebase/config';

export const useFirebaseAuth = () => {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const desuscribir = onAuthStateChanged(auth, (usr) => {
      setUsuario(usr);
      setCargando(false);
    });
    return () => desuscribir();
  }, []);

  const login = (correo: string, contrasena: string) => {
    return signInWithEmailAndPassword(auth, correo, contrasena);
  };

  const register = (correo: string, contrasena: string) => {
    return createUserWithEmailAndPassword(auth, correo, contrasena);
  };

  const logout = () => {
    return signOut(auth);
  };

  return { usuario, cargando, login, register, logout };
};
