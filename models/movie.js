import mongoose from 'mongoose'
import validator from 'validator'

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validation: {
      validator: (v) => validator.isURL(v),
      message: 'Некореектная ссылка',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validation: {
      validator: (v) => validator.isURL(v),
      message: 'Некореектная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validation: {
      validator: (v) => validator.isURL(v),
      message: 'Некореектная ссылка',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
    unique: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
})

export const Movie = mongoose.model('movie', movieSchema)