const express = require("express");
const {
  getActividades,
  getActividad,
  addActividad,
  updateActividad,
  deleteActividad,
} = require("../controllers/actividades");

const router = express.Router({ mergeParams: true });

router.route("/").get(getActividades).post(addActividad);

router.route("/:id").get(getActividad).put(updateActividad).delete(deleteActividad);

module.exports = router;
