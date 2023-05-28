const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const avisCtrl = require('../controllers/avis');

router.get('/', avisCtrl.getAllAvis);
router.post('/', avisCtrl.createAvis);
router.get('/:id', avisCtrl.getOneAvis);
router.get('/mission/:missionId', avisCtrl.getOneAvisMission);
router.put('/:id', avisCtrl.modifyAvis);
router.delete('/:id', avisCtrl.deleteAvis);

module.exports = router;