import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonReorderGroup,
  IonReorder,
  IonAlert
} from '@ionic/react'

interface VisitasPageProps {
  visitas: any[]
  setVisitas: (v: any[]) => void
}

const VisitasPage: React.FC<VisitasPageProps> = ({ visitas, setVisitas }) => {
  const [filtro, setFiltro] = useState('Todas')
  const [alertaCancelacion, setAlertaCancelacion] = useState<any>(null)
  const historia = useHistory()

  const visitasFiltradas = visitas.filter((v) => {
    if (filtro === 'Todas') return true
    if (filtro === 'Pendientes') return v.estado === 'pendiente'
    if (filtro === 'En curso') return v.estado === 'en curso'
    if (filtro === 'Finalizadas') return v.estado === 'finalizada'
    return true
  })

  function cambiarEstado(id: number, nuevoEstado: string) {
    setVisitas(visitas.map((v) => (v.id === id ? { ...v, estado: nuevoEstado } : v)))
  }

  function manejarReorder(evento: any) {
    const copia = [...visitas]
    const nuevaLista = evento.detail.complete(copia)
    setVisitas(nuevaLista)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Visitas</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={filtro} onIonChange={(e) => setFiltro(e.detail.value as string)}>
            <IonSegmentButton value="Todas">
              <IonLabel>Todas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Pendientes">
              <IonLabel>Pendientes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="En curso">
              <IonLabel>En curso</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Finalizadas">
              <IonLabel>Finalizadas</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonReorderGroup disabled={false} onIonItemReorder={manejarReorder}>
            {visitasFiltradas.map((visita) => (
              <IonItemSliding key={visita.id}>
                <IonItemOptions side="start">
                  <IonItemOption color="primary" onClick={() => cambiarEstado(visita.id, 'en curso')}>
                    En camino
                  </IonItemOption>
                  <IonItemOption color="danger" onClick={() => setAlertaCancelacion(visita.id)}>
                    Cancelar
                  </IonItemOption>
                </IonItemOptions>

                <IonItem>
                  <IonLabel>
                    <h2>{visita.paciente}</h2>
                    <p>Estado: {visita.estado}</p>
                    {visita.motivo && <p>Motivo: {visita.motivo}</p>}
                  </IonLabel>
                  <IonReorder slot="end" />
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption color="secondary" onClick={() => historia.push('/visitas/' + visita.id)}>
                    Ver detalle
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonReorderGroup>
        </IonList>

        <IonAlert
          isOpen={alertaCancelacion !== null}
          header="Cancelar visita"
          message="Escribe el motivo de la cancelacion"
          inputs={[
            {
              name: 'motivo',
              type: 'text',
              placeholder: 'Motivo de cancelacion'
            }
          ]}
          buttons={[
            {
              text: 'Volver',
              role: 'cancel',
              handler: () => setAlertaCancelacion(null)
            },
            {
              text: 'Guardar',
              handler: (datos) => {
                setVisitas(
                  visitas.map((v) =>
                    v.id === alertaCancelacion
                      ? { ...v, estado: 'cancelada', motivo: datos.motivo }
                      : v
                  )
                )
                setAlertaCancelacion(null)
              }
            }
          ]}
          onDidDismiss={() => setAlertaCancelacion(null)}
        />
      </IonContent>
    </IonPage>
  )
}

export default VisitasPage
