const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
} = require('../utils/errors');
const { MESSAGE } = require('../utils/consts');
const { SECRET_KEY } = require('../env.config');
const { withoutKeys } = require('../utils/helpers');

const JWT_NAME = 'jwt';
const JWT_SETTINGS = {
  maxAge: 24 * 3600000,
  sameSite: true,
  httpOnly: true,
};
const JWT_EXPIRES = '7d';

const signup = (req, res, next) => {
  const userData = req.body;

  bcrypt.hash(userData.password, 10)
    .then((hash) => {
      User.create({ ...userData, password: hash })
        .then((user) => {
          const userResponse = withoutKeys(user.toObject(), ['password']);
          res.send(userResponse);
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(MESSAGE.USER.CONFLICT_EMAIL));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
          } else {
            next(err);
          }
        });
    });
};

const signin = (req, res, next) => {
  const { password, email } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(MESSAGE.USER.NOT_FOUND);
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(MESSAGE.USER.LOGIN_ERROR);
          }
          const token = jwt.sign(
            { _id: user._id },
            SECRET_KEY,
            { expiresIn: JWT_EXPIRES },
          );
          res.cookie(JWT_NAME, token, JWT_SETTINGS);
          res.send({ message: MESSAGE.USER.LOGIN_SUCCESS });
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie(JWT_NAME, JWT_SETTINGS);
  res.send({ message: MESSAGE.USER.LOGOUT_SUCCESS });
};

const getUserInfo = async (req, res, next) => {
  const userId = req?.user?._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(MESSAGE.USER.NOT_FOUND);
    })
    .then((user) => res.send(user))
    .catch(next);
};

const patchUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  signup,
  signout,
  signin,
  getUserInfo,
  patchUserInfo,
};
