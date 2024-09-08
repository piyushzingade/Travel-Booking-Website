require("dotenv").config();

const {TravelPackageModel} = require('./model/TravelPackageModel')

const express = require('express');
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();

// app.get('/addPackages' , async(req, res)  => {
//     let tempPackage = [
//   {
//     _id: "1",
//     destination: "Bali, Indonesia",
//     price: 1200,
//     rating: 4.5,
//     duration: "7 days",
//     description: "Experience the tropical paradise of Bali with beaches, culture, and more.",
//     imageUrl: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "2",
//     destination: "Paris, France",
//     price: 2500,
//     rating: 5,
//     duration: "5 days",
//     description: "Visit the romantic city of Paris and explore famous landmarks like the Eiffel Tower.",
//     imageUrl: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "3",
//     destination: "Kyoto, Japan",
//     price: 1800,
//     rating: 4.8,
//     duration: "5 days",
//     description: "Explore the cultural wonders of Kyoto with its beautiful temples and traditions.",
//     imageUrl: "https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "4",
//     destination: "Rome, Italy",
//     price: 2200,
//     rating: 4.7,
//     duration: "7 days",
//     description: "Discover the history and architecture of Rome, including the Colosseum and Vatican.",
//     imageUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "5",
//     destination: "New York City, USA",
//     price: 3000,
//     rating: 4.6,
//     duration: "5 days",
//     description: "Visit the bustling streets of NYC and explore iconic spots like Times Square and Central Park.",
//     imageUrl: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "6",
//     destination: "Sydney, Australia",
//     price: 2600,
//     rating: 4.9,
//     duration: "10 days",
//     description: "Explore the beauty of Sydney with the iconic Opera House and harbor views.",
//     imageUrl:" https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "7",
//     destination: "Rio de Janeiro, Brazil",
//     price: 1700,
//     rating: 4.4,
//     duration: "6 days",
//     description: "Experience the vibrant culture and stunning beaches of Rio.",
//     imageUrl: "https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "8",
//     destination: "Dubai, UAE",
//     price: 3500,
//     rating: 4.5,
//     duration: "5 days",
//     description: "Discover the luxury and grandeur of Dubai's towering skyscrapers and desert adventures.",
//     imageUrl:"https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "9",
//     destination: "Cape Town, South Africa",
//     price: 2400,
//     rating: 4.7,
//     duration: "7 days",
//     description: "Visit the stunning landscapes of Cape Town, with its mountains and beaches.",
//     imageUrl: "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "10",
//     destination: "Barcelona, Spain",
//     price: 2000,
//     rating: 4.6,
//     duration: "5 days",
//     description: "Explore the rich art and architecture of Barcelona, including Gaudi's masterpieces.",
//     imageUrl: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },

//   {
//     _id: "11",
//     destination: "Santorini, Greece",
//     price: 2200,
//     rating: 4.8,
//     duration: "6 days",
//     description: "Enjoy the stunning views and serene beauty of Santorini with its white-washed houses and blue-domed churches.",
//     imageUrl: "https://images.pexels.com/photos/164356/pexels-photo-164356.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "12",
//     destination: "Machu Picchu, Peru",
//     price: 3200,
//     rating: 4.9,
//     duration: "8 days",
//     description: "Embark on an adventure to explore the ancient Incan ruins of Machu Picchu, surrounded by the Andes Mountains.",
//     imageUrl: "https://images.pexels.com/photos/28128935/pexels-photo-28128935/free-photo-of-machu-picchu.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "13",
//     destination: "Istanbul, Turkey",
//     price: 1900,
//     rating: 4.7,
//     duration: "5 days",
//     description: "Experience the blend of European and Asian culture in Istanbul, with its rich history and bustling bazaars.",
//     imageUrl: "https://images.pexels.com/photos/7529416/pexels-photo-7529416.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "14",
//     destination: "Queenstown, New Zealand",
//     price: 2700,
//     rating: 4.8,
//     duration: "9 days",
//     description: "Explore the adventure capital of New Zealand with its scenic landscapes and thrilling outdoor activities.",
//     imageUrl: "https://images.pexels.com/photos/27623568/pexels-photo-27623568/free-photo-of-a-view-of-the-city-of-queenstown-from-the-top-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "15",
//     destination: "Cairo, Egypt",
//     price: 2300,
//     rating: 4.5,
//     duration: "7 days",
//     description: "Discover the wonders of ancient Egypt, including the Great Pyramids and the Sphinx, in the historic city of Cairo.",
//     imageUrl: "https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "16",
//     destination: "Hawaii, USA",
//     price: 3200,
//     rating: 4.9,
//     duration: "10 days",
//     description: "Relax on the tropical islands of Hawaii with its stunning beaches, volcanoes, and vibrant culture.",
//     imageUrl: "https://images.pexels.com/photos/15581799/pexels-photo-15581799/free-photo-of-aerial-shot-of-sea-harbor-and-city-waikiki-honolulu-hawai-usa.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "17",
//     destination: "Phuket, Thailand",
//     price: 1500,
//     rating: 4.6,
//     duration: "6 days",
//     description: "Experience the beautiful beaches, vibrant nightlife, and cultural attractions of Phuket.",
//     imageUrl: "https://images.pexels.com/photos/11434425/pexels-photo-11434425.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "18",
//     destination: "Berlin, Germany",
//     price: 2100,
//     rating: 4.6,
//     duration: "5 days",
//     description: "Explore the rich history and modern attractions of Berlin, including the Brandenburg Gate and Berlin Wall.",
//     imageUrl: "https://images.pexels.com/photos/1114892/pexels-photo-1114892.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
  
//   {
//     _id: "19",
//     destination: "Banff, Canada",
//     price: 2600,
//     rating: 4.9,
//     duration: "8 days",
//     description: "Explore the stunning Rocky Mountains and crystal-clear lakes in Banff, a perfect destination for nature lovers.",
//     imageUrl: "https://images.pexels.com/photos/1598072/pexels-photo-1598072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "20",
//     destination: "Jaipur, India",
//     price: 1500,
//     rating: 4.7,
//     duration: "5 days",
//     description: "Explore the Pink City of Jaipur, known for its stunning palaces, forts, and vibrant culture.",
//     imageUrl: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "21",
//     destination: "Kerala, India",
//     price: 1700,
//     rating: 4.8,
//     duration: "7 days",
//     description: "Experience the serene backwaters, lush greenery, and rich traditions of Kerala, God's Own Country.",
//     imageUrl: "https://images.pexels.com/photos/3370598/pexels-photo-3370598.jpeg?auto=compress&cs=tinysrgb&w=600"
//   }
// ];
//     tempPackage.forEach((item) =>{
//         let newPackage = new TravelPackageModel({
//             destination: item.description,
//             price: item.price,
//             rating: item.rating,
//             duration: item.duration,
//             description: item.description,
//             imageUrl: item.imageUrl,
//         });
//         newPackage.save();
//     });
//     res.send("Done")
// })

app.get('/allPackages' , async(req, res) =>{
    let allPackages = await TravelPackageModel.find({});
    res.json(allPackages)
})
app.listen(PORT, ()=>{
    console.log("App started");
    mongoose.connect(uri);
    console.log("DB connected");
})