const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userAssoSchema = mongoose.Schema({
  nomA: { type: String, required: true },
  emailA: { type: String, required: true, unique: true },
  passwordA: { type:String, required: true },
  adresseA: { type: String, required: true },
  num_telA: { type: String, required: true },
  descA: { type: String, required: true },
});

userAssoSchema.plugin(uniqueValidator);

module.exports = mongoose.model('UserAsso', userAssoSchema);