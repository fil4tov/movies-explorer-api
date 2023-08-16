const { STATUS } = require('../consts');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = STATUS.NOT_FOUND;
  }
}

module.exports = {
  NotFoundError,
};
