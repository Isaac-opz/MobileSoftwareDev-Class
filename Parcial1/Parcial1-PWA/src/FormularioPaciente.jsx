import { useState, useEffect } from 'react'

function FormularioPaciente({ pacienteAEditar, onGuardar }) {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [telefono, setTelefono] = useState('')
  const [errorDni, setErrorDni] = useState('')

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre)
      setApellido(pacienteAEditar.apellido)
      setDni(pacienteAEditar.dni)
      setTelefono(pacienteAEditar.telefono)
    } else {
      setNombre('')
      setApellido('')
      setDni('')
      setTelefono('')
    }
  }, [pacienteAEditar])

  function manejarSubmit(e) {
    e.preventDefault()
    setErrorDni('')

    if (nombre.trim() === '' || apellido.trim() === '' || dni.trim() === '') {
      setErrorDni('Nombre, apellido y DNI son obligatorios')
      return
    }

    if (!/^\d+$/.test(dni)) {
      setErrorDni('El DNI debe ser numerico')
      return
    }

    if (dni.length < 7 || dni.length > 8) {
      setErrorDni('El DNI debe tener entre 7 y 8 caracteres')
      return
    }

    const paciente = {
      id: pacienteAEditar ? pacienteAEditar.id : Date.now(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim()
    }

    onGuardar(paciente)
    setNombre('')
    setApellido('')
    setDni('')
    setTelefono('')
    setErrorDni('')
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', marginTop: '20px' }}>
      <h3>{pacienteAEditar ? 'Editar Paciente' : 'Nuevo Paciente'}</h3>
      <form onSubmit={manejarSubmit}>
        <div style={{ marginBottom: '8px' }}>
          <label>Nombre</label>
          <br />
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Apellido</label>
          <br />
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>DNI</label>
          <br />
          <input
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label>Telefono</label>
          <br />
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={{ width: '100%', padding: '6px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Guardar
        </button>
      </form>
      {errorDni && (
        <p style={{ color: 'red' }}>{errorDni}</p>
      )}
    </div>
  )
}

export default FormularioPaciente
