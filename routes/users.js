import express from 'express'
import {
  getUserInfo,
  patchUserInfo,
} from '../controllers/users.js'

import {
  celebratePatchUserInfo,
} from '../validators/users.js'

const router = express.Router()

router.get('/users/me', getUserInfo)
router.patch('/users/me', celebratePatchUserInfo, patchUserInfo)

export {
  router as usersRouter,
}
