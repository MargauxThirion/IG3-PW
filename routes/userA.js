const express = require('express');
const router = express.Router();

const userACtrl = require('../controllers/userA');

router.post('/signup', userACtrl.signup);    
router.post('/login', userACtrl.login);

module.exports = router;