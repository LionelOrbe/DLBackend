const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  spotId: { type: String }, // opcional
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', FeedbackSchema);
