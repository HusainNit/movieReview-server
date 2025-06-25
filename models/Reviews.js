const mongoose = require('mongoose');
const reviewsSchema = new mongoose.Schema(
    {
        // Reference to the user who wrote the review
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users'}, 
        // Reference to the movie being reviewed
        movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movies' },
        // Review content
        rating: { type: Number, required: true, min: 1, max: 5},
        comment: { type: String, required: true},
        editedComment: { type: String },
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        isEdited: { type: Boolean, default: false },
        // to track how many users found the review helpful and enforce each user to have only one vote
        helpfulVotes: { type: Number, default: 0 },
        helpfulBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }]
    },
    {
        timestamps: true
    }
);
const Reviews = mongoose.model('Reviews',reviewsSchema);
module.exports = Reviews;