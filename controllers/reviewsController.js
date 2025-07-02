const Movies = require("../models/Movie");
const Users = require("../models/User");
const Reviews = require("../models/Review");
const axios = require("axios");


const getMyReviews = async (req, res) => {
  try {
    const userId = res.locals.payload.id;
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = process.env.TMDB_URL;

    // Step 1: Get all reviews by the user and populate movieId
    const reviews = await Reviews.find({ userId })
      .populate("movieId")
      .sort({ createdAt: -1 });

    // Step 2: Fetch TMDB titles for each movie
    const detailedReviews = await Promise.all(
      reviews.map(async (review) => {
        const tmdbId = review.movieId.movieId; // stored TMDB ID as string
        const response = await axios.get(
          `${apiUrl}/movie/${tmdbId}?language=en-US&api_key=${apiKey}`
        );
        const title = response.data.title;

        return {
          ...review.toObject(),
          movieTitle: title,
        };
      })
    );

    res.status(200).json(detailedReviews);
  } catch (error) {
    console.error("Failed to get reviews:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getReviewsByMovieId = async (req, res) => {
  try {
    console.log("inside");
    const tmdbId = req.params.id;

    // Step 1: Find the Movie document by TMDB ID
    const movie = await Movies.findOne({ movieId: tmdbId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Step 2: Find all reviews linked to this movie
    const reviews = await Reviews.find({ movieId: movie._id }).populate("userId");

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {

  getMyReviews,
  getReviewsByMovieId
};
