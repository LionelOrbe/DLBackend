const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  photo: { type: String }, // URL de la foto de perfil
  type: { type: String, enum: ['conductor', 'ayudante', 'cochera'], required: true },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, required: false }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
