// Assuming this is part of a route handler or a setup script in your Node.js application
const CityInfo = require('./models/CityInfo'); // Adjust the path to where your model is located

const newCityInfo = new CityInfo({
  name: "New York City",
  description: "A brief description of New York City.",
  images: [
    { url: "path/to/first/image.jpg", name: "First Image Name", description: "Description of the first image." },
    { url: "path/to/second/image.jpg", name: "Second Image Name", description: "Description of the second image." },
    { url: "path/to/third/image.jpg", name: "Third Image Name", description: "Description of the third image." }
  ]
});

newCityInfo.save()
  .then(doc => console.log("Document inserted:", doc))
  .catch(err => console.error("Error inserting document:", err));
