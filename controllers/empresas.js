const Empresa = require("../models/Empresa");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleware/async");

/**
 * @desc        Consigue todas las empresas
 * @route       GET /api/v1/empresas
 * @access      Public
 */
exports.getEmpresas = asyncHandler(async (req, res, next) => {
  const empresas = await Empresa.find();

  res.status(200).json({ success: true, data: bootcamps });
});

/**
 * @desc        Consigue una empresas
 * @route       GET /api/v1/empresas/:id
 * @access      Public
 */
exports.getEmpresa = asyncHandler(async (req, res, next) => {
  const empresa = await Empresa.findById(req.params.id);

  if (!empresa) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: empresa });
});

/**
 * @desc        Crea nueva empresas
 * @route       POST /api/v1/empresas
 * @access      Private
 */
exports.createEmpresa = asyncHandler(async (req, res, next) => {
  const empresa = await Empresa.create(req.body);

  res.status(201).json({
    success: true,
    data: empresa,
  });
});

/**
 * @desc        Actualiza una empresa
 * @route       PUT /api/v1/empresas/:id
 * @access      Public
 */
exports.updateEmpresa = asyncHandler(async (req, res, next) => {
  const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!empresa) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, count: empresa.length, data: empresa });
});

/**
 * @desc        Elimina una empresas
 * @route       DELETE /api/v1/empresas/:id
 * @access      Public
 */
exports.deleteEmpresa = asyncHandler(async (req, res, next) => {
  const empresa = await Empresa.findByIdAndDelete(req.params.id);

  if (!empresa) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
