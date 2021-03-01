const Usuario = require('../models/Usuario');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const enviarEmail = require('../utils/enviarEmail');

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
    return next(new ErrorResponse('Introduce un email y contraseña', 400));
  }

  //Comprobar usuario
  const usuario = await Usuario.findOne({ email: email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Error al iniciar sesión', 401));
  }

  //comprobar contraseña
  const isMatch = await usuario.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Error al iniciar sesión', 401));
  }

  enviaRespuestaToken(user, 200, res);
});

/**
 * @desc        Consigue el usuario con sesión iniciada
 * @route       GET /api/v1/auth/me
 * @access      Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.usuario.id);

  res.status(200).json({
    success: true,
    data: usuario,
  });
});

/**
 * @desc        Reinicio de contraseña
 * @route       POST /api/v1/auth/forgotpassword
 * @access      Public
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findOne({ email: req.body.email });

  if (!usuario) {
    return next(new ErrorResponse('No hay usuarios con ese email', 404));
  }

  const resetToken = usuario.getResetPasswordToken();

  await usuario.save({ validateBeforeSave: false });

  //Crear URL para reiniciar contraseña
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/resetpassword/${resetToken}`;

  const mensaje = `Haz click en este enlace para reinicar tu contraseña: ${resetURL}`;

  try {
    await enviarEmail({
      email: usuario.email,
      subject: 'Token para reiniciar contraseña',
      mensaje,
    });

    res.status(200).json({ success: true, data: 'Email enviado' });
  } catch (err) {
    usuario.resetPasswordToken = undefined;
    usuario.resetPasswordExpire = undefined;

    await usuario.save({ validateBeforeSave: false });

    return next(new ErrorResponse('El email no ha podido ser enviado'), 500);
  }

  res.status(200).json({
    success: true,
    data: usuario,
  });
});

//consigue token del modelo, crea cookie y envia respuesta
const enviaRespuestaToken = (user, statusCode, res) => {
  //Crea token
  const token = usuario.getSignedJWTToken();

  const options = {
    expires: new Date(Date.now + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
