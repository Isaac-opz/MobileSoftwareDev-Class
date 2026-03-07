import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonToast,
  IonLoading,
  IonItem,
  IonLabel
} from '@ionic/react'

const LoginPage: React.FC = () => {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mostrarClave, setMostrarClave] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [errorToast, setErrorToast] = useState(false)
  const historia = useHistory()

  function manejarLogin() {
    setCargando(true)

    setTimeout(() => {
      setCargando(false)

      if (correo === 'medico@medicare.com' && contrasena === '123') {
        const datos = { email: 'medico@medicare.com', rol: 'medico' }
        localStorage.setItem('usuario_medico', JSON.stringify(datos))
        historia.push('/visitas')
      } else {
        setErrorToast(true)
      }
    }, 1500)
  }

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '400px', margin: '80px auto' }}>
          <h2>MediCare+ Visitas</h2>
          <p>Inicia sesion como medico</p>

          <IonItem>
            <IonLabel position="stacked">Correo electronico</IonLabel>
            <IonInput
              type="email"
              value={correo}
              onIonInput={(e: any) => setCorreo(e.target.value || '')}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput
              type={mostrarClave ? 'text' : 'password'}
              value={contrasena}
              onIonInput={(e: any) => setContrasena(e.target.value || '')}
            />
          </IonItem>

          <IonButton
            fill="clear"
            size="small"
            onClick={() => setMostrarClave(!mostrarClave)}
          >
            {mostrarClave ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </IonButton>

          <br />

          <IonButton expand="block" onClick={manejarLogin}>
            Ingresar
          </IonButton>
        </div>

        <IonLoading
          isOpen={cargando}
          message="Verificando credenciales..."
        />

        <IonToast
          isOpen={errorToast}
          message="Correo o contraseña incorrectos"
          duration={2000}
          onDidDismiss={() => setErrorToast(false)}
          color="danger"
        />
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
