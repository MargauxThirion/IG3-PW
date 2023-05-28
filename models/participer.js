const mongoose = require('mongoose');

const participerSchema = mongoose.Schema({
    missionId: { type: Number, required: true },
    id_user: { type: String, required: true },
});

module.exports = mongoose.model('Participer', participerSchema);