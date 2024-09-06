// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = 'mongodb+srv://piyushzingade:XByvI77pwm9fOsYq@cluster0.9zmvno1.mongodb.net/travelDB';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Travel Package Schema
const travelPackageSchema = new mongoose.Schema({
  destination: String,
  price: Number,
  rating: Number,
  duration: String,
  description: String,
  availableDates: [String]
});

const TravelPackage = mongoose.model('TravelPackage', travelPackageSchema);

// Routes
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await TravelPackage.find();
    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages' });
  }
});

app.post('/api/book', async (req, res) => {
  try {
    // Handle booking logic here
    res.status(201).json({ message: 'Booking confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing booking' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

