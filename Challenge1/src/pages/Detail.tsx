import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonBackButton,
} from "@ionic/react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

interface Contact {
    id: string;
    name: string;
    phone: string;
}

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [contact, setContact] = useState<Contact | null>(null);

    useEffect(() => {
        const savedContactsStr = localStorage.getItem('contacts');
        if (savedContactsStr) {
            const savedContacts: Contact[] = JSON.parse(savedContactsStr);
            const found = savedContacts.find(c => c.id === id);
            if (found) {
                setContact(found);
            }
        }
    }, [id]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>Contact Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {contact ? (
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{contact.name}</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <p>Phone: {contact.phone}</p>
                        </IonCardContent>
                    </IonCard>
                ) : (
                    <p>Contact not found.</p>
                )}
                <IonButton expand="block" routerLink="/home" className="ion-margin-top">
                    Back to List
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Detail;
