const express = require("express");
const resultadosAvanzados = require('../middleware/resultadosAvanzados');
const Organizador = require('../models/Organizador');
const {
  getOrganizadores,
  getOrganizador,
  createOrganizador,
  updateOrganizador,
  deleteOrganizador,
  getOrganizadorInRadius,
  uploadImagenOrganizador
} = require("../controllers/organizadores");

//Incluye otras rutas
const actividadRouter = require('./actividades');

const router = express.Router();

//reenruta a otro recurso de rutas
router.use('/:organizadorId/actividades', actividadRouter);

router.route('/radius/:zipcode/:distance').get(getOrganizadorInRadius);

router.route("/:id/photo").put(uploadImagenOrganizador);

router.route("/").get(resultadosAvanzados(Organizador, 'actividades'), getOrganizadores).post(createOrganizador);

router
  .route("/:id")
  .get(getOrganizador)
  .put(updateOrganizador)
  .delete(deleteOrganizador);

module.exports = router;