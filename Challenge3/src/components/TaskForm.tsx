import React, { useState } from 'react';
import { IonButton, IonInput } from '@ionic/react';

interface TaskFormProps {
    onAddTask: (text: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.trim().length > 0) {
            onAddTask(text);
            setText('');
        }
    };

    return (
        <div style={{ padding: '16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <IonInput
                value={text}
                onIonInput={(e) => setText(e.detail.value ?? '')}
                placeholder="Enter new task..."
                style={{ flex: 1 }}
            />
            <IonButton onClick={handleAdd}>Add Task</IonButton>
        </div>
    );
};

export default TaskForm;
