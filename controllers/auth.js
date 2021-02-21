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
    role
  });

  //Crea token
  const token = usuario.getSignedJWTToken();

  res.status(200).json({ success: true, token: token });
});

/**
 * @desc        Iniciar sesión con usuario
 * @route       POST /api/v1/auth/login
 * @access      Public
 */
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
  
    //Validar email y contraseña
    if(!email || !password) {
        return next(new ErrorResponse('Introduce un email y contraseña', 400));
    }

    //Comprobar usuario
    const usuario = await Usuario.findOne({ email: email }).select('+password');

    if(!user) {
        return next(new ErrorResponse('Error al iniciar sesión', 401));
    }

    //comprobar contraseña
    const isMatch = await usuario.matchPassword(password);

    if(!isMatch) {
        return next(new ErrorResponse('Error al iniciar sesión', 401));
    }
  
    //Crea token
    const token = usuario.getSignedJWTToken();
  
    res.status(200).json({ success: true, token: token });
  });
  