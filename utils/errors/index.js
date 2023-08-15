const { UnauthorizedError } = require('./UnauthorizedError');
const { NotFoundError } = require('./NotFoundError');
const { ForbiddenError } = require('./ForbiddenError');
const { ConflictError } = require('./ConflictError');
const { BadRequestError } = require('./BadRequestError');

module.exports = {
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
};
