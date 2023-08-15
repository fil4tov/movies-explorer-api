import express from 'express'
import { celebrateSignIn, celebrateSignUp } from '../validators/users.js'
import { signin, signout, signup } from '../controllers/users.js'

const router = express.Router()

router.post('/signup', celebrateSignUp, signup)
router.post('/signin', celebrateSignIn, signin)
router.get('/signout', signout)

export {
  router as authorizationRouter,
}
