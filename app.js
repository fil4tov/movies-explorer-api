const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { router } = require('./routes');
const {
  errorLogger,
  requestLogger,
  corsMiddleware,
  errorsMiddleware,
} = require('./middlewares');
const { PORT, DB_URI } = require('./env.config');
const { limiter } = require('./utils/limiter');

const { log } = console;

const app = express();
mongoose.connect(DB_URI);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(limiter);

app.use(corsMiddleware);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorsMiddleware);

app.listen(PORT, () => {
  log('Server is running');
});
