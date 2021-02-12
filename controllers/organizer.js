const Organizer = require("../models/Organizer");
const ErrorResponse = require("../util/errorResponse");
const asyncHandler = require("../middleware/async");

/**
 * @desc        Consigue todos los organizadores
 * @route       GET /api/v1/organizadores
 * @access      Public
 */
exports.getOrganizers = asyncHandler(async (req, res, next) => {
  const organizers = await Organizer.find();

  res.status(200).json({ success: true, data: organizers });
});

/**
 * @desc        Consigue un organizador
 * @route       GET /api/v1/organizadores/:id
 * @access      Public
 */
exports.getOrganizer = asyncHandler(async (req, res, next) => {
  const organizer = await Organizer.findById(req.params.id);

  if (!organizer) {
    return next(
      new ErrorResponse(`Organizador no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: organizer });
});

/**
 * @desc        Crea nueva empresas
 * @route       POST /api/v1/empresas
 * @access      Private
 */
exports.createOrganizer = asyncHandler(async (req, res, next) => {
  const organizer = await Organizer.create(req.body);

  res.status(201).json({
    success: true,
    data: organizer,
  });
});

/**
 * @desc        Actualiza una empresa
 * @route       PUT /api/v1/empresas/:id
 * @access      Public
 */
exports.updateOrganizer = asyncHandler(async (req, res, next) => {
  const organizer = await Organizer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!organizer) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, count: organizer.length, data: organizer });
});

/**
 * @desc        Elimina una empresas
 * @route       DELETE /api/v1/empresas/:id
 * @access      Public
 */
exports.deleteOrganizer = asyncHandler(async (req, res, next) => {
  const organizer = await Organizer.findByIdAndDelete(req.params.id);

  if (!organizer) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});