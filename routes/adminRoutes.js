const express = require('express');
const router = express.Router();
const CarouselItem = require('../models/carouselItem');

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized: Please log in.' });
  }
};

router.post('/admin/carousel', isAuthenticated, async (req, res) => {
  try {
    const newItem = new CarouselItem({
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      description: req.body.description
    });
    const savedItem = await newItem.save();
    res.status(201).json({ success: true, item: savedItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/admin/carousel/:id', isAuthenticated, async (req, res) => {
  try {
    await CarouselItem.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, message: 'Item updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/admin/carousel/:id', isAuthenticated, async (req, res) => {
  try {
    await CarouselItem.findByIdAndRemove(req.params.id);
    res.json({ success: true, message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;

