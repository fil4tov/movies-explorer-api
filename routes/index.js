import express from 'express'
import { moviesRouter } from './movies.js'
import { usersRouter } from './users.js'
import { authorizationRouter } from './authorization.js'
import { authMiddleware } from '../middlewares/index.js'
import { NotFoundError } from '../utils/errors/index.js'
import { MESSAGE } from '../utils/consts.js'

const router = express.Router()

router.use(authorizationRouter)
router.use(authMiddleware, moviesRouter)
router.use(authMiddleware, usersRouter)

router.all('*', authMiddleware, (req, res, next) => {
  next(new NotFoundError(MESSAGE.COMMON.NOT_FOUND))
})

export { router }
