const Empresa = require("../models/Empresa");
const ErrorResponse = require("../util/errorResponse");

/**
 * @desc        Consigue todas las empresas
 * @route       GET /api/v1/empresas
 * @access      Public
 */
exports.getEmpresas = async (req, res, next) => {
  try {
    const empresas = await Empresa.find();

    res.status(200).json({ success: true, data: bootcamps });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/**
 * @desc        Consigue una empresas
 * @route       GET /api/v1/empresas/:id
 * @access      Public
 */
exports.getEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findById(req.params.id);

    if (!empresa) {
      return next(
        new ErrorResponse(
          `Empresa no encontrada con el id ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({ success: true, data: empresa });
  } catch (err) {
    //res.status(400).json({ success: false });
    //custom error
    next(
      new ErrorResponse(`Empresa no encontrada con el id ${req.params.id}`, 404)
    );
  }
};

/**
 * @desc        Crea nueva empresas
 * @route       POST /api/v1/empresas
 * @access      Private
 */
exports.createEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.create(req.body);

    res.status(201).json({
      success: true,
      data: empresa,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

/**
 * @desc        Actualiza una empresa
 * @route       PUT /api/v1/empresas/:id
 * @access      Public
 */
exports.updateEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!empresa) {
      return res.status(400).json({ success: false });
    }

    res
      .status(200)
      .json({ success: true, count: empresa.length, data: empresa });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

/**
 * @desc        Elimina una empresas
 * @route       DELETE /api/v1/empresas/:id
 * @access      Public
 */
exports.deleteEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.findByIdAndDelete(req.params.id);

    if (!empresa) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};
