import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButtons, IonBackButton } from '@ionic/react';
import { useTasksContext, Tarea } from '../context/TasksContext';
import { useParams, useHistory } from 'react-router-dom';

const TaskDetailPage: React.FC = () => {
  const { tareas } = useTasksContext();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [tarea, setTarea] = useState<Tarea | null>(null);

  useEffect(() => {
    const tareaEncontrada = tareas.find(t => t.id === id);
    if (tareaEncontrada) {
      setTarea(tareaEncontrada);
    } else {
      history.replace('/tasks');
    }
  }, [id, tareas, history]);

  if (!tarea) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tasks" />
          </IonButtons>
          <IonTitle>Detalle de Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{tarea.titulo}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {tarea.descripcion ? tarea.descripcion : 'Sin descripción.'}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default TaskDetailPage;
