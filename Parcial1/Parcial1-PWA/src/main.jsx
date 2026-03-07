import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function (registro) {
        console.log('Service Worker registrado con exito:', registro)
      })
      .catch(function (error) {
        console.log('Error al registrar el Service Worker:', error)
      })
  })
}
