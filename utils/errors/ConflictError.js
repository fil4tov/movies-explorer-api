const { STATUS } = require('../consts');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = STATUS.CONFLICT;
  }
}

module.exports = {
  ConflictError,
};
