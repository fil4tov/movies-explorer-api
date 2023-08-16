const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const { SECRET_KEY } = require('../env.config');

const authMiddleware = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

module.exports = {
  authMiddleware,
};
