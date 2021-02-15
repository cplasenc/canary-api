const express = require("express");
const {
  getActividades,
  getActividad,
  addActividad,
} = require("../controllers/actividades");

const router = express.Router({ mergeParams: true });

router.route("/").get(getActividades).post(addActividad);
router.route("/:id").get(getActividad);

module.exports = router;
