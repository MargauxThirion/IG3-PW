const mongoose = require('mongoose');

const competenceSchema = mongoose.Schema({
  id_competence: { type: String, required: true },
});

module.exports = mongoose.model('Competence', competenceSchema);