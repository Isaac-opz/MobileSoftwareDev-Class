import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonButton } from '@ionic/react';
import { add, create, trash, logOut } from 'ionicons/icons';
import { useTasksContext } from '../context/TasksContext';
import { useAuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const TasksPage: React.FC = () => {
  const { tareas, eliminarTarea } = useTasksContext();
  const { logout } = useAuthContext();
  const history = useHistory();

  const manejarLogout = async () => {
    try {
      await logout();
      history.push('/login');
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mis Tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={manejarLogout}>
              <IonIcon slot="icon-only" icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {tareas.length === 0 && (
            <IonItem>
              <IonLabel className="ion-text-center">No hay tareas creadas.</IonLabel>
            </IonItem>
          )}
          {tareas.map(tarea => (
            <IonItemSliding key={tarea.id}>
              <IonItem button onClick={() => history.push(`/tasks/${tarea.id}/detail`)}>
                <IonLabel>
                  <h2>{tarea.titulo}</h2>
                  <p>{tarea.descripcion}</p>
                </IonLabel>
              </IonItem>

              <IonItemOptions side="end">
                <IonItemOption color="primary" onClick={() => history.push(`/tasks/${tarea.id}/edit`)}>
                  <IonIcon slot="icon-only" icon={create} />
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => eliminarTarea(tarea.id)}>
                  <IonIcon slot="icon-only" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/tasks/new')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default TasksPage;
