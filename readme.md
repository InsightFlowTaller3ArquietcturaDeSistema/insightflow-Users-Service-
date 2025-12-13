# 👥 InsightFlow - Users Service

Microservicio de gestión de usuarios para el proyecto InsightFlow, desarrollado como parte del Taller 3 de Arquitectura de Sistemas.

## 📋 Descripción

Este microservicio forma parte de la arquitectura distribuida de InsightFlow y es responsable de la gestión integral de usuarios. Está construido con **Express.js** y utiliza un sistema de almacenamiento basado en **matrices en memoria** en lugar de bases de datos tradicionales, lo que lo hace ideal para entornos de desarrollo, pruebas y demostraciones.


### Almacenamiento en Matrices 

Se decidio ocupar una matric conformada por 2 arrays la cual simulara labla de Usuarios de una base de datos relacional con fin de no implementar una base datos y retrasar el proceso de creación.
ejemplo:

```javascript
// models/userModel.js 
let users = [
  { id: 1, name: "Juan", email: "juan@example.com", role: "admin" },
  { id: 2, name: "María", email: "maria@example.com", role: "user" }
];
```

## 🎨 Patrones de Diseño Adicionales

Durante el desarrollo de esta aplicación se implementarios varios patrones de diseño con el fin de agilizar el trabajo realziado y mantener buenas practicas dentro de este por lo cual se implemntarion los siguientes patrones de diseño:

- Router Pattern, este con el fin de crear la modulación de las rutas del sistema
- Singleton, para tener una una instancia de express dentro del sistema
- repository Para separar la lógia de negocios con la de los datos


## 🚀 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **JavaScript** - Lenguaje de programación
- **Docker** - Contenedorización
- **GitHub Actions** - CI/CD

## 📦 Instalación

### Requisitos Previos

- Node.js >= 14.x
- npm >= 6.x
- Docker (opcional)

### Instalación Local

1. Clonar el repositorio:
```bash
git clone https://github.com/InsightFlowTaller3ArquietcturaDeSistema/insightflow-Users-Service-.git
cd insightflow-Users-Service-
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

4. Iniciar el servidor:
```bash
npm run dev
```

El servicio estará disponible en `http://localhost:3000` (o el puerto configurado).

## Uso con Docker

### Construir la imagen

```bash
docker build -t insightflow-users-service .
```

### Ejecutar el contenedor

```bash
docker run -p 3000:3000 --env-file .env insightflow-users-service
```

### Docker Compose

```bash
docker-compose up -d
```

## 📚 API Endpoints

### Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/usuario/users` | Obtener todos los usuarios |
| GET | `/usuario/users/:id` | Obtener usuario por ID |
| GET | `/usuario/auth/verify` | Verificar Token |
| POST | `/usuario/users` | Crear nuevo usuario |
| POST | `/usuario/login` | Iniciar sesión |
| PATCH | `/usuario/users/:id` | Actualizar usuario existente |
| DELETE | `/usuario/users/:id` | Eliminar usuario |


### Ejemplos de Uso



## 🗂️ Estructura del Proyecto

```
insightflow-Users-Service-/
├── .github/
│   └── workflows/         # Configuración de GitHub Actions
├── src/
│   ├── controllers/       # Controladores de la API
│   ├── services/          # Lógica de negocio
│   ├── routes/            # Definición de rutas
│   ├── models/            # Modelos de datos
│   ├── utils/             # Utilidades
│   └── app.js             # Configuración de Express
├── .dockerignore          # Archivos ignorados por Docker
├── .env                   # Variables de entorno
├── .gitignore             # Archivos ignorados por Git
├── Dockerfile             # Configuración de Docker
├── app.http               # Archivo de pruebas HTTP
├── package.json           # Dependencias y scripts
└── README.md              # Este archivo
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Configuración del servidor
PORT=3000
JWT_SECRET=TUCLAVESECRETA
```

##  Integración con Frontend

Este microservicio está diseñado para ser consumido por el frontend de InsightFlow. Para integrarlo:

1. **Configurar CORS** en el servidor Express
2. **Definir la URL base** del microservicio en el frontend
3. **Implementar manejo de errores** adecuado en las peticiones HTTP
4. **Gestionar estados de carga** en la interfaz de usuario


##  CI/CD

El proyecto incluye workflows de GitHub Actions para:

- Pruebas automatizadas
- Build y validación
- Construcción de imágenes Docker
- Despliegue automatizado

