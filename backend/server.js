const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


app.use(express.json()); 
app.use(cors()); 


const mongoURI = 'mongodb+srv://piyushzingade:XByvI77pwm9fOsYq@cluster0.9zmvno1.mongodb.net/travelDB'; 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const travelPackageSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  duration: { type: String, required: true },
  description: { type: String, required: true },
  availableDates: { type: [String], required: true }, 
});

const TravelPackage = mongoose.model('TravelPackage', travelPackageSchema);


app.get('/api/packages', async (req, res) => {
  try {
    const packages = await TravelPackage.find(); 
    res.json(packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
    res.status(500).json({ message: 'Error fetching packages' });
  }
});

// Book a travel package (placeholder route)
app.post('/api/book', async (req, res) => {
  try {
    
    const { packageId, userDetails } = req.body;



    res.status(201).json({ message: 'Booking confirmed', packageId, userDetails });
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ message: 'Error processing booking' });
  }
});


app.post('/api/seed', async (req, res) => {
  try {
    const { travelPackages } = require('../frontend/src/mockData'); 

    await TravelPackage.insertMany(travelPackages); 
    res.status(201).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ message: 'Error seeding database' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
