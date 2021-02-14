const express = require("express");
const {
  getOrganizers: getOrganizers,
  getOrganizer: getOrganizer,
  createOrganizer: createOrganizer,
  updateOrganizer: updateOrganizer,
  deleteOrganizer: deleteOrganizer,
  getOrganizersInRadius: getOrganizersInRadius
} = require("../controllers/organizers");

//Incluye otras rutas
const actividadRouter = require('./actividades');

const router = express.Router();

//reenruta a otro recurso de rutas
router.use('/:organizadorId/actividades', actividadRouter);

router.route('/radius/:zipcode/:distance').get(getOrganizersInRadius);

router.route("./").get(getOrganizers).post(createOrganizer);

router
  .route("/:id")
  .get(getOrganizer)
  .put(updateOrganizer)
  .delete(deleteOrganizer);

module.exports = router;