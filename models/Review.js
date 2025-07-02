const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Reference to the movie being reviewed
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    // Review content
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, default: "" },
    like: { type: Boolean, default: false },
    dislike: { type: Boolean, default: false },

    // to track how many users found the review helpful and enforce each user to have only one vote
    helpfulVotes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
