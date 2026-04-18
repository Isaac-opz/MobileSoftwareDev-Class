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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { iniciarSesion, usuario } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (usuario) {
      history.replace('/contactos');
    }
  }, [usuario, history]);

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      await iniciarSesion(email, password);
    } catch (err) {
      setErrorMsg('Error al iniciar sesión: ' + err.message);
      setShowToast(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={manejarLogin}>
          <IonItem>
            <IonLabel position="floating">Correo Electrónico</IonLabel>
            <IonInput 
              type="email" 
              value={email} 
              onIonChange={e => setEmail(e.detail.value)} 
              required 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Contraseña</IonLabel>
            <IonInput 
              type="password" 
              value={password} 
              onIonChange={e => setPassword(e.detail.value)} 
              required 
            />
          </IonItem>
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Entrar
          </IonButton>
        </form>

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
