const Movies = require("../models/Movie");
const Users = require("../models/User");
const Reviews = require("../models/Review");
const axios = require("axios");

let countLike, countDislike;

const showAllReviews = async (req, res) => {
  const movieTMDBId = req.params.movieId;
  try {
    const movie = await Movies.findOne({ movieId: movieTMDBId });
    const reviews = await Reviews.find({ movieId: movie._id });
    if (!reviews) {
      return res.send({ message: "No reviews found" });
    }

    countLike = await Reviews.countDocuments({
      movieId: movie._id,
      like: true,
    });
    countDislike = await Reviews.countDocuments({
      movieId: movie._id,
      dislike: true,
    });
    const test = { likes: countLike, dislikes: countDislike, ...reviews };

    res.send(test);
  } catch (error) {
    res.send({ error: "Failed to fetch reviews", details: error.message });
  }
};

const showSingleReview = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    // Validate reviewId
    console.log("Fetching review for reviewId:", reviewId);
    const findReview = await Reviews.findById(reviewId);
    if (!findReview) {
      return res.send({ message: "Review not found" });
    }
    res.send(findReview);
  } catch (error) {
    res.send({ error: "Failed to fetch review", details: error.message });
  }
};

const createReview = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.body.userId;
    // Validate user
    const user = await Users.findById(userId);
    if (!user) {
      return res.send({ message: "User not found" });
    }
    const movie = await Movies.findOne({ movieId: movieId });
    if (!movie) {
      return res.send({ message: "Movie not found" });
    }
    const newReview = await Reviews.create({
      userId: user._id,
      movieId: movie._id,
      ...req.body,
    });
       // Update users's reviews array
    user.reviews.push(newReview._id);
    await user.save();
    //update like and dislike counts

    res.send({ message: "Review created successfully", newReview });
  } catch (error) {
    res.send({ error: "Failed to create review", details: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    // Validate review exists
    const review = await Reviews.findById(reviewId);
    if (!review) {
      return res.send({ message: "Review not found" });
    } else {
      const updatedReview = await Reviews.findOneAndUpdate(
        { _id: reviewId },
        {
          comment: req.body.comment,
          rating: req.body.rating,
          likes: req.body.likes,
          dislikes: req.body.dislikes,
          helpfulVotes: req.body.helpfulVotes,
        },
        { new: true }
      );
      res.send({ message: "Review updated successfully", updatedReview });
    }
  } catch (error) {
    res.send({ error: "Failed to update review", details: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const deletedReview = await Reviews.findOneAndDelete({ _id: reviewId });
    if (!deletedReview) {
      return res.send({ message: "Review not found" });
    }
    res.send({ message: "Review deleted successfully", deletedReview });
  } catch (error) {
    res.send({ error: "Failed to delete review", details: error.message });
  }
};

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
  showAllReviews,
  showSingleReview,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
  getReviewsByMovieId
};
