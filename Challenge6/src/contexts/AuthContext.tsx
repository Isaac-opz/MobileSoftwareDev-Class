import React, { createContext, useContext, useEffect, useState } from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { usuario, cargando, iniciarSesion, registrar, cerrarSesion } = useFirebaseAuth();

  return (
    <AuthContext.Provider value={{ usuario, cargando, iniciarSesion, registrar, cerrarSesion }}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};
