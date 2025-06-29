const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Reference to the movie being reviewed
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  },
  {
    timestamps: true,
  }
);
const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
