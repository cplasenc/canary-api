const Usuario = require("../models/Usuario");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/**
 * @desc        Registrar usuario
 * @route       POST /api/v1/auth/register
 * @access      Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { nombre, email, password, role } = req.body;

  //Crear usuario
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    role,
  });

  enviaRespuestaToken(user, 200, res);
});

/**
 * @desc        Iniciar sesión con usuario
 * @route       POST /api/v1/auth/login
 * @access      Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //Validar email y contraseña
  if (!email || !password) {
    return next(new ErrorResponse("Introduce un email y contraseña", 400));
  }

  //Comprobar usuario
  const usuario = await Usuario.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Error al iniciar sesión", 401));
  }

  //comprobar contraseña
  const isMatch = await usuario.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Error al iniciar sesión", 401));
  }

  enviaRespuestaToken(user, 200, res);
});

//consigue token del modelo, crea cookie y envia respuesta
const enviaRespuestaToken = (user, statusCode, res) => {
  //Crea token
  const token = usuario.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true
  };



  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
