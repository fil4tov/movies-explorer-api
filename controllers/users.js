import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'
import { NotFoundError, UnauthorizedError } from '../utils/errors/index.js'
import { MESSAGE } from '../utils/consts.js'
import { SECRET_KEY } from '../env.config.js'

const JWT_NAME = 'jwt'
const JWT_SETTINGS = {
  maxAge: 24 * 3600000,
  sameSite: true,
  httpOnly: true,
}
const JWT_EXPIRES = '7d'

export const signup = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          const {
            _id, name, about, avatar, email,
          } = user

          res.send({
            _id, name, about, avatar, email,
          })
        })
        .catch(next)
    })
    .catch(next)
}

export const signin = (req, res, next) => {
  const { password, email } = req.body

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(MESSAGE.USER.NOT_FOUND)
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(MESSAGE.USER.LOGIN_ERROR)
          }
          const token = jwt.sign(
            { _id: user._id },
            SECRET_KEY,
            { expiresIn: JWT_EXPIRES },
          )
          res.cookie(JWT_NAME, token, JWT_SETTINGS)
          res.send({ message: MESSAGE.USER.LOGIN_SUCCESS })
        })
        .catch(next)
    })
    .catch(next)
}

export const signout = (req, res) => {
  res.clearCookie(JWT_NAME, JWT_SETTINGS)
  res.send({ message: MESSAGE.USER.LOGOUT_SUCCESS })
}

export const getUserInfo = async (req, res, next) => {
  const userId = req?.user?._id

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(MESSAGE.USER.NOT_FOUND)
    })
    .then((user) => res.send(user))
    .catch(next)
}

export const patchUserInfo = (req, res, next) => {
  const { name, email } = req.body
  const id = req.user._id

  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError()
    })
    .then((user) => {
      res.send(user)
    })
    .catch(next)
}
