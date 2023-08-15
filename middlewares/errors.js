import { MESSAGE } from '../utils/consts.js'

export const errorsMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message = MESSAGE.COMMON.SERVER_ERROR } = error

  res.status(statusCode).send({ message })

  next()
}
