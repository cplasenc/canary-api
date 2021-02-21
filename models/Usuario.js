const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

//Encriptar contraseña con bycriptjs
UsuarioSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
