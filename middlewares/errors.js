const { MESSAGE } = require('../utils/consts');

const errorsMiddleware = (error, req, res, next) => {
  const { statusCode = 500, message = MESSAGE.COMMON.SERVER_ERROR } = error;

  res.status(statusCode).send({ message });

  next();
};

module.exports = {
  errorsMiddleware,
};
