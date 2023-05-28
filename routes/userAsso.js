const express = require('express');
const router = express.Router();

const userAssoCtrl = require('../controllers/userAsso');

router.post('/signup', userAssoCtrl.signup);    
router.post('/login', userAssoCtrl.login);

module.exports = router;