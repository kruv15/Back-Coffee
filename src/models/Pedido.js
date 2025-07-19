import mongoose from "mongoose"

const pedidoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El ID del usuario es obligatorio"],
  },
  productos: [
    {
      productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
        required: true,
      },
      cantidad: {
        type: Number,
        required: true,
        min: [1, "La cantidad debe ser al menos 1"],
      },
      precio: {
        type: Number,
        required: true,
        min: [0, "El precio no puede ser negativo"],
      },
    },
  ],
  total: {
    type: Number,
    required: [true, "El total es obligatorio"],
    min: [0, "El total no puede ser negativo"],
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["pendiente", "confirmado", "preparando", "listo", "entregado", "cancelado"],
      message: "Estado no válido",
    },
    default: "pendiente",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Índice para búsquedas por usuario
pedidoSchema.index({ userId: 1 })

// Índice para búsquedas por estado
pedidoSchema.index({ status: 1 })

export default mongoose.model("Pedido", pedidoSchema)
