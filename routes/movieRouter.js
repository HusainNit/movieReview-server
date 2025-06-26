const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController.js');
const reviewsController = require('../controllers/reviewsController.js');

// get the movies either all or by id
router.get('/', moviesController.listAllMovies);
router.get('/:movieId', moviesController.showMovie);
router.post('/:movieId', moviesController.saveMovieId);

// router.get('/:id/reviews', reviewsController.showExistingReview);

// get all reviews or a specific review by id
router.get('/:movieId/reviews', reviewsController.showAllReviews);
router.get('/:movieId/reviews/:reviewId', reviewsController.showSingleReview);
// create a new review
router.post('/:movieId/reviews', reviewsController.createReview);
// update a review by id
router.put('/:movieId/reviews/:reviewId', reviewsController.updateReview);
// delete a review by id
router.delete('/:movieId/reviews/:reviewId', reviewsController.deleteReview);


module.exports = router;