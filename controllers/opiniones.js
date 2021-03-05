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

/**
 * @desc        GET - Consigue una sola opinion
 * @route       GET /api/v1/opiniones/:id
 * @access      Public
 */
exports.getOpinion = asyncHandler(async (req, res, next) => {
  const opinion = await Opinion.findById(req.params.id).populate({
    path: 'actividad',
    select: 'nombre descripcion',
  });

  if (!opinion) {
    return next(
      new ErrorResponse(
        `No se ha encontrado opinión con la id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    data: opinion,
  });
});
