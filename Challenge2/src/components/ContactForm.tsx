import { useState } from 'react';

interface ContactFormProps {
  onAddContact: (name: string, phone: string) => void;
}

function ContactForm({ onAddContact }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() === '' || phone.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    onAddContact(name, phone);
    setName('');
    setPhone('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px'
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Add Contact
      </button>
    </form>
  );
}

export default ContactForm;
