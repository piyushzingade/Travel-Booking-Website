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
  
});

// Book a travel package (placeholder route)
app.post('/api/book', async (req, res) => {
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
