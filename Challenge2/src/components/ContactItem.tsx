interface ContactItemProps {
  id: number;
  name: string;
  phone: string;
  onDelete: (id: number) => void;
}

function ContactItem({ id, name, phone, onDelete }: ContactItemProps) {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '10px', 
      marginBottom: '10px',
      borderRadius: '5px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <strong>{name}</strong>
        <p style={{ margin: '5px 0 0 0', color: '#666' }}>{phone}</p>
      </div>
      <button 
        onClick={() => onDelete(id)}
        style={{
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          padding: '5px 15px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default ContactItem;
