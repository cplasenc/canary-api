const Usuario = require('../models/Usuario');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @desc        Consigue todos los usuarios
 * @route       GET /api/v1/auth/users
 * @access      Private/Admin
 */
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.resultadosAvanzados);
});

/**
 * @desc        Consigue un solo usuario
 * @route       GET /api/v1/auth/users/:id
 * @access      Private/Admin
 */
exports.getUser = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: usuario,
  });
});

/**
 * @desc        Crea usuario
 * @route       POST /api/v1/auth/users/
 * @access      Private/Admin
 */
exports.createUser = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.body);

  res.status(201).json({
    success: true,
    data: usuario,
  });
});

/**
 * @desc        Actualizar usuario
 * @route       POST /api/v1/auth/users/:id
 * @access      Private/Admin
 */
exports.updateUser = asyncHandler(async (req, res, next) => {
  const usuario = await Usuario.findById(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: usuario,
  });
});

/**
 * @desc        Eliminar usuario
 * @route       DELETE /api/v1/auth/users/:id
 * @access      Private/Admin
 */
exports.deleteUser = asyncHandler(async (req, res, next) => {
    await Usuario.findByIdAndDelete(req.params.id);
  
    res.status(200).json({
      success: true,
      data: {},
    });
  });
  