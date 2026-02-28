import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState, useEffect } from "react";

interface Contact {
    id: string;
    name: string;
    phone: string;
}

const Home: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Contacts</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {contacts.map((contact) => (
                        <IonItem key={contact.id} routerLink={`/detail/${contact.id}`}>
                            <IonLabel>
                                <h2>{contact.name}</h2>
                                <p>{contact.phone}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <div className="ion-padding">
                    <IonButton expand="block" routerLink="/create">
                        <IonIcon icon={add} slot="start" />
                        Create Contact
                    </IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Home;
