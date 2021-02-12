const express = require("express");
const {
  getOrganizers: getOrganizers,
  getOrganizer: getOrganizer,
  createOrganizer: createOrganizer,
  updateOrganizer: updateOrganizer,
  deleteOrganizer: deleteOrganizer,
  createOrganizer,
  updateOrganizer,
} = require("../controllers/organizer");

const router = express.Router();

router.route("./").get(getOrganizers).post(createOrganizer);

router
  .route("/:id")
  .get(getOrganizer)
  .put(updateOrganizer)
  .delete(deleteOrganizer);

module.exports = router;
