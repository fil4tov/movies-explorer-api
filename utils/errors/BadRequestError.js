import { STATUS } from '../consts.js'

export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.name = 'BadRequestError'
    this.statusCode = STATUS.BAD_REQUEST
  }
}
