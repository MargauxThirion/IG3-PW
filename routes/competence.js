const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const competenceCtrl = require('../controllers/competence');

router.get('/', competenceCtrl.getAllCompetence);
router.post('/', competenceCtrl.createCompetence);
router.get('/:id', competenceCtrl.getOneCompetence);
router.put('/:id', competenceCtrl.modifyCompetence);
router.delete('/:id', competenceCtrl.deleteCompetence);

module.exports = router;