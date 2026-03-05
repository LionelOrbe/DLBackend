const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Crear User
router.post('/', async (req, res) => {
  try {
    // Buscar si el usuario ya existe por email
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // Si existe, devolver status 200 y el usuario existente
      return res.status(200).json(existingUser);
    }
    // Si no existe, crear el usuario normalmente
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener User por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar User
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar User
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
