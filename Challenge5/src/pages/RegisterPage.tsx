import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonLoading, useIonToast, IonButtons, IonBackButton } from '@ionic/react';
import { useAuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const { register } = useAuthContext();
  const history = useHistory();
  const [presentToast] = useIonToast();

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!correo || !contrasena) return;

    setMostrarCarga(true);
    try {
      await register(correo, contrasena);
      presentToast({
        message: '¡Cuenta creada exitosamente!',
        duration: 2000,
        color: 'success'
      });
      history.push('/tasks');
    } catch (error: any) {
      presentToast({
        message: 'Error al registrarse: ' + error.message,
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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>Registrarse</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={manejarRegistro}>
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

          <IonButton expand="block" type="submit" className="ion-margin-top" color="secondary">
            Crear Cuenta
          </IonButton>
        </form>

        <IonLoading isOpen={mostrarCarga} message="Creando cuenta..." />
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
