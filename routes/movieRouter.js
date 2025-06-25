const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController.js');
const reviewsController = require('../controllers/reviewsController.js');

// get the movies either all or by id
router.get('/', moviesController.listAllMovies);
router.get('/:id', moviesController.showMovie);
router.get('/:id/reviews', reviewsController.showExistingReview);


module.exports = router;