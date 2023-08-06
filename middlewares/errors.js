import { MESSAGE, STATUS } from '../utils/consts.js'

export const errorsMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message = '' } = error

  if (error.code === 11000) {
    if (error.keyValue.email) {
      res.status(STATUS.CONFLICT).send({ message: MESSAGE.USER.CONFLICT_EMAIL })
      return
    }
    if (error.keyValue.movieId) {
      res.status(STATUS.CONFLICT).send({ message: MESSAGE.MOVIE.CONFLICT_ID })
      return
    }
  }

  res.status(statusCode).send({ message })

  next()
}
