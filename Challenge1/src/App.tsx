import { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

interface Contact {
  id: number;
  name: string;
  phone: string;
}

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now(),
      name,
      phone,
    };
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Contact Management</h1>
      <ContactForm onAddContact={addContact} />
      <ContactList contacts={contacts} onDeleteContact={deleteContact} />
    </div>
  );
}

export default App;
