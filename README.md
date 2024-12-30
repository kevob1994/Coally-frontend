# coally-challenge-frontend

Este repositorio contiene el frontend del proyecto **Coally Challenge**, desarrollado con `Vite` + `React v18` + `TypeScript v5.5.3`.


## Url del deploy
    https://coally-frontend-k492w733f-kevob1994s-projects.vercel.app/

#### Las credenciales para ingresar a la app son

    email: user@test.com
    constraseña: ContrasenaPrueba


## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

- **Node.js v22.6.0** o superior
- **npm v10.8.3** o superior

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/kevob1994/Coally-frontend.git
    cd coally-challenge-frontend
    ```

2.  Instala las dependencias:

    ```
    npm install
    ```

3.  Crea un archivo .env en el directorio raíz del proyecto con las siguientes variables de entorno:
    (debe apuntar a la ruta del proyecto https://github.com/kevob1994/Coally-backend.git)

        ```
        VITE_API_URL=<URL_del_proyecto_backend>

        ```

## Comandos

- Ejecuta el servidor en modo desarrollo con Vite
  `npm run dev`

- Genera los archivos transpilados y crea el build de producción
  `npm run build`

- Verifica el código con ESLint
  `npm run lint`

- Previsualiza la versión de producción del servidor
  `npm run preview`

### Herramientas y Librerías

#### Desarrollo

- Eslint
- Tailwindcss
- Typescript
- Vite

#### Producción

- Redux
- Axios
- React
- React-router-dom
- React-toastify

### Estructura Principal

1. **src/components**: Contiene los componentes reutilizables de la interfaz de usuario.
2. **src/hooks**: Contiene hooks personalizados de React.
3. **src/interface**: Definición de las interfaces de TypeScript
4. **src/pages**: Contendores de las diferentes páginas de la aplicación.
5. **src/redux**: Configuracion para gestionar el estado global de la aplicación mediante Redux.
6. **src/routes**: Configuración de react router dom.
7. **src/services**: Implementacion de las funciones que se comunican con APIs.
8. **src/utils**: Utilidades y funciones auxiliares.
