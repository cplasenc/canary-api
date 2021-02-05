const express = require('express');
const { getEmpresas, getEmpresa, createEmpresa, updateEmpresa, deleteEmpresa } = require('../controllers/empresas');

const router = express.Router();

router
    .route('./')
    .get(getEmpresas)
    .post(createEmpresa);

router.route('/:id')
    .get(getEmpresa)
    .put(updateEmpresa)
    .delete(deleteEmpresa)

module.exports = router;