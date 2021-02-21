const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "Añade un nombre de usuario"],
  },
  email: {
    type: String,
    required: [true, "Añade un email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor añade un email",
    ],
  },
  role: {
    type: String,
    enum: ["usuario", "publisher"],
    default: "usuario",
  },
  password: {
    type: String,
    required: [true, "Añade una contraseña"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
