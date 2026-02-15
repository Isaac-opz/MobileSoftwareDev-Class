import ContactItem from './ContactItem';

interface Contact {
  id: number;
  name: string;
  phone: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: number) => void;
}

function ContactList({ contacts, onDeleteContact }: ContactListProps) {
  if (contacts.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No contacts yet. Add your first contact!</p>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {contacts.map((contact) => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          phone={contact.phone}
          onDelete={onDeleteContact}
        />
      ))}
    </div>
  );
}

export default ContactList;
