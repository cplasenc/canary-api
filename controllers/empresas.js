const Empresa = require("../models/Empresa");

//@desc        Consigue todas las empresas
//@route       GET /api/v1/empresas
//@access      Public
exports.getEmpresas = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Muestra todas" });
};

//@desc        Consigue una empresas
//@route       GET /api/v1/empresas/:id
//@access      Public
exports.getEmpresa = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Muestra una" });
};

//@desc        Crea nueva empresas
//@route       POST /api/v1/empresas
//@access      Private
exports.createEmpresa = async (req, res, next) => {
  try {
    const empresa = await Empresa.create(req.body);

    res.status(201).json({
      success: true,
      data: empresa,
    });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc        Actualiza una empresa
//@route       PUT /api/v1/empresas/:id
//@access      Public
exports.updateEmpresa = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Actualiza" });
};

//@desc        Elimina una empresas
//@route       DELETE /api/v1/empresas/:id
//@access      Public
exports.deleteEmpresa = (req, res, next) => {
  res.status(200).json({ success: true, msg: "Elimina" });
};
