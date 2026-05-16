# ChallengeTailwind

Actividad de **Implementación de Tailwind CSS**.

## Tecnologías

- Ionic React + React Router
- Capacitor para empaquetado
- Tailwind CSS v4
- Plugins Capacitor: cámara, geolocalización, motion, device, haptics, filesystem y notificaciones locales

## Funcionalidades

- Home responsive con tarjetas diseñadas con utilidades Tailwind.
- Geolocalización: solicita permiso y muestra latitud/longitud.
- Cámara: permite tomar o seleccionar una foto.
- Movimiento: escucha acelerómetro del dispositivo.
- Dispositivo: muestra información básica y batería.
- Vibración: ejecuta respuestas hápticas.
- Archivos locales: escribe y lee texto con Filesystem en el almacenamiento privado de la app.
- Notificaciones locales: programa una notificación.

## Ejecutar en web

```bash
npm install
npm run dev
```

## Ejecutar como app móvil

Build web:

```bash
npm run build
npx cap sync android
npx cap open android
```