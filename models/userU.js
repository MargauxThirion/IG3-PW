const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userUSchema = mongoose.Schema({
  num_userU: {type: Number, required: true, unique: true},
  emailU: { type: String, required: true, unique: true },
  passwordU: { type: String, required: true },
  nomU: { type: String, required: true },
  prenomU: { type: String, required: true },
  adresseU: { type: String, required: true },
  competenceU: { type: String, required: true },
});

userUSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserU', userUSchema);