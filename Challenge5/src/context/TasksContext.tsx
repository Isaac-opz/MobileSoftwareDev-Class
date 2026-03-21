import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion: string;
  completada: boolean;
}

interface TasksContextType {
  tareas: Tarea[];
  agregarTarea: (tarea: Omit<Tarea, 'id'>) => void;
  editarTarea: (id: string, tareaActualizada: Partial<Tarea>) => void;
  eliminarTarea: (id: string) => void;
}

const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tareas, setTareas] = useState<Tarea[]>(() => {
    const tareasGuardadas = localStorage.getItem('challenge5_tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem('challenge5_tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (tarea: Omit<Tarea, 'id'>) => {
    const nuevaTarea: Tarea = {
      ...tarea,
      id: Date.now().toString()
    };
    setTareas([...tareas, nuevaTarea]);
  };

  const editarTarea = (id: string, tareaActualizada: Partial<Tarea>) => {
    setTareas(tareas.map(t => (t.id === id ? { ...t, ...tareaActualizada } : t)));
  };

  const eliminarTarea = (id: string) => {
    setTareas(tareas.filter(t => t.id !== id));
  };

  return (
    <TasksContext.Provider value={{ tareas, agregarTarea, editarTarea, eliminarTarea }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => useContext(TasksContext);
