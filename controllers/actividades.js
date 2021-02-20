const Actividad = require("../models/Actividad");
const Organizador = require("../models/Organizador");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
const path = require("path");

/**
 * @desc        GET - Consigue todas las actividades
 * @route       GET /api/v1/actividades
 * @route       GET /api/v1/actividades/:actividadId/actividad
 * @access      Public
 */
exports.getActividades = asyncHandler(async (req, res, next) => {
  if (req.params.actividadId) {
    const actividades = await Actividad.find({
      actividad: req.params.actividadId,
    });
    return res.status(200).json({
      success: true,
      count: actividades.length,
      data: actividades,
    });
  } else {
    res.status(200).json(res.resultadosAvanzados);
  }
});

/**
 * @desc        GET - Consigue una actividad
 * @route       GET /api/v1/actividades/:id
 * @access      Public
 */
exports.getActividad = asyncHandler(async (req, res, next) => {
  const actividad = await Actividad.findById(req.params.id).populate({
    path: "organizador",
    select: "name description",
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

/**
 * @desc        Sube imagen para actividad
 * @route       PUT /api/v1/actividades/:id/photo
 * @access      Private
 */
exports.uploadImagenActividad = asyncHandler(async (req, res, next) => {
  const actividad = await Actividad.findById(req.params.id);

  if (!actividad) {
    return next(
      new ErrorResponse(
        `No se ha encontrado una actividad con el id ${req.params.id}`
      ),
      404
    );
  }

  if (!req.files) {
    return next(new ErrorResponse("Añade una imagen"), 400);
  }

  const imagen = req.files.file;

  //comprobar que es una imagen
  if (!imagen.mimetype.startsWith("image")) {
    return next(new ErrorResponse("No es una imagen. Añade una imagen"), 400);
  }
  //comprobar tamaño
  const imgSize = 1000000;
  if (imagen.size > imgSize) {
    return next(
      new ErrorResponse(`Añade una imagen de un tamaño menor a ${imgSize}`),
      400
    );
  }

  //nombre de la imagen
  imagen.name = `photo_${actividad._id}${path.parse(file.name).ext}`;

  imagen.mv(`.public/uploads/${imagen.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("Problema al añadir la imagen"), 500);
    }

    await Actividad.findByIdAndUpdate(req.params.id, { photo: imagen.name });

    res.status(200).json({
      success: true,
      data: imagen.name,
    });
  });
});
