import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useFirestore } from '../hooks/useFirestore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [esRegistro, setEsRegistro] = useState(false);
  const { iniciarSesion, registrar, usuario } = useContext(AuthContext) as any;
  const { actualizar } = useFirestore('usuarios');
  const history = useHistory();

  useEffect(() => {
    if (usuario) {
      history.replace('/misiones');
    }
  }, [usuario, history]);

  const manejarAutenticacion = async (e) => {
    e.preventDefault();
    try {
      if (esRegistro) {
        const res = await registrar(email, password);
        await actualizar(res.user.uid, {
          email: email,
          puntos: 0,
          misiones: [
            { id: 1, nombre: 'Evidencia', descripcion: 'Tomar una foto con la cámara', completada: false, puntos: 50 },
            { id: 2, nombre: 'Movimiento Real', descripcion: 'Moverse 30 metros de tu posición', completada: false, puntos: 100 },
            { id: 3, nombre: 'Permanencia Activa', descripcion: 'Estar quieto 10 segundos', completada: false, puntos: 150 }
          ]
        });
      } else {
        await iniciarSesion(email, password);
      }
    } catch (err: any) {
      setErrorMsg('Error: ' + err.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{esRegistro ? 'Crear Cuenta' : 'Iniciar Sesión'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={manejarAutenticacion}>
          <IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={e => setEmail(e.detail.value!)}
              required
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={e => setPassword(e.detail.value!)}
              required
            />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            {esRegistro ? 'Registrarse' : 'Entrar'}
          </IonButton>
        </form>

        <IonButton expand="block" fill="clear" onClick={() => setEsRegistro(!esRegistro)}>
          {esRegistro ? '¿Ya tienes cuenta? Entra aquí' : '¿No tienes cuenta? Regístrate'}
        </IonButton>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={errorMsg}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
