const express = require('express');
const { celebrateSignIn, celebrateSignUp } = require('../validators/users');
const { signin, signout, signup } = require('../controllers/users');

const router = express.Router();

router.post('/signup', celebrateSignUp, signup);
router.post('/signin', celebrateSignIn, signin);
router.get('/signout', signout);

module.exports = router;
