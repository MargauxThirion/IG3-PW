const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const participerCtrl = require('../controllers/participer');

router.get('/', participerCtrl.getAllParticiper);
router.post('/', participerCtrl.createParticiper);
router.get('/:id', participerCtrl.getOneParticiper);
router.get('/mission/:id', participerCtrl.getOneParticiperMission);
router.put('/:id', participerCtrl.modifyParticiper);
router.delete('/:id', participerCtrl.deleteParticiper);

module.exports = router;