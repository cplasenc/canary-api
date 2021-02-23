const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
  if(!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//JWT
UsuarioSchema.methods.getSignedJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Comprar contraseña introducida con contraseña encriptada
UsuarioSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generar y encriptar token de contraseña
UsuarioSchema.methods.getResetPasswordToken = function () {
  //generar token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //encriptar
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  //caducidad
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Usuario", UsuarioSchema);
