const mongoose = require('mongoose');
const favoritesSchema = new mongoose.Schema(
    {
                
    },
    {
        timestamps: true
    }
);
const Favorites = mongoose.model('Favorites',favoritesSchema);
module.exports = Favorites;