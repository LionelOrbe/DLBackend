const express = require('express');
const router = express.Router();
const FreeSpot = require('../models/FreeSpot');

// Crear un FreeSpot
router.post('/', async (req, res) => {
  try {
    const freeSpot = new FreeSpot(req.body);
    await freeSpot.save();
    // Sumar 2 puntos al usuario que creó el spot
    console.log('Creando FreeSpot:', req.body);
    if (req.body.markedBy) {
      const User = require('../models/User');
      await User.findByIdAndUpdate(req.body.markedBy, { $inc: { points: 2 } });
    //   console.log(`Usuario ${req.body.markedBy} ha ganado 2 puntos por crear un FreeSpot.`);
    }
    res.status(201).json(freeSpot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos los FreeSpots
router.get('/', async (req, res) => {
  try {
    const freeSpots = await FreeSpot.find();
    res.json(freeSpots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un FreeSpot por ID
router.get('/:id', async (req, res) => {
  try {
    const freeSpot = await FreeSpot.findById(req.params.id);
    if (!freeSpot) return res.status(404).json({ error: 'No encontrado' });
    res.json(freeSpot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un FreeSpot
router.put('/:id', async (req, res) => {
  try {
    const freeSpot = await FreeSpot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!freeSpot) return res.status(404).json({ error: 'No encontrado' });
    res.json(freeSpot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un FreeSpot
router.delete('/:id', async (req, res) => {
  try {
    const freeSpot = await FreeSpot.findByIdAndDelete(req.params.id);
    if (!freeSpot) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
