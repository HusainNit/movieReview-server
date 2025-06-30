const Favorite = require('../models/Favorite');
const User = require('../models/User')

// Get all favorite movies for the logged-in user
const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.params.id }).populate('movieId')
    res.send(favorites)
  } catch (error) {
    console.error('Error getting favorites:', error.message)
  }
}

// Add a movie to favorites
const addFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const favorite = await Favorite.create(req.body);
    res.send(favorite)
  } catch (error) {
    console.error('Failed to add favorite!', error.message)
  }
}

// Remove a movie from favorites
const removeFavorite = async (req, res) => {
  try {
    await Favorite.findByIdAndDelete(req.params.favoriteId);

    res.send(`Favorite with ID ${req.params.favoriteId} has been deleted successfully!`)

  } catch (error) {
    console.error('An error has occurred deleting a favorite!', error.message)
  }
}


module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite
}