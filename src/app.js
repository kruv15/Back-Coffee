import express from "express"
import mongoose from "mongoose"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import config from "./config.js"

// Importar rutas
import usuarioRoutes from "./routes/usuarioRoutes.js"
import productoRoutes from "./routes/productoRoutes.js"
import pedidoRoutes from "./routes/pedidoRoutes.js"

// Importar middlewares
import errorHandler from "./middlewares/errorHandler.js"

const app = express()

// Configuración de seguridad
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.",
  },
})
app.use(limiter)

// Middlewares básicos
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Configuración de CORS (sin restricciones como solicitaste)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  if (req.method === "OPTIONS") {
    res.sendStatus(200)
  } else {
    next()
  }
})

// Conexión a MongoDB
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB exitosamente")
  })
  .catch((error) => {
    console.error("❌ Error conectando a MongoDB:", error)
    process.exit(1)
  })

// Rutas principales
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/productos", productoRoutes)
app.use("/api/pedidos", pedidoRoutes)

// Ruta de salud para verificar que el servidor funciona
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Servidor funcionando correctamente",
    timestamp: new Date().toISOString(),
  })
})

// Ruta por defecto
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API de Back-Coffee funcionando",
    version: "1.0.0",
  })
})

// Manejo de rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  })
})

// Middleware de manejo de errores
app.use(errorHandler)

export default app
