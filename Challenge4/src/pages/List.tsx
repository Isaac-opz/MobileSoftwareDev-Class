import React, { useState, useEffect } from "react";
import { IonPage, IonContent, IonButton, IonItem, IonInput } from "@ionic/react";
import { useHistory } from "react-router";
import heroImage from "../assets/hero_image.png";

interface Contact {
    id: number;
    name: string;
    phone: string;
}

const List: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const history = useHistory();

    // Simulating initial data loading
    useEffect(() => {
        setTimeout(() => {
            const initialContacts: Contact[] = [
                { id: 1, name: "Alejandro Villegas", phone: "302893432" },
                { id: 2, name: "Julia Rodallega", phone: "3212046359" },
                { id: 3, name: "Alberto Sinisterra", phone: "3003438971" },
            ];
            setContacts(initialContacts);
            setIsLoading(false);
        }, 2000);
    }, []);

    const addContact = () => {
        if (newName.trim() === '' || newPhone.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        const newContact: Contact = {
            id: Date.now(),
            name: newName,
            phone: newPhone,
        };
        setContacts([...contacts, newContact]);
        setNewName("");
        setNewPhone("");
    };

    const deleteContact = (id: number) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    const handleLogout = () => {
        localStorage.removeItem("logged");
        history.push("/login");
    };

    if (isLoading) {
        return (
            <IonPage>
                <IonContent className="ion-padding">
                    <IonItem lines="none" style={{ textAlign: "center" }}>
                        <p style={{ width: "100%" }}>Loading...</p>
                    </IonItem>
                </IonContent>
            </IonPage>
        );
    }

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
                    <IonItem lines="none" style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1>Contact Management</h1>
                        <IonButton color="danger" slot="end" onClick={handleLogout}>Logout</IonButton>
                    </IonItem>
                    
                    <img src={heroImage} alt="App Hero" style={{ width: "100%", borderRadius: "8px", marginBottom: "20px" }} />
                    
                    {/* Inline Contact Form using basic Ionic components */}
                    <IonItem>
                        <IonInput
                            type="text"
                            placeholder="Name"
                            value={newName}
                            onIonChange={(e: any) => setNewName(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            type="tel"
                            placeholder="Phone"
                            value={newPhone}
                            onIonChange={(e: any) => setNewPhone(e.detail.value!)}
                        />
                    </IonItem>
                    <IonButton 
                        expand="block" 
                        color="success" 
                        onClick={addContact} 
                        className="ion-margin-top ion-margin-bottom"
                    >
                        Add Contact
                    </IonButton>

                    {/* Inline Contact List using basic Ionic components */}
                    {contacts.length === 0 ? (
                        <IonItem lines="none">
                            <p style={{ width: "100%", textAlign: "center", color: "#666" }}>
                                No contacts yet. Add your first contact!
                            </p>
                        </IonItem>
                    ) : (
                        contacts.map((contact) => (
                            <IonItem key={contact.id}>
                                {contact.name} - {contact.phone}
                                <IonButton color="danger" slot="end" onClick={() => deleteContact(contact.id)}>
                                    Delete
                                </IonButton>
                            </IonItem>
                        ))
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default List;
