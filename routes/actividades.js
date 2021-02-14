const express = require("express");
const { getCourses } = require("../controllers/actividades");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses);

module.exports = router;