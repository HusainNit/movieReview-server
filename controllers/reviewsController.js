const Movies = require('../models/Movies');
const Users = require('../models/Users');
const Reviews = require('../models/Reviews');

const showAllReviews = async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const reviews = await Movies.find({ _id: movieId }).populate('reviews');
        if (!reviews) {
            return res.send({ message: 'No reviews found' });
        }
        res.send(reviews);
    } catch (error) {
        res.send({ error: 'Failed to fetch reviews', details: error.message });
    }
}

const showSingleReview = async (req, res) => {
    const movieId = req.params.movieId;
    const reviewId = req.params.reviewId;
    try {
 
            const findReview = await Reviews.findOne({_id: reviewId });
            if (!findReview) {
                return res.send({ message: 'Review not found' });
            }
            res.send(findReview);
        
        } catch (error) {
        res.send({ error: 'Failed to fetch review', details: error.message });
    }
}

const createReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const userId = req.body.userId;

        // Validate user
        const user = await Users.findById(userId);
        if (!user) {
            return res.send({ message: 'User not found' });
        }

        const movie = await Movies.findById(movieId);
        if (!movie) {
            return res.send({ message: 'Movie not found' });
        }

        await Reviews.create({
            userId: user._id,
            movieId: movie._id,
            rating: req.body.rating,
            comment: req.body.content,
            editedComment: req.body.editedComment,
            isEdited: req.body.isEdited,
            likes: req.body.likes,
            dislikes: req.body.dislikes,
            helpfulVotes: req.body.helpfulVotes,
            helpfulBy: req.body.helpfulBy
        });

        res.send({ message: 'Review created successfully', movieId, userId, content, rating });

        
    } catch (error) {
        res.send({ error: 'Failed to create review', details: error.message });
    }
}

const updateReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviewId = req.params.reviewId;

        const updatedMovie = await Movies.findOneAndUpdate(
            { _id: movieId, 'reviews._id': reviewId },
            req.body ,
            { new: true }
        ).populate('reviews');

        res.send(updatedMovie);
    } catch (error) {
        res.send({ error: 'Failed to update review', details: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const reviewId = req.params.reviewId;

        const deletedReview = await Reviews.findOneAndDelete({ _id: reviewId, movieId: movieId });
        if (!deletedReview) {
            return res.send({ message: 'Review not found' });
        }
        res.send({ message: 'Review deleted successfully' });
    } catch (error) {
        res.send({ error: 'Failed to delete review', details: error.message }); 
    }
}

module.exports = {
    showAllReviews,
    showSingleReview,
    createReview,
    updateReview,
    deleteReview
};
