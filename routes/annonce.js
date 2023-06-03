const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const annonceCtrl = require('../controllers/annonce');

router.get('/', annonceCtrl.getAllAnnonce);
router.post('/', annonceCtrl.createAnnonce);
router.get('/:id', annonceCtrl.getOneAnnonce);
router.get('/mission/:id', annonceCtrl.getOneAnnonceMission);
router.put('/mission/:id', annonceCtrl.modifyAnnonce);
router.delete('/:numero_mission', annonceCtrl.deleteAnnonce);

module.exports = router;