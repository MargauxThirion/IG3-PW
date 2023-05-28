const express = require('express');
const router = express.Router();

const userUCtrl = require('../controllers/userU');

router.post('/signup', userUCtrl.signup);    //post car lié au front
router.post('/login', userUCtrl.login);

module.exports = router;