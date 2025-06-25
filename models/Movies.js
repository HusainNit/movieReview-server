const mongoose = require('mongoose');
const moviesSchema = new mongoose.Schema(
    { 
        movieId : { type: String, required: true, unique: true }
    },
    {
        timestamps: true
    }
);
const Movies = mongoose.model('Movies',moviesSchema);
module.exports = Movies;