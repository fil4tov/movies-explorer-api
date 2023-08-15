const { requestLogger, errorLogger } = require('./logger');
const { authMiddleware } = require('./auth');
const { corsMiddleware } = require('./cors');
const { errorsMiddleware } = require('./errors');

module.exports = {
  requestLogger,
  errorLogger,
  authMiddleware,
  corsMiddleware,
  errorsMiddleware,
};
