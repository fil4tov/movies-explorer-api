import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { errors } from 'celebrate'
import helmet from 'helmet'

import {
  errorLogger,
  requestLogger,
  authMiddleware,
  corsMiddleware,
  errorsMiddleware,
} from './middlewares/index.js'

import { usersRouter } from './routes/users.js'
import { moviesRouter } from './routes/movies.js'

import { signup, signin, signout } from './controllers/users.js'

import { celebrateSignIn, celebrateSignUp } from './validators/users.js'

import { PORT, DB_URI } from './env.config.js'
import { MESSAGE } from './utils/consts.js'
import { NotFoundError } from './utils/errors/index.js'
import { limiter } from './utils/limiter.js'

const app = express()
mongoose.connect(DB_URI)

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(limiter)
app.use(requestLogger)
app.use(corsMiddleware)

app.post('/signup', celebrateSignUp, signup)
app.post('/signin', celebrateSignIn, signin)
app.get('/signout', signout)

app.use(authMiddleware)

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

app.use((req, res, next) => {
  next(new NotFoundError(MESSAGE.COMMON.NOT_FOUND))
})

app.use(errorLogger)
app.use(errors())
app.use(errorsMiddleware)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running')
})
