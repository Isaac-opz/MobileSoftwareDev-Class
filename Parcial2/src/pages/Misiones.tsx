import React, { useState, useEffect, useContext } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonProgressBar, IonCard, IonCardContent, IonBadge,
  IonGrid, IonRow, IonCol, IonText, IonToast
} from '@ionic/react';
import { camera, walk, timer, trophy, location } from 'ionicons/icons';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AuthContext } from '../contexts/AuthContext';
import { useMisiones } from '../hooks/useMisiones';
import { useGeolocation } from '../hooks/useGeolocation';
import { useNetwork } from '../hooks/useNetwork';
import { useFirestore } from '../hooks/useFirestore';

const Misiones: React.FC = () => {
  const { usuario } = useContext(AuthContext) as any;
  const { isOnline } = useNetwork();
  const { datos: todosLosUsuarios } = useFirestore('usuarios');
  const { datos: usuariosRanking } = useFirestore('ranking');
  const { puntos, misiones, tomarEvidencia, completarMision, detectarQuieto } = useMisiones(usuario?.uid);
  const { posicion, obtenerPosicionActual, calcularDistancia } = useGeolocation();

  const [posicionInicial, setPosicionInicial] = useState<any>(null);
  const [distanciaRecorrida, setDistanciaRecorrida] = useState(0);
  const [progresoQuieto, setProgresoQuieto] = useState(0);
  const [mensajeToast, setMensajeToast] = useState('');

  const [rankingReal, setRankingReal] = useState<any[]>([]);

  useEffect(() => {
    const usuariosReales = todosLosUsuarios || [];
    const usuariosFake = usuariosRanking || [];

    const todos = [...usuariosReales, ...usuariosFake];

    if (todos.length > 0) {
      const listaOrdenada = todos
        .map(u => {
          let nombreAMostrar = 'Desconocido';
          if (u.email) {
            nombreAMostrar = u.email.split('@')[0];
          } else if (u.nombre) {
            nombreAMostrar = u.nombre;
          }
          return {
            nombre: nombreAMostrar,
            puntos: u.puntos || 0,
            resaltado: u.id === usuario?.uid
          };
        })
        .sort((a, b) => b.puntos - a.puntos)
        .slice(0, 5);

      setRankingReal(listaOrdenada);
    }
  }, [todosLosUsuarios, usuariosRanking, usuario, puntos]);

  const iniciarMisionMovimiento = async () => {
    try {
      const pos = await obtenerPosicionActual();
      if (pos) {
        setPosicionInicial(pos);
        setMensajeToast('Posición inicial fijada. Muévete 30 metros.');
      } else {
        setMensajeToast('Error: No se pudo obtener el GPS. Verifica los permisos.');
      }
    } catch (e) {
      setMensajeToast('Error al iniciar GPS');
    }
  };

  useEffect(() => {
    if (posicionInicial && posicion && !misiones[1].completada) {
      const d = calcularDistancia(
        posicionInicial.latitude, posicionInicial.longitude,
        posicion.latitude, posicion.longitude
      );
      setDistanciaRecorrida(d);
      if (d >= 30) {
        completarMision(2);
        setMensajeToast('¡Misión de movimiento completada!');
      }
    }
  }, [posicion, posicionInicial]);

  const iniciarMisionQuieto = () => {
    detectarQuieto(
      (progreso) => setProgresoQuieto(progreso),
      () => setMensajeToast('¡Misión de permanencia completada!')
    );
  };

  const progresoTotal = misiones.filter(m => m.completada).length / misiones.length;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={isOnline ? 'primary' : 'danger'}>
          <IonTitle>Mis Misiones {!isOnline && '(Offline)'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonText color="primary">
                    <h2>Puntos: {puntos} <IonIcon icon={trophy} /></h2>
                  </IonText>
                </IonCol>
                <IonCol className="ion-text-right">
                  <IonBadge color="success">{Math.round(progresoTotal * 100)}% Completado</IonBadge>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonProgressBar value={progresoTotal} color="success"></IonProgressBar>
          </IonCardContent>
        </IonCard>

        <IonList>
          <IonItem lines="full">
            <IonIcon icon={camera} slot="start" />
            <IonLabel>
              <h2>{misiones[0].nombre}</h2>
              <p>{misiones[0].descripcion}</p>
            </IonLabel>
            <IonButton
              slot="end"
              disabled={misiones[0].completada}
              onClick={tomarEvidencia}
            >
              {misiones[0].completada ? 'Listo' : 'Hacer'}
            </IonButton>
          </IonItem>

          <IonItem lines="full">
            <IonIcon icon={walk} slot="start" />
            <IonLabel>
              <h2>{misiones[1].nombre}</h2>
              <p>{misiones[1].descripcion} ({Math.round(distanciaRecorrida)}m / 30m)</p>
            </IonLabel>
            <IonButton
              slot="end"
              disabled={misiones[1].completada || !!posicionInicial}
              onClick={iniciarMisionMovimiento}
            >
              {misiones[1].completada ? 'Listo' : (posicionInicial ? 'En marcha...' : 'Iniciar')}
            </IonButton>
          </IonItem>

          <IonItem lines="none">
            <IonIcon icon={timer} slot="start" />
            <IonLabel>
              <h2>{misiones[2].nombre}</h2>
              <p>{misiones[2].descripcion}</p>
              {progresoQuieto > 0 && <IonProgressBar value={progresoQuieto} color="warning" />}
            </IonLabel>
            <IonButton
              slot="end"
              disabled={misiones[2].completada || progresoQuieto > 0}
              onClick={iniciarMisionQuieto}
            >
              {misiones[2].completada ? 'Listo' : 'Iniciar'}
            </IonButton>
          </IonItem>
        </IonList>

        {posicion && (
          <div style={{ height: '200px', margin: '16px', borderRadius: '8px', overflow: 'hidden' }}>
            <MapContainer center={[(posicion as any).latitude, (posicion as any).longitude]} zoom={17} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[(posicion as any).latitude, (posicion as any).longitude]}>
                <Popup>Estás aquí</Popup>
              </Marker>
              {posicionInicial && (
                <>
                  <Marker position={[(posicionInicial as any).latitude, (posicionInicial as any).longitude]} />
                  <Polyline positions={[
                    [(posicionInicial as any).latitude, (posicionInicial as any).longitude],
                    [(posicion as any).latitude, (posicion as any).longitude]
                  ]} color="red" />
                </>
              )}
            </MapContainer>
          </div>
        )}

        <IonCard>
          <IonHeader>
            <IonToolbar>
              <IonTitle size="small">Ranking Global</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {rankingReal.map((r, i) => (
              <IonItem key={i} color={r.resaltado ? 'primary' : ''}>
                <IonLabel>{i + 1}. {r.nombre}</IonLabel>
                <IonBadge slot="end">{r.puntos} pts</IonBadge>
              </IonItem>
            ))}
          </IonList>
        </IonCard>

        <IonToast
          isOpen={!!mensajeToast}
          message={mensajeToast}
          duration={2000}
          onDidDismiss={() => setMensajeToast('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Misiones;
