const express = require("express");
const router = express.Router();

const moviesController = require("../controllers/moviesController.js");
const reviewsController = require("../controllers/reviewsController.js");
const middleware = require("../middleware");

// get the movies either all or by id
router.get(
  "/",
  moviesController.listAllMovies
);
router.get(
  '/search', 
  moviesController.findMovieName
);




router.put(
  "/:id/Review",
  middleware.stripToken,
  middleware.verifyToken,
  moviesController.MakeReviewDoc
);


module.exports = router;
