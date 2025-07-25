import config from "../config.js"

// Middleware personalizado para manejo avanzado de CORS
export const corsHandler = (req, res, next) => {
  const origin = req.headers.origin

  // Log de requests CORS para debugging
  if (config.NODE_ENV === "development") {
    console.log(`🌐 CORS Request from origin: ${origin || "No origin"}`)
  }

  // Headers adicionales de seguridad para CORS
  res.header("Access-Control-Allow-Credentials", config.CORS_CREDENTIALS)
  res.header("Access-Control-Max-Age", "86400") // 24 horas
  res.header("Vary", "Origin")

  // Manejo especial para requests preflight
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", config.CORS_METHODS)
    res.header("Access-Control-Allow-Headers", config.CORS_ALLOWED_HEADERS)
    return res.status(200).end()
  }

  next()
}

// Función para validar origen
export const isOriginAllowed = (origin) => {
  if (!origin) return true // Permitir requests sin origin

  if (config.NODE_ENV === "development") return true

  if (config.CORS_ORIGIN === "*") return true

  const allowedOrigins = config.CORS_ORIGIN.split(",").map((o) => o.trim())
  return allowedOrigins.includes(origin)
}

// Middleware para logging de CORS
export const corsLogger = (req, res, next) => {
  if (config.NODE_ENV === "development") {
    const origin = req.headers.origin
    const method = req.method
    const path = req.path

    console.log(`🔗 CORS: ${method} ${path} from ${origin || "unknown origin"}`)
  }
  next()
}
