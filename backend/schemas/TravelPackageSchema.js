const mongoose = require('mongoose');

const travelPackageSchema = new mongoose.Schema({
  destination: String,
  price: Number,
  rating: Number,
  duration: String,
  description: String,
  imageUrl: String,
});

const TravelPackage = mongoose.model('TravelPackage', travelPackageSchema);

module.exports = TravelPackage;