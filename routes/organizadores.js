const express = require("express");
const {
  getOrganizadores,
  getOrganizador,
  createOrganizador,
  updateOrganizador,
  deleteOrganizador,
  getOrganizadorInRadius
} = require("../controllers/organizadores");

//Incluye otras rutas
const actividadRouter = require('./actividades');

const router = express.Router();

//reenruta a otro recurso de rutas
router.use('/:organizadorId/actividades', actividadRouter);

router.route('/radius/:zipcode/:distance').get(getOrganizadorInRadius);

router.route("/").get(getOrganizadores).post(createOrganizador);

router
  .route("/:id")
  .get(getOrganizador)
  .put(updateOrganizador)
  .delete(deleteOrganizador);

module.exports = router;