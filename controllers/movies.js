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
  const owner = req.user._id
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next)
}

export const deleteMovieFromFavorites = (req, res, next) => {
  const { _id } = req.params

  Movie.findById(_id)
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
