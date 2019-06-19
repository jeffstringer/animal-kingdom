const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  name: String
});

const Animal = mongoose.model('Animal', AnimalSchema)
module.exports = Animal;
