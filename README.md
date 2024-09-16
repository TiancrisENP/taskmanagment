
# Task Management Application

Este es un proyecto de gestión de tareas con un frontend en React y un backend en Express. La aplicación permite agregar, editar, eliminar y filtrar tareas.

## Descripción

La aplicación consta de:

- **Frontend:** Desarrollado con React, permite a los usuarios interactuar con la lista de tareas.
- **Backend:** Desarrollado con Express, proporciona las API necesarias para manejar las tareas.

## Tecnologías

- **Frontend:** React, Axios
- **Backend:** Express
- **Estilos:** CSS

## Instalación

### Backend

1. Navega al directorio del backend:

  terminal:
   cd src
   

2. Instala las dependencias:

   terminal:
   npm install
   

   Las dependencias incluyen:

   - `express`: Framework para el servidor.
   - `cors`: Middleware para habilitar CORS.

3. Inicia el servidor:

   terminal:
   node server.js
   

   El servidor se ejecutará en `http://localhost:5000`.

### Frontend

1. Navega al directorio del frontend:

   terminal:
    cd src
   

2. Instala las dependencias:

   terminal:
   npm install
   

   Las dependencias incluyen:

   - `react`: Biblioteca principal para construir la interfaz de usuario.
   - `react-dom`: Proporciona métodos específicos para la integración con el DOM.
   - `axios`: Biblioteca para realizar solicitudes HTTP.
   - `react-scripts`: Scripts de configuración para React.

3. Inicia la aplicación:

   terminal:
   npm start
   

   La aplicación se ejecutará en `http://localhost:3000`.

## Estructura del Proyecto

### Frontend

- **`src/index.js`**: Punto de entrada para la aplicación React.
- **`src/App.js`**: Componente principal que incluye `TaskList`.
- **`src/TaskList.js`**: Componente que maneja la lista de tareas y las operaciones CRUD.
- **`src/styles.css`**: Estilos CSS para la aplicación.

### Backend

- **`server.js`**: Configuración del servidor Express y rutas de la API.
- **`package.json`**: Dependencias y scripts del backend.

## Despliegue en Vercel

### Desplegar el Frontend

1. Configura tu repositorio en GitHub.
2. Conecta tu repositorio con Vercel:
   - Ve a [Vercel](https://vercel.com/) e inicia sesión o crea una cuenta.
   - En el dashboard de Vercel, haz clic en **"New Project"**.
   - Conecta tu cuenta de GitHub y selecciona el repositorio del frontend.
3. Configura el despliegue y haz clic en **"Deploy"**.

### Desplegar el Backend

1. Crea un archivo `vercel.json` en la raíz del directorio del backend con la siguiente configuración:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "server.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/server.js"
       }
     ]
   }
   ```

2. Sube tu backend a un repositorio de GitHub.
3. Conecta tu repositorio con Vercel:
   - Ve al dashboard de Vercel, haz clic en **"New Project"** y selecciona el repositorio del backend.
4. Configura el despliegue y haz clic en **"Deploy"**.

## Uso

1. **Agregar Tareas:** Completa el formulario de "Nueva Tarea" y haz clic en "Agregar Tarea" para añadir una tarea a la lista.
2. **Filtrar Tareas:** Usa el menú desplegable "Mostrar" para filtrar las tareas por "Todas", "Completadas" o "Pendientes".
3. **Marcar como Completada:** Haz clic en el botón "Marcar como completada" para cambiar el estado de la tarea.
4. **Eliminar Tareas:** Haz clic en el botón "Eliminar" para eliminar una tarea de la lista.

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tus cambios.
3. Realiza los cambios y haz un commit.
4. Envía un pull request.


## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactme a [czarachesalcedo@gmail.com].