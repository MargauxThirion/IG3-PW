const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const userAssoCtrl = require('../controllers/userAsso');

router.post('/signup', userAssoCtrl.signup);    
router.post('/login', userAssoCtrl.login);
router.get('/profile',authenticateToken, userAssoCtrl.getProfile);

module.exports = router;