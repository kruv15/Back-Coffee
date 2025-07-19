import app from "./src/app.js"
import config from "./src/config.js"

const server = app.listen(config.PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${config.PORT}`)
})

// Manejo de cierre graceful
process.on("SIGTERM", () => {
  console.log("SIGTERM recibido, cerrando servidor...")
  server.close(() => {
    console.log("Servidor cerrado")
    process.exit(0)
  })
})

process.on("SIGINT", () => {
  console.log("SIGINT recibido, cerrando servidor...")
  server.close(() => {
    console.log("Servidor cerrado")
    process.exit(0)
  })
})
