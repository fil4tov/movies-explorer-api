import express from 'express'
import {
  addMovieToFavorites,
  deleteMovieFromFavorites,
  getAllFavoritesMovies,
} from '../controllers/movies.js'

import {
  celebrateDeleteMovie,
  celebrateCreateMovie,
} from '../validators/movies.js'

const router = express.Router()

router.get('/', getAllFavoritesMovies)
router.post('/', celebrateCreateMovie, addMovieToFavorites)
router.delete('/:movieId', celebrateDeleteMovie, deleteMovieFromFavorites)

export {
  router as moviesRouter,
}
