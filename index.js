require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const freeSpotRoutes = require('./routes/freeSpot');
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');

app.use('/api/freespots', freeSpotRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));



const client = new MongoClient('mongodb://localhost:27017', {
  monitorCommands: true // Habilita monitoreo de comandos
});

// Escuchar eventos
client.on('commandStarted', event => console.log('Query:', event));
client.on('commandSucceeded', event => console.log('Success:', event));
client.on('commandFailed', event => console.error('Error:', event));   
mongoose.set('debug', true);
