import config from "../config.js"

// Configuraciones de CORS por entorno
const corsConfigurations = {
  development: {
    origin: true, // Permitir cualquier origen en desarrollo
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-API-Key",
      "Cache-Control",
    ],
    exposedHeaders: ["X-Total-Count", "X-Page-Count"],
    maxAge: 86400, // 24 horas
    optionsSuccessStatus: 200,
  },

  production: {
    origin: (origin, callback) => {
      const allowedOrigins = config.CORS_ORIGIN.split(",").map((o) => o.trim())

      // Permitir requests sin origin (apps móviles, Postman, etc.)
      if (!origin) return callback(null, true)

      // Verificar si el origen está permitido
      if (config.CORS_ORIGIN === "*" || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`Origen ${origin} no permitido por CORS`))
      }
    },
    credentials: config.CORS_CREDENTIALS,
    methods: config.CORS_METHODS.split(","),
    allowedHeaders: config.CORS_ALLOWED_HEADERS.split(","),
    exposedHeaders: ["X-Total-Count", "X-Page-Count"],
    maxAge: 86400,
    optionsSuccessStatus: 200,
  },

  test: {
    origin: true,
    credentials: false,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  },
}

// Exportar configuración según el entorno
export const getCorsConfig = () => {
  const env = config.NODE_ENV || "development"
  return corsConfigurations[env] || corsConfigurations.development
}

// Función para validar configuración CORS
export const validateCorsConfig = () => {
  const corsConfig = getCorsConfig()

  console.log("🌐 Configuración CORS cargada:")
  console.log(`   - Entorno: ${config.NODE_ENV}`)
  console.log(`   - Origen: ${typeof corsConfig.origin === "function" ? "Función personalizada" : corsConfig.origin}`)
  console.log(`   - Credenciales: ${corsConfig.credentials}`)
  console.log(`   - Métodos: ${Array.isArray(corsConfig.methods) ? corsConfig.methods.join(", ") : corsConfig.methods}`)

  return corsConfig
}
