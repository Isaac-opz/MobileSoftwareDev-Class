import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/react';
import TaskForm from '../components/TaskForm';
import TaskItem, { Task } from '../components/TaskItem';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false
    };
    // Update state without mutating it directly
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (id: number) => {
    // Update state using map to find the specific task and toggle its completed status
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    }));
  };

  const handleDeleteTask = (id: number) => {
    // Remove the task from the array using filter
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Task Manager</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <TaskForm onAddTask={handleAddTask} />
        <IonList>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
