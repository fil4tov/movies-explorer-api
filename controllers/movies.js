import { Movie } from '../models/movie.js'
import { ForbiddenError, NotFoundError } from '../utils/errors/index.js'
import { MESSAGE } from '../utils/consts.js'

export const addMovieToFavorites = (req, res, next) => {
  const data = req.body
  const owner = req.user._id

  Movie.create({ ...data, owner })
    .then((card) => res.send(card))
    .catch(next)
}

export const getAllFavoritesMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next)
}

export const deleteMovieFromFavorites = (req, res, next) => {
  const movieId = Number(req.params.movieId)

  Movie.findOne({ movieId })
    .orFail(() => {
      throw new NotFoundError(MESSAGE.MOVIE.NOT_FOUND)
    })
    .then(({ owner, _id }) => {
      if (owner.toString() !== req.user._id) {
        throw new ForbiddenError(MESSAGE.MOVIE.DELETE_FORBIDDEN)
      }
      Movie.findByIdAndRemove(_id)
        .then(() => {
          res.send({ message: MESSAGE.MOVIE.DELETE_SUCCESS })
        })
        .catch(next)
    })
    .catch(next)
}
