import { useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  IonPage,
  IonContent,
  IonAvatar,
  IonImg,
  IonButton
} from '@ionic/react'

const PerfilMedicoPage: React.FC = () => {
  const [usuario, setUsuario] = useState<any>(null)
  const historia = useHistory()

  useEffect(() => {
    const guardado = localStorage.getItem('usuario_medico')
    if (guardado) {
      setUsuario(JSON.parse(guardado))
    }
  }, [])

  function cerrarSesion() {
    localStorage.removeItem('usuario_medico')
    historia.push('/login')
  }

  if (!usuario) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Cargando perfil...</p>
        </IonContent>
      </IonPage>
    )
  }

  const letra = usuario.email.charAt(0).toUpperCase()

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <IonAvatar style={{ margin: '0 auto', width: '80px', height: '80px' }}>
            {usuario.foto ? (
              <IonImg src={usuario.foto} alt="avatar" />
            ) : (
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#0C2340',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: 'bold'
                }}
              >
                {letra}
              </div>
            )}
          </IonAvatar>

          <h2>{usuario.email}</h2>
          <p>Rol: {usuario.rol}</p>

          <IonButton expand="block" color="danger" onClick={cerrarSesion}>
            Cerrar Sesion
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default PerfilMedicoPage
