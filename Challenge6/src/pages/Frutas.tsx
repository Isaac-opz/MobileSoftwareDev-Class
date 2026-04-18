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
  IonAlert
} from '@ionic/react';
import { add, create, trash } from 'ionicons/icons';
import { useDexie } from '../hooks/useDexie';

const Frutas = () => {
  const { datos, agregar, actualizar, eliminar } = useDexie('frutas');
  
  const [mostrarAlertaAgregar, setMostrarAlertaAgregar] = useState(false);
  const [mostrarAlertaEditar, setMostrarAlertaEditar] = useState(false);
  const [frutaAEditar, setFrutaAEditar] = useState(null);

  const manejarAgregar = (data) => {
    agregar({ nombre: data.nombre, precio: parseFloat(data.precio) || 0 });
  };

  const manejarEditar = (data) => {
    if (frutaAEditar) {
      actualizar(frutaAEditar.id, { nombre: data.nombre, precio: parseFloat(data.precio) || 0 });
      setFrutaAEditar(null);
    }
  };

  const abrirEditar = (fruta) => {
    setFrutaAEditar(fruta);
    setMostrarAlertaEditar(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Frutas (Local)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {datos.map((fruta) => (
            <IonItemSliding key={fruta.id}>
              <IonItem>
                <IonLabel>
                  <h2>{fruta.nombre}</h2>
                  <p>${fruta.precio}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption 
                  color="primary" 
                  onClick={() => abrirEditar(fruta)}
                >
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
                <IonItemOption 
                  color="danger" 
                  onClick={() => eliminar(fruta.id)}
                >
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setMostrarAlertaAgregar(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        <IonAlert
          isOpen={mostrarAlertaAgregar}
          onDidDismiss={() => setMostrarAlertaAgregar(false)}
          header="Nueva Fruta"
          inputs={[
            { name: 'nombre', type: 'text', placeholder: 'Nombre de la fruta' },
            { name: 'precio', type: 'number', placeholder: 'Precio' }
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Guardar', handler: manejarAgregar }
          ]}
        />

        <IonAlert
          isOpen={mostrarAlertaEditar}
          onDidDismiss={() => setMostrarAlertaEditar(false)}
          header="Editar Fruta"
          inputs={[
            { name: 'nombre', type: 'text', placeholder: 'Nombre', value: frutaAEditar?.nombre },
            { name: 'precio', type: 'number', placeholder: 'Precio', value: frutaAEditar?.precio }
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

export default Frutas;
