import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, IonButtons, IonBackButton } from '@ionic/react';
import { useTasksContext } from '../context/TasksContext';
import { useHistory, useParams } from 'react-router-dom';

const TaskFormPage: React.FC = () => {
  const { tareas, agregarTarea, editarTarea } = useTasksContext();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const esEdicion = !!id && id !== 'new';

  useEffect(() => {
    if (esEdicion) {
      const tareaEncontrada = tareas.find(t => t.id === id);
      if (tareaEncontrada) {
        setTitulo(tareaEncontrada.titulo);
        setDescripcion(tareaEncontrada.descripcion);
      } else {
        history.replace('/tasks');
      }
    }
  }, [id, tareas, esEdicion, history]);

  const guardarTarea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    if (esEdicion) {
      editarTarea(id, { titulo, descripcion });
    } else {
      agregarTarea({ titulo, descripcion, completada: false });
    }
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>{esEdicion ? 'Editar Tarea' : 'Nueva Tarea'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={guardarTarea}>
          <IonItem>
            <IonLabel position="floating">Título de la Tarea</IonLabel>
            <IonInput 
              value={titulo} 
              onIonChange={e => setTitulo(e.detail.value!)} 
              required 
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Descripción</IonLabel>
            <IonTextarea 
              value={descripcion} 
              onIonChange={e => setDescripcion(e.detail.value!)} 
            />
          </IonItem>

          <IonButton expand="block" type="submit" className="ion-margin-top" color="success">
            {esEdicion ? 'Actualizar' : 'Guardar'}
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default TaskFormPage;
