import express from 'express'
import {
  getUserInfo,
  patchUserInfo,
} from '../controllers/users.js'

import {
  celebratePatchUserInfo,
} from '../validators/users.js'

const router = express.Router()

router.get('/me', getUserInfo)
router.patch('/me', celebratePatchUserInfo, patchUserInfo)

export {
  router as usersRouter,
}
