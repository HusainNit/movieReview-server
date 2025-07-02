const Favorite = require("../models/Favorite");
const User = require("../models/User");
const Movie = require("../models/Movie");
const mongoose = require("mongoose");
const axios = require("axios");


// Remove a movie from favorites
const removeFavorite = async (req, res) => {
  try {
    const tmdbId = req.params.id;
    const userId = res.locals.payload.id;

    const movie = await Movie.findOne({ movieId: tmdbId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found in database" });
    }

    const favorite = await Favorite.findOne({
      userId,
      movieId: movie._id,
    });

    if (!favorite) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    await Favorite.findByIdAndDelete(favorite._id);

    // // https://www.geeksforgeeks.org/node-js/how-to-pull-item-from-an-array-in-mongoose/
    await User.findByIdAndUpdate(userId, {
      $pull: { favorites: favorite._id },
    });

    res.send(`Favorite with ID  has been deleted successfully!`);
  } catch (error) {
    console.error("An error has occurred deleting a favorite!", error.message);
  }
};

const GetMyFavorite = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload;

    // Get all favorites for the user and populate the movie reference
    let favorites = await Favorite.find({ userId }).populate("movieId");

    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = process.env.TMDB_URL;

    // Map over favorites and fetch TMDB data for each movie
    const detailedMovies = await Promise.all(
      favorites.map(async (fav) => {
        const tmdbId = fav.movieId.movieId;
        const response = await axios.get(
          `${apiUrl}/movie/${tmdbId}?language=en-US&api_key=${apiKey}`
        );
        return response.data;
      })
    );

    // console.log(detailedMovies);

    res.json({ favorites: detailedMovies });
  } catch (error) {
    console.error("An error has occurred in getting favorite!", error.message);
  }
};

module.exports = {
  removeFavorite,
  GetMyFavorite,
};
