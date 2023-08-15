const express = require('express');
const {
  getUserInfo,
  patchUserInfo,
} = require('../controllers/users');

const {
  celebratePatchUserInfo,
} = require('../validators/users');

const router = express.Router();

router.get('/users/me', getUserInfo);
router.patch('/users/me', celebratePatchUserInfo, patchUserInfo);

module.exports = router;
