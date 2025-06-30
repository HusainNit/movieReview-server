const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true, unique: true },
    // title: { type: String, required: true },
    // genre: { type: String },
    // poster: { type: String },
    // releaseDate: { type: String },
    // description: { type: String }
  },
  {
    timestamps: true,
  }
);
const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
