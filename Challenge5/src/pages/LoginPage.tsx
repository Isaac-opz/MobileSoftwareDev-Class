import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonLoading, useIonToast } from '@ionic/react';
import { useAuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const { login } = useAuthContext();
  const history = useHistory();
  const [presentToast] = useIonToast();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo || !contrasena) return;
    
    setMostrarCarga(true);
    try {
      await login(correo, contrasena);
      history.push('/tasks');
    } catch (error: any) {
      presentToast({
        message: 'Error al iniciar sesión: ' + error.message,
        duration: 3000,
        color: 'danger'
      });
    } finally {
      setMostrarCarga(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={manejarLogin}>
          <IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput 
              type="email" 
              value={correo} 
              onIonChange={e => setCorreo(e.detail.value!)} 
              required 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput 
              type="password" 
              value={contrasena} 
              onIonChange={e => setContrasena(e.detail.value!)} 
              required 
            />
          </IonItem>

          <IonButton expand="block" type="submit" className="ion-margin-top">
            Entrar
          </IonButton>
        </form>

        <div className="ion-text-center ion-margin-top">
          <IonText>¿No tienes cuenta?</IonText>
          <IonButton fill="clear" onClick={() => history.push('/register')}>
            Regístrate aquí
          </IonButton>
        </div>

        <IonLoading isOpen={mostrarCarga} message="Iniciando sesión..." />
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
