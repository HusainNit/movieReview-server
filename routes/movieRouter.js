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

router.put(
  "/:id/like",
  middleware.stripToken,
  middleware.verifyToken,
  moviesController.toggleLike
);

// save a movie by id
router.post(
  "/:movieId",
  middleware.stripToken,
  middleware.verifyToken,
  moviesController.saveMovieId
);
// get all movies reviews
router.get("/:movieId/reviews", reviewsController.showAllReviews);
// get a single review by id
router.get("/:movieId/reviews/:reviewId", reviewsController.showSingleReview);
// create a new review
router.post(
  "/:movieId/reviews",
  middleware.stripToken,
  middleware.verifyToken,
  reviewsController.createReview
);
// update a review by id
router.put(
  "/:movieId/reviews/:reviewId",
  middleware.stripToken,
  middleware.verifyToken,
  reviewsController.updateReview
);
// delete a review by id
router.delete(
  "/:movieId/reviews/:reviewId",
  middleware.stripToken,
  middleware.verifyToken,
  reviewsController.deleteReview
);

module.exports = router;
