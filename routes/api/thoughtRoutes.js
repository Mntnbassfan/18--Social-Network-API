const router = require("express").Router();

const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  // addReaction,
  // deleteReaction,
} = require("../../controllers/thoughtController");

// Set up GET all and POST at /api/thoughts
router.route("/").get(getThought).post(createThought);

// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// getSingleThought

module.exports = router;