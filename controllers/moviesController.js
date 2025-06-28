const Movies = require("../models/Movies");
const axios = require("axios");
require("dotenv").config();

const listAllMovies = async (req, res) => {

    try {
        const apiKey = process.env.TMDB_API_KEY;
        const apiUrl = process.env.TMDB_URL;
        const allMoviesResponse = await axios.get(`${apiUrl}/discover/movie?api_key=${apiKey}`);
        const allMovies = allMoviesResponse.data.results;

        // to list genres for frontend
        const genresResponse = await axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
        const genres = genresResponse.data.genres;

        // Replace genre_ids with genre names after web searching and AI searching
        const genreName = {};
        genres.forEach(g => genreName[g.id] = g.name);
        allMovies.forEach(movie => {
            movie.genres = movie.genre_ids.map(id => genreName[id]);
        });

        res.json({ allMovies });

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movies', details: error.message });
    }
}


const showMovie = async (req, res) => {

    try {
        let movieId = 574475; // Example movie ID, replace with req.params.id when using in routes
        const apiKey = process.env.TMDB_API_KEY;
        const apiUrl = process.env.TMDB_URL;
        // const movieId = req.params.id;
        const response = await axios.get(`${apiUrl}/movie/${movieId}?=en-US&api_key=${apiKey}`);
        // to list genres for frontend
        const genresResponse = await axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`);
        const genres = genresResponse.data.genres;
        const movieDetails = response.data;

        // Replace genre_ids with genre names after web searching and AI searching
        const genreName = {};
        genres.forEach(g => genreName[g.id] = g.name);
        movieDetails.genres = movieDetails.genres.map(g => genreName[g.id] || g.name);

        res.json({ movieDetails });
    } catch (error) {
          // Send error response
        res.status(500).json({ error: 'Failed to fetch movies', details: error.message });
    }
};


const saveMovieId = async (req, res) => {
     const movieId = req.params.movieId;
    try {
        if (await Movies.exists({ movieId: movieId })) {
            console.log('Movie already exists in the database');
            res.json({ message: `Movie ID ${movieId} already exists in the database`});
        } else {
           await Movies.create({
                movieId: movieId
            });
            console.log('Movie ID saved successfully');
            res.json({ message: `Movie ID ${movieId} saved successfully` });
        }

    } catch (error) {
        res.json({ error: 'Failed to save movie ID', details: error.message });
    }

}

module.exports = {
    listAllMovies,
    showMovie,
    saveMovieId
}