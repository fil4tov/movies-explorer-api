const { STATUS } = require('../consts');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = STATUS.FORBIDDEN;
  }
}

module.exports = {
  ForbiddenError,
};
