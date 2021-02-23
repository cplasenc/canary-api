const Organizador = require("../models/Organizador");
const ErrorResponse = require("../utils/errorResponse");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middleware/async");
/**
 * @desc        Consigue todos los organizadores
 * @route       GET /api/v1/organizadores
 * @access      Public
 */
exports.getOrganizadores = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.resultadosAvanzados);
});

/**
 * @desc        Consigue un organizador
 * @route       GET /api/v1/organizadores/:id
 * @access      Public
 */
exports.getOrganizador = asyncHandler(async (req, res, next) => {
  const organizer = await Organizador.findById(req.params.id);

  if (!organizer) {
    return next(
      new ErrorResponse(
        `Organizador no encontrada con el id ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: organizer });
});

/**
 * @desc        Crea nueva empresas
 * @route       POST /api/v1/empresas
 * @access      Private
 */
exports.createOrganizador = asyncHandler(async (req, res, next) => {
  //añadir usuario a req.body
  req.body.usuario = req.usuario.id;

  //Comprobar que solo publica un organizador
  const organizadorPublicado = await Organizador.findOne({
    user: req.usuario.id,
  });

  //si no es admin solo puede publicar uno
  if (organizadorPublicado && req.usuario.role != "admin") {
    return next(
      new ErrorResponse(
        `El usuario con id ${req.usuario.id} ya ha publicado un Organizador`,
        400
      )
    );
  }
  
  const organizador = await Organizador.create(req.body);

  res.status(201).json({
    success: true,
    data: organizador,
  });
});

/**
 * @desc        Actualiza una empresa
 * @route       PUT /api/v1/empresas/:id
 * @access      Public
 */
exports.updateOrganizador = asyncHandler(async (req, res, next) => {
  const organizer = await Organizador.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!organizer) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({ success: true, count: organizer.length, data: organizer });
});

/**
 * @desc        Elimina una empresas
 * @route       DELETE /api/v1/empresas/:id
 * @access      Public
 */
exports.deleteOrganizador = asyncHandler(async (req, res, next) => {
  const organizador = await Organizador.findById(req.params.id);

  if (!organizador) {
    return next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }

  organizador.remove();

  res.status(200).json({ success: true, data: {} });
});

/**
 * @desc        GET - consigue a los Organizadores dentro de un radio (km)
 * @route       DELETE /api/v1/organizadores/radius/:zipcode/:distance
 * @access      Private
 */
exports.getOrganizadorInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // GET lat/long de geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  //Calcular radio
  const radius = distance / 6378;
  const organizers = await Organizador.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: organizers.length,
    data: organizers,
  });
});

/**
 * @desc        Sube imagen para organizador
 * @route       PUT /api/v1/organizadores/:id/photo
 * @access      Private
 */
exports.uploadImagenOrganizador = asyncHandler(async (req, res, next) => {
  const organizador = await Organizador.findById(req.params.id);

  if (!organizador) {
    return next(
      new ErrorResponse(
        `No se ha encontrado un organizador con el id ${req.params.id}`
      ),
      404
    );
  }

  if (!req.files) {
    return next(new ErrorResponse("Añade una imagen"), 400);
  }
});
