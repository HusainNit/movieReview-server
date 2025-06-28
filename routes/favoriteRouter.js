const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();



router.get('/', favoritesController.getFavorites)
router.post('/', favoritesController.addFavorite)
router.delete('/:movieId', favoritesController.removeFavorite )


module.exports = router;
