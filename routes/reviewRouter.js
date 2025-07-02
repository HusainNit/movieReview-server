const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewsController.js");
const middleware = require("../middleware");

router.get(
  "/my-reviews",
  middleware.stripToken,
  middleware.verifyToken,
  reviewController.getMyReviews
);


router.get(
  "/all-reviews",
  middleware.stripToken,
  middleware.verifyToken,
  reviewController.showAllReviews
);

router.get(
  "/:id",
  middleware.stripToken,
  middleware.verifyToken,
  reviewController.getReviewsByMovieId
);

module.exports = router;
