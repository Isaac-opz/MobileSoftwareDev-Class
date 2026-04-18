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
import { useFirestore } from '../hooks/useFirestore';
import { useNetwork } from '../hooks/useNetwork';

const Contactos = () => {
  const { datos, agregar, actualizar, eliminar } = useFirestore('contactos');
  const { isOnline } = useNetwork();
  
  const [mostrarAlertaAgregar, setMostrarAlertaAgregar] = useState(false);
  const [mostrarAlertaEditar, setMostrarAlertaEditar] = useState(false);
  const [contactoAEditar, setContactoAEditar] = useState(null);

  const manejarAgregar = (data) => {
    agregar({ nombre: data.nombre, telefono: data.telefono });
  };

  const manejarEditar = (data) => {
    if (contactoAEditar) {
      actualizar(contactoAEditar.id, { nombre: data.nombre, telefono: data.telefono });
      setContactoAEditar(null);
    }
  };

  const abrirEditar = (contacto) => {
    setContactoAEditar(contacto);
    setMostrarAlertaEditar(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Contactos {isOnline ? '' : '(Sin Conexión)'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {datos.map((contacto) => (
            <IonItemSliding key={contacto.id}>
              <IonItem>
                <IonLabel>
                  <h2>{contacto.nombre}</h2>
                  <p>{contacto.telefono}</p>
                </IonLabel>
              </IonItem>
              <IonItemOptions side="end">
                <IonItemOption 
                  color="primary" 
                  onClick={() => abrirEditar(contacto)}
                  disabled={!isOnline}
                >
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
                <IonItemOption 
                  color="danger" 
                  onClick={() => eliminar(contacto.id)}
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

        {/* Alerta para Agregar */}
        <IonAlert
          isOpen={mostrarAlertaAgregar}
          onDidDismiss={() => setMostrarAlertaAgregar(false)}
          header="Nuevo Contacto"
          inputs={[
            { name: 'nombre', type: 'text', placeholder: 'Nombre' },
            { name: 'telefono', type: 'tel', placeholder: 'Teléfono' }
          ]}
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Guardar', handler: manejarAgregar }
          ]}
        />

        {/* Alerta para Editar */}
        <IonAlert
          isOpen={mostrarAlertaEditar}
          onDidDismiss={() => setMostrarAlertaEditar(false)}
          header="Editar Contacto"
          inputs={[
            { name: 'nombre', type: 'text', placeholder: 'Nombre', value: contactoAEditar?.nombre },
            { name: 'telefono', type: 'tel', placeholder: 'Teléfono', value: contactoAEditar?.telefono }
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

export default Contactos;
