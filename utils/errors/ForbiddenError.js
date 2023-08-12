import { STATUS } from '../consts.js'

export class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ForbiddenError'
    this.statusCode = STATUS.FORBIDDEN
  }
}
