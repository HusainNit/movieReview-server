const Movies = require('../models/Movies');
const Users = require('../models/Users');

const showAllReviews = async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const reviews = await Movies.find({ _id: movieId }).populate('reviews');
        if (!reviews) {
            return res.json({ message: 'No reviews found' });
        }
        res.json(reviews);
    } catch (error) {
        res.json({ error: 'Failed to fetch reviews', details: error.message });
    }
}

const showSingleReview = async (req, res) => {
    const movieId = req.params.movieId;
    const reviewId = req.params.reviewId;
    try {
        const review = await Movies.findOne({ _id: movieId, 'reviews._id': reviewId }).populate('reviews');
        if (!review) {
            return res.json({ message: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.json({ error: 'Failed to fetch review', details: error.message });
    }
}

const createReview = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const { userId, content, rating } = req.body;

        // Validate user
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const movie = await Movies.findById(movieId);
        if (!movie) {
            return res.json({ message: 'Movie not found' });
        }

        await Movies.create({
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
        res.json({ error: 'Failed to create review', details: error.message });
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

        res.json(updatedMovie);
    } catch (error) {
        res.json({ error: 'Failed to update review', details: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    showAllReviews,
    showSingleReview,
    createReview,
    updateReview,
    deleteReview
};
