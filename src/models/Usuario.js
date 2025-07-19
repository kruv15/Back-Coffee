import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const usuarioSchema = new mongoose.Schema({
  nombreUsr: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    trim: true,
    maxlength: [50, "El nombre no puede exceder 50 caracteres"],
  },
  apellidoUsr: {
    type: String,
    required: [true, "El apellido es obligatorio"],
    trim: true,
    maxlength: [50, "El apellido no puede exceder 50 caracteres"],
  },
  celUsr: {
    type: String,
    required: [true, "El celular es obligatorio"],
    trim: true,
    match: [/^[0-9]{8}$/, "El celular debe tener 8 dígitos"],
  },
  emailUsr: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email inválido"],
  },
  contraseña: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"],
    select: false,
  },
  roleUsr: {
    type: Boolean,
    default: false, // false = usuario normal, true = administrador
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Middleware para hashear contraseña antes de guardar
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) return next()

  try {
    const { default: config } = await import("../config.js")
    this.contraseña = await bcrypt.hash(this.contraseña, config.BCRYPT_ROUNDS)
    next()
  } catch (error) {
    next(error)
  }
})

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function (contraseñaIngresada) {
  return await bcrypt.compare(contraseñaIngresada, this.contraseña)
}

// Método para obtener datos públicos del usuario
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject()
  delete usuario.contraseña
  return usuario
}

export default mongoose.model("Usuario", usuarioSchema)
