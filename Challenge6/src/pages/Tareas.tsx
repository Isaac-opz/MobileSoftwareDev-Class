import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonItemSliding, 
  IonItemOption, 
  IonItemOptions, 
  IonFab, 
  IonFabButton, 
  IonIcon,
  IonAlert,
  IonCheckbox
} from '@ionic/react';
import { add, create, trash } from 'ionicons/icons';
import { useRealtime } from '../hooks/useRealtime';
import { useNetwork } from '../hooks/useNetwork';

const Tareas = () => {
  const { datos, agregar, actualizar, eliminar } = useRealtime('tareas');
  const { isOnline } = useNetwork();
  
  const [mostrarAlertaAgregar, setMostrarAlertaAgregar] = useState(false);
  const [mostrarAlertaEditar, setMostrarAlertaEditar] = useState(false);
  const [tareaAEditar, setTareaAEditar] = useState(null);

  const manejarAgregar = (data) => {
    agregar({ titulo: data.titulo, completado: false });
  };

  const manejarEditar = (data) => {
    if (tareaAEditar) {
      actualizar(tareaAEditar.id, { titulo: data.titulo, completado: tareaAEditar.completado });
      setTareaAEditar(null);
    }
  };

  const toggleCompletado = (tarea) => {
    if (isOnline) {
      actualizar(tarea.id, { titulo: tarea.titulo, completado: !tarea.completado });
    }
  };

  const abrirEditar = (tarea) => {
    setTareaAEditar(tarea);
    setMostrarAlertaEditar(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas {isOnline ? '' : '(Sin Conexión)'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {datos.map((tarea) => (
            <IonItemSliding key={tarea.id}>
              <IonItem>
                <IonCheckbox 
                  slot="start" 
                  checked={tarea.completado} 
                  onIonChange={() => toggleCompletado(tarea)}
                  disabled={!isOnline}
                />
                <IonLabel style={{ textDecoration: tarea.completado ? 'line-through' : 'none' }}>
                  <h2>{tarea.titulo}</h2>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption 
                  color="primary" 
                  onClick={() => abrirEditar(tarea)}
                  disabled={!isOnline}
                >
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
                <IonItemOption 
                  color="danger" 
                  onClick={() => eliminar(tarea.id)}
                  disabled={!isOnline}
                >
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setMostrarAlertaAgregar(true)} disabled={!isOnline}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={mostrarAlertaAgregar}
          onDidDismiss={() => setMostrarAlertaAgregar(false)}
          header="Nueva Tarea"
          inputs={[
            { name: 'titulo', type: 'text', placeholder: 'Título de la tarea' },
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Guardar', handler: manejarAgregar }
          ]}
        />

        <IonAlert
          isOpen={mostrarAlertaEditar}
          onDidDismiss={() => setMostrarAlertaEditar(false)}
          header="Editar Tarea"
          inputs={[
            { name: 'titulo', type: 'text', placeholder: 'Título', value: tareaAEditar?.titulo },
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Actualizar', handler: manejarEditar }
          ]}
        />

      </IonContent>
    </IonPage>
  );
};

export default Tareas;
