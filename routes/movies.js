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

router.get('/movies', getAllFavoritesMovies)
router.post('/movies', celebrateCreateMovie, addMovieToFavorites)
router.delete('/movies:_id', celebrateDeleteMovie, deleteMovieFromFavorites)

export {
  router as moviesRouter,
}
