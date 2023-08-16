const { STATUS } = require('../consts');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = STATUS.UNAUTHORIZED;
  }
}

module.exports = {
  UnauthorizedError,
};
