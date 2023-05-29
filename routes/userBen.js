const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const userBenCtrl = require('../controllers/userBen');

router.post('/signup', userBenCtrl.signup);    //post car lié au front
router.post('/login', userBenCtrl.login);
router.get('/profile',authenticateToken, userBenCtrl.getProfile);

module.exports = router;