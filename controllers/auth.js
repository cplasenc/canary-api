const Usuario = require("../models/Usuario");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/**
 * @desc        Registrar usuario
 * @route       GET /api/v1/auth/register
 * @access      Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { nombre, email, password, role } = req.body;

  //Crear usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    role
  });

  //Crea token
  const token = usuario.getSignedJWTToken();

  res.status(200).json({ success: true, token: token });
});
