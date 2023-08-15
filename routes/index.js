const express = require('express');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const authorizationRouter = require('./authorization');
const { authMiddleware } = require('../middlewares');
const { NotFoundError } = require('../utils/errors');
const { MESSAGE } = require('../utils/consts');

const router = express.Router();

router.use(authorizationRouter);
router.use(authMiddleware, moviesRouter);
router.use(authMiddleware, usersRouter);

router.all('*', authMiddleware, (req, res, next) => {
  next(new NotFoundError(MESSAGE.COMMON.NOT_FOUND));
});

module.exports = {
  router,
};
