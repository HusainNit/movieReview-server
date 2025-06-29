const mongoose = require("mongoose");
const favoritesSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    // Reference to the movie being reviewed
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movies" },
  },
  {
    timestamps: true,
  }
);
const Favorites = mongoose.model("Favorites", favoritesSchema);
module.exports = Favorites;
