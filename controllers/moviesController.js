const Movies = require('../models/Movies');
const axios = require('axios');
require('dotenv').config();



const listAllMovies = async (req, res) => {

    try {
        const apiKey = process.env.TMDB_API_KEY;
        const apiUrl = process.env.TMDB_URL;
        const response = await axios.get(`${apiUrl}/discover/movie?api_key=${apiKey}`);
      // need to catch the genres  https://api.themoviedb.org/3/genre/movie/list?=en-US&api_key=••••••'

        const allMovies = response.data.results;
        res.json(allMovies);
        console.log({allMovies});

    } catch (error) {
        
    }
}

const showMovie = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

}

module.exports = {
    listAllMovies,
    showMovie
}