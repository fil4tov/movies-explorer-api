import { STATUS } from '../consts.js'

export class ConflictError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ConflictError'
    this.statusCode = STATUS.CONFLICT
  }
}
