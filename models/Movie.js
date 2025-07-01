const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true, unique: true },

  },
  {
    timestamps: true,
  }
);
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
