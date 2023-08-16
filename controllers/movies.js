const { Movie } = require('../models/movie');
const { ForbiddenError, NotFoundError, BadRequestError } = require('../utils/errors');
const { MESSAGE } = require('../utils/consts');

const addMovieToFavorites = (req, res, next) => {
  const data = req.body;
  const owner = req.user._id;

  Movie.create({ ...data, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const getAllFavoritesMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const deleteMovieFromFavorites = (req, res, next) => {
  const id = req.params._id;

  Movie.findById(id)
    .orFail(() => {
      throw new NotFoundError(MESSAGE.MOVIE.NOT_FOUND);
    })
    .then(({ owner, _id }) => {
      if (owner.toString() !== req.user._id) {
        throw new ForbiddenError(MESSAGE.MOVIE.DELETE_FORBIDDEN);
      }
      Movie.findByIdAndRemove(_id)
        .then(() => {
          res.send({ message: MESSAGE.MOVIE.DELETE_SUCCESS });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  addMovieToFavorites,
  deleteMovieFromFavorites,
  getAllFavoritesMovies,
};
