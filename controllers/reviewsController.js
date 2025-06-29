const Movies = require("../models/Movie");
const Users = require("../models/User");
const Reviews = require("../models/Review");
let countLike, countDislike;

const showAllReviews = async (req, res) => {
  const movieTMDBId = req.params.movieId;
  try {
    const movie = await Movies.findOne({ movieId: movieTMDBId });
    const reviews = await Reviews.find({ movieId: movie._id });
    if (!reviews) {
      return res.send({ message: "No reviews found" });
    }

    countLike = await Reviews.countDocuments({ movieId: movie._id, likes: true });
    countDislike = await Reviews.countDocuments({
      movieId: movie._id,
      dislikes: true,
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
          isEdited: true,
          comment: review.comment,
          editedComment: req.body.editedComment,
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

module.exports = {
  showAllReviews,
  showSingleReview,
  createReview,
  updateReview,
  deleteReview,
};
