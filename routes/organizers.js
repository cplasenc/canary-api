const express = require("express");
const {
  getOrganizers: getOrganizers,
  getOrganizer: getOrganizer,
  createOrganizer: createOrganizer,
  updateOrganizer: updateOrganizer,
  deleteOrganizer: deleteOrganizer,
  getOrganizersInRadius: getOrganizersInRadius
} = require("../controllers/organizers");

const router = express.Router();

router.route('/radius/:zipcode/:distance').get(getOrganizersInRadius);

router.route("./").get(getOrganizers).post(createOrganizer);

router
  .route("/:id")
  .get(getOrganizer)
  .put(updateOrganizer)
  .delete(deleteOrganizer);

module.exports = router;
