const Movie = require("../models/Movie");
const axios = require("axios");
const Review = require("../models/Review");
const Favorite = require("../models/Favorite");
const User = require("../models/User");

require("dotenv").config();

const listAllMovies = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = process.env.TMDB_URL;
    const page = req.query.page || 1;
    const allMoviesResponse = await axios.get(
      `${apiUrl}/discover/movie?api_key=${apiKey}&page=${page}`
    );
    const allMovies = allMoviesResponse.data.results;

    // to list genres for frontend
    const genresResponse = await axios.get(
      `${apiUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const genres = genresResponse.data.genres;

    // Replace genre_ids with genre names after web searching and AI searching
    const genreName = {};
    genres.forEach((g) => (genreName[g.id] = g.name));
    allMovies.forEach((movie) => {
      movie.genres = movie.genre_ids.map((id) => genreName[id]);
    });

    res.json({ allMovies });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch movies", details: error.message });
  }
};


const findMovieName = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = process.env.TMDB_URL;
    const movieName = req.query.q;
    console.log("Received movie name:", req.query);
    console.log("Searching for movie:", movieName);
    const response = await axios.get(
      `${apiUrl}/search/movie?api_key=${apiKey}&query=${movieName}`
    );

    //to list genres for frontend
    const genresResponse = await axios.get(
      `${apiUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const genres = genresResponse.data.genres;
    const movieFound = response.data.results;

    // Replace genre_ids with genre names after web searching and AI searching
    const genreName = {};
    genres.forEach((g) => (genreName[g.id] = g.name));
    movieFound.forEach((movie) => {
      movie.genres = movie.genre_ids.map((id) => genreName[id]);
    });

    console.log("Movie found:", response.data.results);

    res.json(movieFound);
  } catch (error) {
    console.error("Error while searching for movie:", error.message);
    res
      .status(500)
      .json({ error: "Failed to search for movie", details: error.message });
  }
};


const MakeReviewDoc = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload;
    const data = req.body;


    let movie = await Movie.findOne({ movieId: data.movieId });

    if (!movie) {
      movie = await Movie.create({ movieId: data.movieId });
    }

    if (movie) {
      let review = await Review.findOne({
        userId,
        movieId: movie._id,
      });

      if (!review) {
        review = await Review.create({
          userId: userId,
          movieId: movie._id,
          rating: data.rating,
          like: data.like,
          dislike: data.dislike,
          comment: data.comment,
        });
        const user = await User.findById(userId);
        user.reviews.push(review._id);
        await user.save();
      } else {
        review.rating = data.rating;
        review.like = data.like;
        review.dislike = data.dislike;
        review.comment = data.comment;
        await review.save();
      }
    } else {
      return res.json({ success: false });
    }

    if (data.favorite) {
      MakeFavoriteDoc({ movieId: movie._id, userId: userId });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error while submitting review:", error.message);
  }
};

const MakeFavoriteDoc = async (obj) => {
  try {
    let favorite = await Favorite.findOne({ movieId: obj.movieId });

    if (!favorite) {
      favorite = await Favorite.create({
        movieId: obj.movieId,
        userId: obj.userId,
      });
      const user = await User.findById(obj.userId);
      user.favorites.push(favorite._id);
      await user.save();
    }
  } catch (error) {
    console.error("Error while submitting Favorite:", error.message);
  }
};

module.exports = {
  listAllMovies,
  MakeReviewDoc,
  findMovieName,
};
