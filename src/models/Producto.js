import mongoose from "mongoose"

const productoSchema = new mongoose.Schema({
  nomProd: {
    type: String,
    required: [true, "El nombre del producto es obligatorio"],
    trim: true,
    maxlength: [100, "El nombre no puede exceder 100 caracteres"],
  },
  descripcionProd: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    trim: true,
    maxlength: [500, "La descripción no puede exceder 500 caracteres"],
  },
  precioProd: {
    type: Number,
    required: [true, "El precio es obligatorio"],
    min: [0, "El precio no puede ser negativo"],
  },
  stock: {
    type: Number,
    required: [true, "El stock es obligatorio"],
    min: [0, "El stock no puede ser negativo"],
    default: 0,
  },
  categoria: {
    type: String,
    required: [true, "La categoría es obligatoria"],
    trim: true,
    enum: {
      values: ["cafe-grano", "cafe-molido", "bebidas-frias", "postres", "accesorios"],
      message: "Categoría no válida",
    },
  },
  imagen: {
    type: String,
    required: [true, "La imagen es obligatoria"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Índice para búsquedas por categoría
productoSchema.index({ categoria: 1 })

// Índice para búsquedas por nombre
productoSchema.index({ nomProd: "text", descripcionProd: "text" })

export default mongoose.model("Producto", productoSchema)
