const mongoose = require('mongoose');
const reviewsSchema = new mongoose.Schema(
    {
                
    },
    {
        timestamps: true
    }
);
const Reviews = mongoose.model('Reviews',reviewsSchema);
module.exports = Reviews;