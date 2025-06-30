const express = require('express');
const favoritesController = require('../controllers/favoritesController');
const router = express.Router();



router.get('/profile/:id/favorite', favoritesController.getFavorites)
router.post('/profile/:id/favorite', favoritesController.addFavorite)
router.delete('/profile/:id/favorite/:favoriteId', favoritesController.removeFavorite)



module.exports = router;
