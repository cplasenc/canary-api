const Actividad = require("../models/Actividad");
const Organizador = require("../models/Organizador");
const ErrorResponse = require("../util/errorResponse");
const geocoder = require("../util/geocoder");
const asyncHandler = require("../middleware/async");

/**
 * @desc        GET - Consigue todas las actividades
 * @route       GET /api/v1/actividades
 * @route       GET /api/v1/actividades/:actividadId/actividad
 * @access      Public
 */
exports.getActividades = asyncHandler(async (req, res, next) => {
  let consulta;

  if (req.params.actividadId) {
    consulta = Actividad.find({ actividad: req.params.actividadId });
  } else {
    consulta = Actividad.find().populate({
      path: "organizador",
      select: "nombre descripcion",
    });
  }

  const actividad = await consulta;

  res.status(200).json({
    success: true,
    count: actividad.length,
    data: actividad,
  });
});

/**
 * @desc        GET - Consigue una actividad
 * @route       GET /api/v1/actividades/:id
 * @access      Public
 */
exports.getActividad = asyncHandler(async (req, res, next) => {
  const actividad = await (await Actividad.findById(req.params.id)).populated({
    path: "organizador",
    select: "nombre descripcion",
  });

  if (!actividad) {
    return next(
      new ErrorResponse(
        `No se ha encontrado una actividad con el id ${req.params.id}`
      ),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: actividad,
  });
});

/**
 * @desc        POST - Añadir una actividad
 * @route       POST /api/v1/organizadores/:organizadorId/actividad
 * @access      Private
 */
exports.addActividad = asyncHandler(async (req, res, next) => {
  req.body.organizador = req.params.organizadorId;

  const organizador = await await Organizador.findById(
    req.params.organizadorId
  );

  if (!organizador) {
    return next(
      new ErrorResponse(
        `No se ha encontrado un organizador con el id ${req.params.organizadorId}`
      ),
      404
    );
  }

  const actividad = await Actividad.create(req.body);

  res.status(200).json({
    success: true,
    data: actividad,
  });
});

/**
 * @desc        PUT - Actualiza una actividad
 * @route       PUT /api/v1/actividades/:id
 * @access      Private
 */
exports.updateActividad = asyncHandler(async (req, res, next) => {
  let actividad = await Actividad.findById(req.params.id);

  if (!actividad) {
    return next(
      new ErrorResponse(
        `No se ha encontrado una actividad con el id ${req.params.id}`
      ),
      404
    );
  }

  actividad = await Actividad.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: actividad,
  });
});

/**
 * @desc        DELETE - Elimina una actividad
 * @route       DELETE /api/v1/actividades/:id
 * @access      Private
 */
exports.deleteActividad = asyncHandler(async (req, res, next) => {
  const actividad = await Actividad.findById(req.params.id);

  if (!actividad) {
    return next(
      new ErrorResponse(
        `No se ha encontrado una actividad con el id ${req.params.id}`
      ),
      404
    );
  }

  await actividad.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
