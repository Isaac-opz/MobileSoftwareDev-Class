import React from 'react';
import { IonItem, IonButton } from '@ionic/react';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskItemProps {
    task: Task;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onToggleComplete }) => {
    return (
        <IonItem>
            <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                <span
                    style={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'gray' : 'inherit',
                        flex: 1,
                        paddingRight: '8px',
                        fontSize: '16px'
                    }}
                >
                    {task.text}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <IonButton
                        color={task.completed ? "medium" : "success"}
                        onClick={() => onToggleComplete(task.id)}
                    >
                        {task.completed ? "Undo" : "Complete"}
                    </IonButton>
                    <IonButton
                        color="danger"
                        onClick={() => onDelete(task.id)}
                    >
                        Delete
                    </IonButton>
                </div>
            </div>
        </IonItem>
    );
};

export default TaskItem;
