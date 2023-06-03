const mongoose = require('mongoose');

const annonceSchema = mongoose.Schema({
  nom_association: { type: String, required: true},
  nom_mission: { type: String, required: true },
  numero_mission: { type: Number, required: true },
  email : { type: String, required: true },
  desc: { type: String, required: true },
  date: { type: Date, required: true },
  duree: { type: Number, required: true },
  nbr_benevole: { type: Number, required: true }, // nombre de personne requise
  competence: { type: String, required: true },
  pays: { type: String, required: true },
  ville: { type: String, required: true },
  code_postal: { type: Number, required: true },
  rue: { type: String, required: true },
});

module.exports = mongoose.model('Annonce', annonceSchema);