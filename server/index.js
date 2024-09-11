require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { TravelPackageModel } = require('./model/TravelPackageModel');

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;
const app = express();
app.use(cors());

app.get('/allPackages', async (req, res) => {
  try {
    let allPackages = await TravelPackageModel.find({});
    res.json(allPackages);
  } catch (err) {
    res.status(500).send("Error fetching packages");
  }
});

app.get('/addPackages' , async(req, res)  => {
    let tempPackage = [
//     _id: "1",
//     destination: "Bali, Indonesia",
//     price: 1200,
//     rating: 4.5,
//     duration: "7 days",
//     description1: "Experience the tropical paradise of Bali with beaches, culture, and more.",
//     description2: "Bali is a dream destination for many, offering a perfect blend of natural beauty, cultural richness, and modern amenities. This 7-day package will take you to some of Bali’s most iconic locations like Ubud’s Sacred Monkey Forest, the breathtaking rice terraces of Tegallalang, and the famous Uluwatu Temple perched on a cliff. Enjoy daily yoga sessions and unwind at luxury resorts with world-class spa facilities. The island’s vibrant arts scene and unique Balinese cuisine will captivate your senses, while the friendly locals will make you feel right at home.",
//     imageUrl: "https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "2",
//     destination: "Paris, France",
//     price: 2500,
//     rating: 5,
//     duration: "5 days",
//     description1: "Visit the romantic city of Paris and explore famous landmarks like the Eiffel Tower.",
//     description2: "Paris, known as the 'City of Light,' is a must-visit for travelers seeking romance, culture, and history. This 5-day package includes a visit to the iconic Eiffel Tower, the majestic Notre-Dame Cathedral, and the artistic haven of Montmartre. Stroll along the Champs-Élysées, explore the Louvre Museum, and witness the world-renowned art collection, including the Mona Lisa. Enjoy a Seine River cruise at sunset, experience Parisian café culture, and indulge in exquisite French cuisine at Michelin-star restaurants. Each day in Paris will leave you enchanted by its beauty and charm.",
//     imageUrl: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "3",
//     destination: "Kyoto, Japan",
//     price: 1800,
//     rating: 4.8,
//     duration: "5 days",
//     description1: "Explore the cultural wonders of Kyoto with its beautiful temples and traditions.",
//     description2: "Kyoto, Japan’s cultural heart, offers an unparalleled experience of traditional Japanese life. This 5-day tour will guide you through the tranquil gardens, ancient temples, and colorful shrines, including the iconic Fushimi Inari Shrine with its thousands of vermilion torii gates. Visit the serene Kinkaku-ji (Golden Pavilion), stroll through the Arashiyama Bamboo Grove, and immerse yourself in a traditional tea ceremony. Kyoto’s seasonal beauty, whether cherry blossoms in spring or autumn foliage, will leave you spellbound. Don’t miss the chance to witness the elegance of geishas in the Gion district.",
//     imageUrl: "https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-temple-161401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "4",
//     destination: "Rome, Italy",
//     price: 2200,
//     rating: 4.7,
//     duration: "7 days",
//     description1: "Discover the history and architecture of Rome, including the Colosseum and Vatican.",
//     description2: "Rome, the Eternal City, is a treasure trove of history, culture, and architecture. Over 7 days, explore iconic landmarks like the Colosseum, the Roman Forum, and the Pantheon, each bearing witness to the grandeur of the Roman Empire. Experience the spiritual and artistic wonders of Vatican City, including St. Peter’s Basilica and the Sistine Chapel. Wander through the charming streets of Trastevere, taste authentic Italian gelato, and dine at local trattorias. Whether it’s exploring ancient ruins or tossing a coin in the Trevi Fountain, Rome is an unforgettable experience.",
//     imageUrl: "https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "5",
//     destination: "New York City, USA",
//     price: 3000,
//     rating: 4.6,
//     duration: "5 days",
//     description1: "Visit the bustling streets of NYC and explore iconic spots like Times Square and Central Park.",
//     description2: "New York City, the city that never sleeps, offers an endless array of attractions for visitors. In this 5-day package, you’ll explore Times Square, walk through Central Park, and visit the Empire State Building. Take a ferry to the Statue of Liberty and Ellis Island for a glimpse of American history. Don’t miss the cultural landmarks such as the Metropolitan Museum of Art, the Broadway Theatre District, and the 9/11 Memorial. From shopping in Soho to dining in the world-class restaurants of Manhattan, NYC will exceed all expectations with its vibrancy and energy.",
//     imageUrl: "https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "6",
//     destination: "Sydney, Australia",
//     price: 2600,
//     rating: 4.9,
//     duration: "10 days",
//     description1: "Explore the beauty of Sydney with the iconic Opera House and harbor views.",
//     description2: "Sydney is a city that seamlessly blends urban sophistication with natural beauty. Over 10 days, this package takes you to iconic landmarks such as the Sydney Opera House, the Sydney Harbour Bridge, and Bondi Beach. You’ll have the chance to explore the historic Rocks District, take a ferry to Manly Beach, and visit Taronga Zoo. Enjoy a day trip to the stunning Blue Mountains and experience the vibrant nightlife at Darling Harbour. With a mix of adventure, culture, and relaxation, Sydney is the perfect destination for travelers of all kinds.",
//     imageUrl: "https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "7",
//     destination: "Rio de Janeiro, Brazil",
//     price: 1700,
//     rating: 4.4,
//     duration: "6 days",
//     description1: "Experience the vibrant culture and stunning beaches of Rio.",
//     description2: "Rio de Janeiro is a city like no other, bursting with energy, color, and rhythm. This 6-day package will take you to famous landmarks like Christ the Redeemer, Sugarloaf Mountain, and the vibrant Copacabana Beach. Enjoy the lively atmosphere of Lapa’s nightlife, explore the artistic streets of Santa Teresa, and take part in a samba class. During the day, visit the Tijuca National Park, the world’s largest urban forest, and relax on the city’s golden beaches. Rio’s unique culture, diverse cuisine, and breathtaking scenery make it an unforgettable experience.",
//     imageUrl: "https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "8",
//     destination: "Dubai, UAE",
//     price: 3500,
//     rating: 4.5,
//     duration: "5 days",
//     description1: "Discover the luxury and grandeur of Dubai's towering skyscrapers and desert adventures.",
//     description2: "Dubai is a city of superlatives, where everything is bigger, bolder, and more luxurious. Over 5 days, explore the Burj Khalifa, the tallest building in the world, and indulge in shopping at the Dubai Mall, home to over 1,200 stores. Experience a desert safari, complete with dune bashing, camel rides, and a traditional Bedouin dinner under the stars. Visit the Palm Jumeirah, the Dubai Fountain, and take a stroll through the historic Al Fahidi neighborhood. Whether you’re seeking luxury, adventure, or culture, Dubai offers an unparalleled experience for all.",
//     imageUrl: "https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "9",
//     destination: "Cape Town, South Africa",
//     price: 2400,
//     rating: 4.7,
//     duration: "7 days",
//     description1: "Visit the stunning landscapes of Cape Town, with its mountains and beaches.",
//     description2: "Cape Town is a city of contrasts, offering both natural beauty and a rich cultural heritage. This 7-day package includes visits to Table Mountain, Robben Island, and the V&A Waterfront. Take a scenic drive along Chapman’s Peak, visit the Cape of Good Hope, and explore the charming town of Stellenbosch in the heart of South Africa’s wine country. Enjoy a boat tour to see playful seals, spot penguins at Boulders Beach, and witness breathtaking sunsets at Camps Bay. Cape Town’s vibrant art scene, diverse cuisine, and stunning landscapes will leave you in awe.",
//     imageUrl: "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//     {
//     "_id": "10",
//     "destination": "Barcelona, Spain",
//     "price": 2500,
//     "rating": 4.8,
//     "duration": "7 days",
//     "description1": "Explore the vibrant city of Barcelona, Spain.",
//     "description2": "This 7-day adventure in Barcelona immerses you in the city's rich culture, architecture, and cuisine. Wander through the iconic streets of the Gothic Quarter, marvel at the architectural wonders of Antoni Gaudí such as the Sagrada Familia and Park Güell, and enjoy the lively atmosphere of La Rambla. Experience the local flavor with tapas tours, visit world-class museums, and relax on the beautiful beaches of the Mediterranean. Barcelona offers a perfect blend of history, art, and relaxation.",
//     "imageUrl": "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600"

//   }, 
//   {
//     "_id": "11",
//     "destination": "Tokyo, Japan",
//     "price": 2800,
//     "rating": 4.7,
//     "duration": "7 days",
//     "description1": "Experience the vibrant and futuristic city of Tokyo.",
//     "description2": "Immerse yourself in the bustling metropolis of Tokyo with this 7-day journey. Explore the dynamic neighborhoods of Shibuya and Shinjuku, visit historic temples like Senso-ji in Asakusa, and enjoy world-class shopping in Ginza. Discover the blend of traditional culture and cutting-edge technology as you dine on sushi, explore Akihabara’s electronics district, and relax in tranquil parks like Ueno. This trip provides a perfect mix of modern excitement and cultural exploration.",
//     "imageUrl": "https://images.pexels.com/photos/1510595/pexels-photo-1510595.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "12",
//     destination: "Machu Picchu, Peru",
//     price: 3200,
//     rating: 4.9,
//     duration: "8 days",
//     description1: "Embark on a journey to the ancient Incan ruins of Machu Picchu.",
//     description2: "This 8-day adventure to Machu Picchu takes you deep into the heart of the Andes Mountains, where you’ll explore one of the most iconic archaeological sites in the world. Discover the mysteries of the Incan Empire as you hike along the famous Inca Trail, surrounded by breathtaking mountain vistas. Along the way, visit the Sacred Valley, Cusco, and other ancient ruins, all while immersing yourself in the rich culture and history of Peru. This trip offers a perfect balance of adventure, history, and natural beauty.",
//     imageUrl: "https://images.pexels.com/photos/28128935/pexels-photo-28128935/free-photo-of-machu-picchu.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "13",
//     destination: "Istanbul, Turkey",
//     price: 1900,
//     rating: 4.7,
//     duration: "5 days",
//     description1: "Experience the cultural crossroads of Istanbul.",
//     description2: "Istanbul is a city where East meets West, offering a unique blend of European and Asian influences. Over 5 days, you’ll explore the Hagia Sophia, Blue Mosque, and Topkapi Palace. Wander through the bustling Grand Bazaar, sail down the Bosphorus, and taste the city’s delicious street food. Istanbul’s rich history, vibrant culture, and dynamic mix of the old and the new make it a fascinating destination for all types of travelers.",
//     imageUrl: "https://images.pexels.com/photos/7529416/pexels-photo-7529416.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "14",
//     destination: "Queenstown, New Zealand",
//     price: 2700,
//     rating: 4.8,
//     duration: "9 days",
//     description1: "Explore the adventure capital of New Zealand, Queenstown.",
//     description2: "Queenstown is renowned for its stunning landscapes and thrilling outdoor activities. In this 9-day adventure, you’ll experience everything from bungee jumping and skydiving to scenic cruises on Lake Wakatipu. Visit the stunning Milford Sound, hike through the Remarkables mountain range, and explore the charming town of Arrowtown. Queenstown offers a perfect mix of adventure and relaxation, making it an ideal destination for thrill-seekers and nature lovers alike.",
//     imageUrl: "https://images.pexels.com/photos/27623568/pexels-photo-27623568/free-photo-of-a-view-of-the-city-of-queenstown-from-the-top-of-a-mountain.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "15",
//     destination: "Cairo, Egypt",
//     price: 2300,
//     rating: 4.5,
//     duration: "7 days",
//     description1: "Discover the ancient wonders of Cairo, Egypt.",
//     description2: "Cairo, the capital of Egypt, is home to some of the world’s most famous ancient landmarks. Over 7 days, explore the Great Pyramids of Giza, the Sphinx, and the Egyptian Museum, where you can see the treasures of Tutankhamun. Wander through the lively streets of Islamic Cairo, visit the Khan el-Khalili bazaar, and take a boat ride along the Nile River. Cairo’s blend of ancient history and modern culture makes it a captivating destination for travelers seeking a rich, immersive experience.",
//     imageUrl: "https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "16",
//     destination: "Hawaii, USA",
//     price: 3200,
//     rating: 4.9,
//     duration: "10 days",
//     description1: "Relax and explore the tropical paradise of Hawaii.",
//     description2: "Hawaii is a dream destination for beach lovers, adventurers, and cultural enthusiasts. In this 10-day package, visit the islands of Oahu, Maui, and the Big Island, where you can relax on pristine beaches, hike through lush rainforests, and witness the power of active volcanoes. Enjoy traditional Hawaiian luaus, surf the famous waves of Waikiki, and snorkel in the crystal-clear waters of Molokini Crater. Hawaii offers a perfect blend of relaxation, adventure, and cultural discovery.",
//     imageUrl: "https://images.pexels.com/photos/15581799/pexels-photo-15581799/free-photo-of-aerial-shot-of-sea-harbor-and-city-waikiki-honolulu-hawai-usa.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "17",
//     destination: "Phuket, Thailand",
//     price: 1500,
//     rating: 4.6,
//     duration: "6 days",
//     description1: "Experience the vibrant island life of Phuket.",
//     description2: "Phuket, Thailand’s largest island, is famous for its beautiful beaches, lively nightlife, and rich cultural heritage. This 6-day package offers a mix of relaxation and exploration, from lounging on Patong Beach to visiting the Big Buddha and Wat Chalong temple. Enjoy boat trips to the Phi Phi Islands and Phang Nga Bay, known for their crystal-clear waters and dramatic limestone cliffs. Phuket is an ideal destination for travelers looking for a mix of relaxation, culture, and adventure.",
//     imageUrl: "https://images.pexels.com/photos/11434425/pexels-photo-11434425.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "18",
//     destination: "Berlin, Germany",
//     price: 2100,
//     rating: 4.6,
//     duration: "5 days",
//     description1: "Explore the rich history and modern attractions of Berlin.",
//     description2: "Berlin, the capital of Germany, is a city that perfectly blends history, culture, and innovation. In this 5-day package, you’ll visit iconic landmarks such as the Brandenburg Gate, the Berlin Wall, and Checkpoint Charlie. Explore the city’s world-class museums on Museum Island, stroll through the Tiergarten, and experience the dynamic art and music scene in Kreuzberg. Berlin’s unique mix of history and modernity makes it a fascinating destination for any traveler.",
//     imageUrl: "https://images.pexels.com/photos/1114892/pexels-photo-1114892.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "19",
//     destination: "Banff, Canada",
//     price: 2600,
//     rating: 4.9,
//     duration: "8 days",
//     description1: "Explore the stunning Rocky Mountains in Banff.",
//     description2: "Banff, located in the heart of the Canadian Rockies, is a haven for nature lovers. This 8-day package takes you through Banff National Park, where you’ll witness breathtaking mountain views, crystal-clear lakes, and abundant wildlife. Hike along scenic trails, canoe on Lake Louise, and take a gondola ride up Sulphur Mountain. In the winter, enjoy world-class skiing and snowboarding. Banff offers a perfect combination of adventure, relaxation, and natural beauty.",
//     imageUrl: "https://images.pexels.com/photos/1598072/pexels-photo-1598072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//   },
//   {
//     _id: "20",
//     destination: "Jaipur, India",
//     price: 1500,
//     rating: 4.7,
//     duration: "5 days",
//     description1: "Discover the royal heritage of Jaipur, the Pink City.",
//     description2: "Jaipur, the capital of Rajasthan, is famous for its majestic palaces, forts, and vibrant culture. Over 5 days, explore the Amber Fort, City Palace, and Hawa Mahal, and take an elephant ride up to the fort. Wander through the colorful bazaars filled with handicrafts, jewelry, and textiles. Jaipur’s rich history, combined with its modern vibrancy, makes it a fascinating destination for anyone interested in India’s royal past.",
//     imageUrl: "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=600"
//   },
//   {
//     _id: "21",
//     destination: "Kerala, India",
//     price: 1700,
//     rating: 4.8,
//     duration: "7 days",
//     description1: "Experience the lush beauty of Kerala, God's Own Country.",
//     description2: "Kerala is known for its serene backwaters, lush greenery, and rich cultural traditions. In this 7-day package, you’ll cruise through the backwaters on a traditional houseboat, relax on the beaches of Kovalam, and explore the hill stations of Munnar. Visit tea plantations, spice gardens, and wildlife sanctuaries. Kerala offers a peaceful and rejuvenating experience, perfect for those looking to escape the hustle and bustle of daily life.",
//     imageUrl: "https://images.pexels.com/photos/3370598/pexels-photo-3370598.jpeg?auto=compress&cs=tinysrgb&w=600"

  {
  "_id": "22",
  "destination": "Budapest, Hungary",
  "price": 2200,
  "rating": 4.7,
  "duration": "5 days",
  "description1": "Discover the enchanting city of Budapest, Hungary.",
  "description2": "This 5-day journey in Budapest offers a deep dive into the city's stunning architecture, thermal baths, and vibrant culture. Stroll along the Danube River, admire the grandeur of Buda Castle and the Parliament Building, and relax in the famous Széchenyi Thermal Bath. Experience the rich culinary scene with traditional Hungarian dishes and explore the charming streets of the Jewish Quarter. Budapest provides a captivating mix of history, beauty, and relaxation.",
  "imageUrl": "https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&cs=tinysrgb&w=600"
}
  
];
    tempPackage.forEach((item) =>{
        let newPackage = new TravelPackageModel({
            destination: item.destination,
            price: item.price,
            rating: item.rating,
            duration: item.duration,
            description1: item.description1,
            description2:item.description2,
            imageUrl: item.imageUrl,
        });
        newPackage.save();
    });
    res.send("Done")
})

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error:", err));
});


