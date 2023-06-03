const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userBenSchema = mongoose.Schema({
  emailU: { type: String, required: true, unique: true },
  passwordU: { type: String, required: true },
  nomU: { type: String, required: true },
  prenomU: { type: String, required: true },
  adresseU: { type: String, required: true },
  num_telU: { type: String, required: true },
  competenceU: { type: String, required: true },
});

userBenSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserBen', userBenSchema);