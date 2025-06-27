const Movies = require("../models/Movies");
const axios = require("axios");
require("dotenv").config();

const listAllMovies = async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const apiUrl = "https://api.themoviedb.org/3";
    const response = await axios.get(
      `${apiUrl}/discover/movie?api_key=${apiKey}`
    );
    // need to catch the genres  https://api.themoviedb.org/3/genre/movie/list?=en-US&api_key=••••••'

    const allMovies = response.data.results;
    console.log(allMovies);
    res.json(allMovies);
    // console.log({allMovies});
    // res.send(allMovies);
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
};

const showMovie = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  listAllMovies,
  showMovie,
};
