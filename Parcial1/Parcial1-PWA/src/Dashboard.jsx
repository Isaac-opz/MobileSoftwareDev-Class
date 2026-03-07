import { useState, useEffect } from 'react'
import FormularioPaciente from './FormularioPaciente'
import TablaPacientes from './TablaPacientes'
import PerfilUsuario from './PerfilUsuario'

function Dashboard({ usuario, onLogout }) {
  const [pacientes, setPacientes] = useState(() => {
    const guardados = localStorage.getItem('medicare_pacientes')
    return guardados ? JSON.parse(guardados) : []
  })
  const [busqueda, setBusqueda] = useState('')
  const [pacienteAEditar, setPacienteAEditar] = useState(null)

  useEffect(() => {
    localStorage.setItem('medicare_pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  function manejarGuardarPaciente(paciente) {
    const existe = pacientes.find((p) => p.id === paciente.id)
    if (existe) {
      setPacientes(pacientes.map((p) => (p.id === paciente.id ? paciente : p)))
    } else {
      setPacientes([...pacientes, paciente])
    }
    setPacienteAEditar(null)
  }

  function manejarEliminarPaciente(id) {
    setPacientes(pacientes.filter((p) => p.id !== id))
  }

  const textoLower = busqueda.toLowerCase()
  const pacientesFiltrados = pacientes.filter((p) => {
    return (
      p.nombre.toLowerCase().includes(textoLower) ||
      p.apellido.toLowerCase().includes(textoLower) ||
      p.dni.includes(busqueda)
    )
  })

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <PerfilUsuario usuario={usuario} />
        <div>
          <h2 style={{ margin: 0 }}>Bienvenido, {usuario.email}</h2>
          <p style={{ margin: '4px 0 0 0' }}>Rol: {usuario.rol}</p>
        </div>
      </div>

      {usuario.rol !== 'recepcionista' && (
        <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
          Seccion de Estadisticas
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <h3>Gestion de Pacientes</h3>

        {/* Justificación: El estado de búsqueda vive en Dashboard y no en TablaPacientes porque Dashboard necesita pasar la lista ya filtrada como prop a la tabla, cumpliendo el principio de levantamiento de estado (lifting state up) en React. */}

        <input
          type="text"
          placeholder="Buscar por nombre, apellido o DNI..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box', marginBottom: '10px' }}
        />

        <TablaPacientes
          pacientes={pacientesFiltrados}
          onEditar={(paciente) => setPacienteAEditar(paciente)}
          onEliminar={manejarEliminarPaciente}
        />

        {usuario.rol !== 'medico' && (
          <FormularioPaciente
            pacienteAEditar={pacienteAEditar}
            onGuardar={manejarGuardarPaciente}
          />
        )}
      </div>

      <button onClick={onLogout} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}>
        Cerrar Sesion
      </button>
    </div>
  )
}

export default Dashboard
