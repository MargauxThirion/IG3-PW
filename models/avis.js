const mongoose = require('mongoose');

const avisSchema = mongoose.Schema({

    missionId: { type: Number, required: true },
    id_user: { type: String, required: true },
    commentaire: { type: String, required: true },
    
});

module.exports = mongoose.model('Avis', avisSchema);