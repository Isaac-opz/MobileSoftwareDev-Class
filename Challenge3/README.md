# Challenge 03 - Task Manager App en Ionic

**Clase de Desarrollo de Software para Plataformas Móviles**

**Autor:** Isaac Piedrahita

---

Aplicación de gestión de tareas construida con **Ionic React** que demuestra la comunicación entre componentes Padre-Hijo y el manejo inmutable del estado mediante hooks de React.

## Características Implementadas

- Arquitectura basada en **3 componentes** con comunicación Padre-Hijo (`Home`, `TaskForm`, `TaskItem`).
- Visualización de la lista de tareas.
- Agregar nuevas tareas.
- Marcar tareas como completadas.
- Eliminar tareas.
- Interfaz construida con componentes de **Ionic UI** (`IonPage`, `IonHeader`, `IonContent`, `IonList`, `IonItem`, `IonInput`, `IonButton`).

## Conceptos Clave Aplicados

### Inmutabilidad del Estado

El estado nunca se muta directamente. Se utilizan las siguientes técnicas para crear copias nuevas del arreglo:

- **Spread operator** `[...tasks, newTask]` para agregar tareas.
- **`.filter()`** para eliminar tareas.
- **`.map()`** con spread de objeto `{ ...task, completed: !task.completed }` para alternar el estado de completado.

### Comunicación Padre-Hijo

El componente padre `Home` centraliza todo el estado y pasa funciones como `onAddTask`, `onDelete` y `onToggleComplete` como **props** a los componentes hijos, quienes las ejecutan sin modificar el estado directamente.

## Estructura del Proyecto

```
src/
├── pages/
│   └── Home.tsx          # Componente padre – maneja el estado
├── components/
│   ├── TaskForm.tsx      # Formulario para agregar tareas
│   └── TaskItem.tsx      # Renderiza una tarea individual
└── App.tsx               # Configuración de rutas
```

## Ejecución Local

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor de desarrollo:
   ```bash
   ionic serve
   ```
3. La aplicación se abrirá automáticamente en el navegador en `http://localhost:8100`.
