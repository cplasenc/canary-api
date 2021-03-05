const Opinion = require('../models/Opinion');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

/**
 * @desc        GET - Consigue todas las opiniones
 * @route       GET /api/v1/opiniones
 * @route       GET /api/v1/actividades/:actividadId/opiniones
 * @access      Public
 */
exports.getOpiniones = asyncHandler(async (req, res, next) => {
  if (req.params.actividadId) {
    const opiniones = await Opinion.find({
      actividad: req.params.actividadId,
    });

    return res.status(200).json({
      success: true,
      count: opiniones.length,
      data: opiniones,
    });
  } else {
    res.status(200).json(res.resultadosAvanzados);
  }
});
