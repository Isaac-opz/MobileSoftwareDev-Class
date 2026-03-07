import { useState, useEffect } from 'react'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'

function App() {
  const [usuario, setUsuario] = useState(null)

  useEffect(() => {
    const guardado = localStorage.getItem('usuario')
    if (guardado) {
      setUsuario(JSON.parse(guardado))
    }
  }, [])

  function manejarLogin(datos) {
    setUsuario(datos)
  }

  function cerrarSesion() {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  if (usuario) {
    return <Dashboard usuario={usuario} onLogout={cerrarSesion} />
  }

  return <LoginForm onLoginExitoso={manejarLogin} />
}

export default App
