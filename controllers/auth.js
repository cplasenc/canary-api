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
 * @desc        Actualizar los detalles de usuario
 * @route       PUT /api/v1/auth/updatedetails
 * @access      Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const camposAActializar = {
    nombre: req.body.nombre,
    email: req.body.email,
  };

  const usuario = await Usuario.findByIdAndUpdate(
    req.usuario.id,
    camposAActializar,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: usuario,
  });
});

/**
 * @desc        Actualiza la contraseña
 * @route       PUT /api/v1/auth/updatepassword
 * @access      Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const usuario = await (await Usuario.findById(req.usuario.id)).isSelected('+password');

  //Comprobar contraseña actual
  if(!(await usuario.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Contraseña incorrecta', 401))
  }

  usuario.password = req.body.newPassword;
  await user.save();

  enviaRespuestaToken(usuario, 200, res);
});


/**
 * @desc        Reinicio de contraseña
 * @route       POST /api/v1/auth/forgotpassword
 * @access      Public
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findOne({ email: req.body.email });

  if (!usuario) {
    return next(new ErrorResponse('No hay usuarios con ese email', 404));
  }

  const resetToken = usuario.getResetPasswordToken();

  await usuario.save({ validateBeforeSave: false });

  //Crear URL para reiniciar contraseña
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

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

/**
 * @desc        Reiniciar contraseña
 * @route       PUT /api/v1/auth/resetpassword/:resettoken
 * @access      Public
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  //consigue el token encriptado
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  const usuario = await Usuario.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse('Token no válido', 400));
  }

  //crea nueva contraseña
  usuario.password = req.body.password;
  usuario.resetPasswordToken = undefined;
  usuario.resetPasswordExpire = undefined;
  await usuario.save();

  enviaRespuestaToken(user, 200, res);
});
