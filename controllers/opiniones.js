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

/**
 * @desc        Añade una opinión
 * @route       POST /api/v1/actividades/:actividadId/opiniones
 * @access      Private
 */
exports.addOpinion = asyncHandler(async (req, res, next) => {
  req.body.actividad = req.params.actividadId;
  req.body.usuario = req.usuario.id;

  const actividad = await Actividad.findById(req.params.actividadId);

  if (!actividad) {
    return next(
      new ErrorResponse(`No hay activdad con id ${req.params.actividadId}`, 404)
    );
  }

  const opinion = await Opinion.create(req.body);

  res.status(201).json({
    success: true,
    data: opinion,
  });
});

/**
 * @desc        Actualizar una opinión
 * @route       PUT /api/v1/opiniones/:id
 * @access      Private
 */
exports.updateOpinion = asyncHandler(async (req, res, next) => {
  let opinion = await Opinion.findById(req.params.id);

  if (!opinion) {
    return next(
      new ErrorResponse(`No hay opinion con id ${req.params.id}`, 404)
    );
  }

  //comprobacion - opinion editada pertenece a usuario
  if (
    opinion.usuario.toString() !== req.usuario.id &&
    req.usuario.role !== 'admin'
  ) {
    return next(
      new ErrorResponse('No tienes permisos para editar esta opinion', 401)
    );
  }

  opinion = await Opinion.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: opinion,
  });
});

/**
 * @desc        Elimina una opinión
 * @route       DELETE /api/v1/opiniones/:id
 * @access      Private
 */
exports.deleteOpinion = asyncHandler(async (req, res, next) => {
  const opinion = await Opinion.findById(req.params.id);

  if (!opinion) {
    return next(
      new ErrorResponse(`No hay opinion con id ${req.params.id}`, 404)
    );
  }

  //comprobacion - opinion editada pertenece a usuario
  if (
    opinion.usuario.toString() !== req.usuario.id &&
    req.usuario.role !== 'admin'
  ) {
    return next(
      new ErrorResponse('No tienes permisos para editar esta opinion', 401)
    );
  }

  await opinion.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
