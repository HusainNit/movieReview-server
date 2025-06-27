const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/moviesController.js");
const reviewsController = require("../controllers/reviewsController.js");
const middleware = require("../middleware");

// get the movies either all or by id
router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  moviesController.listAllMovies
);
router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  moviesController.showMovie
);
// router.get('/:id/reviews', reviewsController.showExistingReview);

module.exports = router;
