const express = require("express");
const Actividad = require("../models/Actividad");
const resultadosAvanzados = require("../middleware/resultadosAvanzados");
const {
  getActividades,
  getActividad,
  addActividad,
  updateActividad,
  deleteActividad,
  uploadImagenActividad,
} = require("../controllers/actividades");

const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router
  .route("/")
  .get(
    resultadosAvanzados(Actividad, {
      path: "actividad",
      select: "name description",
    }),
    getActividades
  )
  .post(protect, addActividad);

router
  .route("/:id")
  .get(getActividad)
  .put(protect, updateActividad)
  .delete(protect, deleteActividad);

router.route("/:id/photo").put(uploadImagenActividad);

module.exports = router;
