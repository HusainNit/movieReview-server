const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController.js');

// get all reviews or a specific review by id
router.get('/', reviewsController.showAllReviews);
router.get('/:id', reviewsController.showSingleReview);
// create a new review
router.post('/', reviewsController.createReview);
// update a review by id
router.put('/:id', reviewsController.updateReview);
// delete a review by id
router.delete('/:id', reviewsController.deleteReview);


module.exports = router;
