import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";

const Create: React.FC = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();

    const saveContact = () => {
        if (!name.trim() || !phone.trim()) return;

        const newContact = { id: Date.now().toString(), name, phone };
        const savedContactsStr = localStorage.getItem('contacts');
        const savedContacts = savedContactsStr ? JSON.parse(savedContactsStr) : [];
        savedContacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(savedContacts));
        history.push('/home');
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Add Contact</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem>
                    <IonLabel position="stacked">Name</IonLabel>
                    <IonInput value={name} onIonChange={e => setName(e.detail.value!)} />
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Phone</IonLabel>
                    <IonInput type="tel" value={phone} onIonChange={e => setPhone(e.detail.value!)} />
                </IonItem>
                <IonButton expand="block" className="ion-margin-top" onClick={saveContact}>
                    Save
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Create;
