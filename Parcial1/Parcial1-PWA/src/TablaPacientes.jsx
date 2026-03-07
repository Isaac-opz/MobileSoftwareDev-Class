function TablaPacientes({ pacientes, onEditar, onEliminar }) {
  if (pacientes.length === 0) {
    return <p>No hay pacientes registrados.</p>
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Nombre completo</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>DNI</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Telefono</th>
          <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {pacientes.map((paciente) => (
          <tr key={paciente.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              {paciente.nombre} {paciente.apellido}
            </td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{paciente.dni}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{paciente.telefono}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <button onClick={() => onEditar(paciente)} style={{ marginRight: '5px', cursor: 'pointer' }}>
                Editar
              </button>
              <button
                onClick={() => {
                  if (window.confirm('¿Seguro que deseas eliminar?')) {
                    onEliminar(paciente.id)
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaPacientes
