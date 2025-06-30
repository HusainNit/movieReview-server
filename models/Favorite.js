const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema(
  {
    // Reference to the user who wrote the review
     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    // Reference to the movie being reviewed
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies', required: true },
  },
  {
    timestamps: true,
  }
);
const Favorite = mongoose.model("Favorite", favoriteSchema);
module.exports = Favorite;
