const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController.js');
const reviewsController = require('../controllers/reviewsController.js');

// get the list of all movies
router.get('/', moviesController.listAllMovies);
// get movie details by id
router.get('/:movieId', moviesController.showMovie);
// save a movie by id
router.post('/:movieId', moviesController.saveMovieId);
// get all movies reviews
router.get('/:movieId/reviews', reviewsController.showAllReviews);
// get a single review by id
router.get('/:movieId/reviews/:reviewId', reviewsController.showSingleReview);
// create a new review
router.post('/:movieId/reviews', reviewsController.createReview);
// update a review by id
router.put('/:movieId/reviews/:reviewId', reviewsController.updateReview);
// delete a review by id
router.delete('/:movieId/reviews/:reviewId', reviewsController.deleteReview);


module.exports = router;