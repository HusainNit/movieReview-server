const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // Reference to the movie being reviewed
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  },
  {
    timestamps: true,
  }
);
const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
