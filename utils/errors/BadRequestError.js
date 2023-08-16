const { STATUS } = require('../consts');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = STATUS.BAD_REQUEST;
  }
}

module.exports = {
  BadRequestError,
};
