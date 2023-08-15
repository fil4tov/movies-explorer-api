import { celebrate, Joi } from 'celebrate'
import { URL_REGEX } from '../utils/consts.js'

export const celebrateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri().pattern(URL_REGEX),
    trailerLink: Joi.string().required().uri().pattern(URL_REGEX),
    thumbnail: Joi.string().required().uri().pattern(URL_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
})

export const celebrateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
})
