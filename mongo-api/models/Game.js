const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true },
  age_rating: { type: Number, required: true },
  developer: { type: String, required: true }
});

module.exports = mongoose.model('Game', GameSchema);