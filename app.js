import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import { errors } from 'celebrate'
import helmet from 'helmet'
import { PORT, DB_URI } from './env.config.js'
import { limiter } from './utils/limiter.js'

import {
  errorLogger,
  requestLogger,
  corsMiddleware,
  errorsMiddleware,
} from './middlewares/index.js'

import { router } from './routes/index.js'

const { log } = console

const app = express()
mongoose.connect(DB_URI)

app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(requestLogger)
app.use(limiter)

app.use(corsMiddleware)

app.use(router)

app.use(errorLogger)
app.use(errors())
app.use(errorsMiddleware)

app.listen(PORT, () => {
  log('Server is running')
})
