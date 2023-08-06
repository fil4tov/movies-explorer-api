import { STATUS } from '../consts.js'

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = 'UnauthorizedError'
    this.statusCode = STATUS.UNAUTHORIZED
  }
}
