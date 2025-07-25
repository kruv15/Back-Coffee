# ☕ Back-Coffee API

### *Backend robusto para tienda de productos de café*

---

## 📋 Tabla de Contenidos

- [🎯 Características](#-características)
- [🛠️ Tecnologías](#️-tecnologías)
- [⚡ Inicio Rápido](#-inicio-rápido)
- [🔧 Configuración](#-configuración)
- [📡 API Endpoints](#-api-endpoints)
- [🏗️ Estructura del Proyecto](#️-estructura-del-proyecto)
- [🚀 Deploy](#-deploy)

---

## 🎯 Características

<div align="center">

| Característica | Descripción |
|----------------|-------------|
| 🔐 **Autenticación JWT** | Sistema seguro de login con roles de usuario |
| 👥 **Gestión de Usuarios** | Registro, login y perfiles de usuario |
| ☕ **Catálogo de Productos** | CRUD completo con categorías y filtros |
| 🛒 **Sistema de Pedidos** | Gestión completa de pedidos y estados |
| 🔒 **Seguridad Avanzada** | Bcrypt, rate limiting, validaciones |
| 📱 **API RESTful** | Endpoints bien estructurados y documentados |
| 🌐 **CORS Configurado** | Listo para frontend en cualquier dominio |
| 📊 **Paginación** | Respuestas optimizadas con paginación |

</div>

---

## 🛠️ Tecnologías

<div align="center">

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Base de Datos
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Seguridad & Auth
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-3178C6?style=for-the-badge&logo=letsencrypt&logoColor=white)

### Deploy & Tools
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

</div>

---

## ⚡ Inicio Rápido

### Prerrequisitos

- **Node.js**
- **MongoDB** (local o Atlas)
- **npm** o **yarn**

### Instalación

\`\`\`bash
# 1. Clonar el repositorio
git clone https://github.com/kruv15/Back-Coffee.git
cd back-coffee

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Ejecutar en desarrollo
npm run dev

# 5. ¡Listo! El servidor está corriendo en http://localhost:3000
\`\`\`

---

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

\`\`\`env
# Servidor
PORT=3000
NODE_ENV=development

# Base de Datos
MONGODB_URI

# JWT
JWT_SECRET
JWT_EXPIRES_IN=24h

# Seguridad
BCRYPT_ROUNDS=12
\`\`\`

## 📡 API Endpoints

<div align="center">

### 🔗 URL Base
**Desarrollo:** `http://localhost:3000`  
**Producción:** `https://tu-app.render.com`

</div>

### 👥 Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/usuarios/registrar` | Registrar nuevo usuario | ❌ |
| `POST` | `/api/usuarios/login` | Iniciar sesión | ❌ |
| `GET` | `/api/usuarios/perfil` | Obtener perfil | ✅ |
| `GET` | `/api/usuarios` | Listar usuarios | 👑 Admin |

### ☕ Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/productos` | Listar productos | ❌ |
| `GET` | `/api/productos/:id` | Obtener producto | ❌ |
| `POST` | `/api/productos` | Crear producto | 👑 Admin |
| `PUT` | `/api/productos/:id` | Actualizar producto | 👑 Admin |
| `DELETE` | `/api/productos/:id` | Eliminar producto | 👑 Admin |

### 🛒 Pedidos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/pedidos` | Crear pedido | ✅ |
| `GET` | `/api/pedidos/mis-pedidos` | Mis pedidos | ✅ |
| `GET` | `/api/pedidos` | Todos los pedidos | 👑 Admin |
| `PUT` | `/api/pedidos/:id/estado` | Actualizar estado | 👑 Admin |

### 🔍 Utilidades

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/` | Info de la API |

---

## 🏗️ Estructura del Proyecto

\`\`\`
back-coffee/
├── 📁 src/
│   ├── 📁 controllers/          # Lógica de negocio
│   │   ├── usuarioController.js
│   │   ├── productoController.js
│   │   └── pedidoController.js
│   ├── 📁 middlewares/          # Middlewares personalizados
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── 📁 models/               # Modelos de MongoDB
│   │   ├── Usuario.js
│   │   ├── Producto.js
│   │   └── Pedido.js
│   ├── 📁 routes/               # Definición de rutas
│   │   ├── usuarioRoutes.js
│   │   ├── productoRoutes.js
│   │   └── pedidoRoutes.js
│   ├── 📄 app.js                # Configuración de Express
│   └── 📄 config.js             # Configuración general
├── 📄 index.js                  # Punto de entrada
├── �� package.json              # Dependencias y scripts
├── 📄 .env              # Ejemplo de variables de entorno
└── 📄 README.md                 # Este archivo
\`\`\`

---

## 🚀 Deploy

### Deploy en Render.com

1. **¡Listo!** La API esta disponible en `https://back-coffee.onrender.com/`

---

## 🔒 Seguridad

### Medidas Implementadas

- ✅ **Contraseñas hasheadas** con bcrypt (12 rounds)
- ✅ **JWT tokens** con expiración configurable
- ✅ **Rate limiting** (100 requests/15min por IP)
- ✅ **Validación de datos** con express-validator
- ✅ **Headers de seguridad** con Helmet
- ✅ **Sanitización** de inputs
- ✅ **Manejo seguro de errores**

### Roles de Usuario

| Rol | Permisos |
|-----|----------|
| **Usuario** | Ver productos, crear pedidos, ver sus pedidos |
| **Admin** | Acceso completo: CRUD productos, gestionar pedidos |

---

<div align="center">

### ⭐ ¡Si te gusta este proyecto, dale una estrella!

**Hecho con ❤️ y mucho ☕**

[⬆ Volver arriba](#-back-coffee-api)

</div>
