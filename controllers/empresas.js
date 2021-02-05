//@desc        Consigue todas las empresas
//@route       GET /api/v1/empresas
//@access      Public
exports.getEmpresas = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Muestra todas'});
}

//@desc        Consigue una empresas
//@route       GET /api/v1/empresas/:id
//@access      Public
exports.getEmpresa = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Muestra una'});
}

//@desc        Crea nueva empresas
//@route       POST /api/v1/empresas
//@access      Private
exports.createEmpresa = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Crea'});
}

//@desc        Actualiza una empresa
//@route       PUT /api/v1/empresas/:id
//@access      Public
exports.updateEmpresa = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Actualiza'});
}

//@desc        Elimina una empresas
//@route       DELETE /api/v1/empresas/:id
//@access      Public
exports.deleteEmpresa = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Elimina'});
}