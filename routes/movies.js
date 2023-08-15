const express = require('express');
const {
  addMovieToFavorites,
  deleteMovieFromFavorites,
  getAllFavoritesMovies,
} = require('../controllers/movies');

const {
  celebrateDeleteMovie,
  celebrateCreateMovie,
} = require('../validators/movies');

const router = express.Router();

router.get('/movies', getAllFavoritesMovies);
router.post('/movies', celebrateCreateMovie, addMovieToFavorites);
router.delete('/movies/:_id', celebrateDeleteMovie, deleteMovieFromFavorites);

module.exports = router;
