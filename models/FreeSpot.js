const mongoose = require('mongoose');

const FreeSpotSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  spots: { type: Number, default: 1 },
  markedAt: { type: Date, required: false },
  markedBy: { type: String, required: true }, // userId
  isActive: { type: Boolean, required: true, default: true }
}, { timestamps: true });

module.exports = mongoose.model('FreeSpot', FreeSpotSchema);
