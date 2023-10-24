Descripción General
Esta aplicación está diseñada para interactuar con Slack a través de comandos y almacenar mensajes en MongoDB. 
Además, proporciona un endpoint de "health check" para monitorear la salud de la aplicación.

Configuración e Instalación
1. Clona el repositorio.
2. Instala las dependencias usando npm install.
3. Crea un archivo .env en la raíz del proyecto y define las variables de entorno necesarias (SLACK_BOT_TOKEN SLACK_SIGNING_SECRET, APP_TOKEN, etc.).
4. Asegúrate de tener MongoDB en ejecución (Localmente) y configura la cadena de conexión en config.js si es necesario.
5. Ejecuta la aplicación con "node server.js"

Variables de Entorno
- SLACK_BOT_TOKEN: Token de autenticación del bot de Slack.
- SLACK_SIGNING_SECRET: Firma secreta de Slack.
- APP_TOKEN: Token de autenticación de la aplicación.
- URL_MONGO: Cadena de conexión de MongoDB. Por defecto, se utiliza "mongodb://localhost:27017/slackMessages".


Estructura del Proyecto
- commands/: Contiene los comandos de Slack, como sendMessage.js.
- jest/: Contiene las pruebas unitarias para los servicios, por ejemplo, slackService.test.js.
- models/: Define el esquema y el modelo de MongoDB para los mensajes.
- services/: Contiene los servicios que interactúan con Slack y MongoDB.
- server.js: Archivo principal que inicia la aplicación y define el endpoint de "health check".
- config.js: Configuración de MongoDB.
- package.json: Define las dependencias y scripts del proyecto.

Funcionalidades Principales
- Envío de Mensajes a Slack: A través del comando /enviar-mensaje, los usuarios pueden enviar mensajes a otros usuarios en Slack.
- Almacenamiento de Mensajes: Los mensajes enviados se almacenan en MongoDB para su registro.
- Endpoint de Health Check: Un endpoint /health está disponible para verificar el estado de la aplicación.

Pruebas Unitarias
Se utilizó jest para escribir y ejecutar pruebas unitarias. Estas pruebas se encuentran en la carpeta jest/ y se pueden ejecutar usando el comando npm test.

Dependencias
- @slack/bolt: Framework de Slack.
- dotenv: Cargar variables de entorno.
- express: Framework web.
- mongoose: ODM para MongoDB.
- jest (dev): Framework de pruebas.
- supertest (dev): Biblioteca para pruebas HTTP.


