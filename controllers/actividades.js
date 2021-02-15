const Actividad = require("../models/Actividad");
const ErrorResponse = require("../util/errorResponse");
const geocoder = require("../util/geocoder");
const asyncHandler = require("../middleware/async");

/**
 * @desc        GET - Consigue todas las actividades
 * @route       GET /api/v1/actividades
 * @route       GET /api/v1/actividades/:actividadId/actividad
 * @access      Public
 */
exports.getActividad = asyncHandler(async (req, res, next) => {
  let consulta;

  if (req.params.actividadId) {
    consulta = Actividad.find({ actividad: req.params.actividadId });
  } else {
    consulta = Actividad.find().populate({
      path: 'organizador',
      select: 'nombre descripcion'
    });
  }

  const actividad = await consulta;

  res.status(200).json({
    success: true,
    count: actividad.length,
    data: actividad,
  });
});
