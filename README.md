# API REST Auth, API Externa Google, MongoDB

Breve descripción del proyecto y sus funcionalidades principales.

## Funcionalidades

1. **Registro de Usuario:** Permite a los usuarios registrarse en la plataforma.
2. **Login de Usuario:** Permite a los usuarios iniciar sesión en la plataforma.
3. **Búsqueda de Restaurantes Cercanos:** Endpoint para buscar restaurantes cercanos a una ciudad o coordenadas proporcionadas.
4. **Agregar Transacción:** Endpoint para agregar transacciones al usuario autenticado.
5. **Consulta de Transacciones Históricas:** Endpoint para ver las transacciones realizadas históricamente.
6. **Logout de Usuario:** Permite a los usuarios cerrar sesión en la plataforma.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/dsuarezp/TybaBackendTest.git
   cd nombre-del-repositorio
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

Crea un archivo .env en el directorio raíz y añade las siguientes variables:

   ```bash
   PORT=3000
   MONGO_URI=tu_uri_de_MongoDB
   JWT_SECRET=tu_secreto_para_jwt
   GOOGLE_API_KEY=tu_api_key_de_google
   ```

## Uso

1. Inicia la aplicación

   ```bash
   npm start
   ```

2. Pruebas con Postman

Utiliza el archivo de Postman para realizar pruebas en tu API, incluyendo los endpoints de registro, login, búsqueda de restaurantes, consulta de transacciones y logout.