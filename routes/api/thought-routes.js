const router = require("express").Router();
const {
  getAllThoughts,
  createThought,
  getOneThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:_id")
  .get(getOneThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:_id/reactions").post(createReaction);

router.route("/:thoughtId/reactions/:reactionsId").delete(deleteReaction);

module.exports = router;
