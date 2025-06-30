const mongoose = require('mongoose');
const favoritesSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies', required: true }

    },
    {
        timestamps: true
    }
);
const Favorites = mongoose.model('Favorites',favoritesSchema);
module.exports = Favorites;