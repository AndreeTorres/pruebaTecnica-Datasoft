# frontendDS

Frontend en React para la prueba tecnica Datasoft.

## Tecnologias

- React
- Vite
- React Router DOM
- Axios
- React Bootstrap
- Bootstrap

## Requisitos

- Node.js 22 o superior
- npm
- Backend `backendDS` ejecutandose en `http://localhost:8080`
- PostgreSQL activo para que el backend pueda responder las peticiones

## Configuracion

El frontend lee la URL de la API desde `VITE_API_URL`.

Crear un archivo `.env` en `frontendDS` si se necesita cambiar la URL:

```text
VITE_API_URL=http://localhost:8080
```

Si no existe `.env`, se usa `http://localhost:8080` por defecto.

## Instalacion

```bash
npm install
```

## Ejecucion local

```bash
npm run dev
```

La aplicacion queda disponible normalmente en:

```text
http://localhost:5173
```

## Rutas

- `/login`: formulario de inicio de sesion.
- `/books`: lista de libros con filtro por genero.
- `/books/:id`: detalle de libro protegido por JWT.

## Usuario de prueba

```json
{
  "username": "admin",
  "password": "admin123"
}
```

## Flujo de prueba

1. Levantar PostgreSQL en Docker.
2. Ejecutar el backend `backendDS`.
3. Ejecutar el frontend `frontendDS`.
4. Ingresar en `/login` con `admin` y `admin123`.
5. Revisar la lista de libros en `/books`.
6. Abrir el detalle de un libro.

## Estructura

```text
src/api          Llamadas HTTP hacia backendDS
src/components   Componentes reutilizables
src/pages        Paginas principales
src/styles       Estilos globales
src/assets       Recursos de apoyo para la interfaz
```

## WebStorm

Abrir la carpeta `frontendDS` como proyecto o como modulo dentro del repositorio. WebStorm detecta `package.json` y permite ejecutar los scripts `dev`, `build` y `preview` desde la ventana de npm.
