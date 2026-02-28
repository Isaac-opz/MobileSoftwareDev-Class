# Challenge 01 & Práctica 02 - App de Contactos (Routing y Storage)
**Clase de Desarrollo de Software para Plataformas Móviles** **Autor:** Isaac Piedrahita

Este proyecto es una aplicación desarrollada en Ionic React que gestiona una lista de contactos. La aplicación simula una carga inicial de datos, permite agregar y eliminar contactos de forma inmutable, utiliza Ionic Routing para la navegación a través de múltiples páginas, y persiste los datos en el navegador utilizando `localStorage`.

## Características Implementadas
- Estado de carga inicial simulado (Loader) al arrancar la aplicación.
- Funcionalidad para listar, agregar y eliminar contactos.
- Navegación multi-página: Home (lista), Create (formulario) y Detail (información específica del contacto).
- Persistencia de datos local para que los contactos sobrevivan al recargar la página.

## Conceptos Clave Aplicados
- **Fundamentos de React:** Uso de `useState` para el manejo del estado y `useEffect` para simular la carga inicial de datos.
- **Ionic React Routing:** Uso de `<IonReactRouter>`, `useHistory` para la redirección tras guardar un contacto, y `useParams` para leer rutas dinámicas (`/detail/:id`).
- **Persistencia de Datos:** Uso de `localStorage` nativo utilizando `JSON.stringify()` y `JSON.parse()`.

## Ejecución Local
Para ejecutar la aplicación localmente, abre tu terminal dentro del directorio del proyecto y ejecuta los siguientes comando:

```bash
npm run install

npm run dev
