const mongoose = require('mongoose');

const carouselItemSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('CarouselItem', carouselItemSchema);

