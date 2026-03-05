const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// Crear Feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los Feedbacks
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener Feedback por ID
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'No encontrado' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar Feedback
router.put('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) return res.status(404).json({ error: 'No encontrado' });
    res.json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar Feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
