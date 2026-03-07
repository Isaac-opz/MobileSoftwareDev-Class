import { useState } from 'react'

function LoginForm({ onLoginExitoso }) {
  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState(false)

  function manejarSubmit(e) {
    e.preventDefault()

    if (correo === 'admin@medicare.com' && contrasena === '123') {
      const datos = { email: 'admin@medicare.com', rol: 'recepcionista' }
      localStorage.setItem('usuario', JSON.stringify(datos))
      onLoginExitoso(datos)
    } else if (correo === 'medico@medicare.com' && contrasena === '123') {
      const datos = { email: 'medico@medicare.com', rol: 'medico' }
      localStorage.setItem('usuario', JSON.stringify(datos))
      onLoginExitoso(datos)
    } else {
      setError(true)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px' }}>
      <h2>Iniciar Sesion</h2>
      <form onSubmit={manejarSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Correo electronico</label>
          <br />
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña</label>
          <br />
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Ingresar
        </button>
      </form>
      {error && (
        <p style={{ color: 'red' }}>Usuario o contraseña incorrectos</p>
      )}
    </div>
  )
}

export default LoginForm
