const express = require('express');
const axios = require('axios');
const router = express.Router();

async function fetchData(url, options = {}) {
  try {
    const response = await axios.get(url, { headers: options.headers || {} });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

router.get('/', (req, res) => {
  res.render('makeup-products', { products: null });
});

router.post('/', async (req, res) => {
  const searchQuery = req.body.search.toLowerCase();
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products.json?brand=nyx&product_type=${encodeURIComponent(searchQuery)}`;

  try {
    const products = await fetchData(apiUrl); 
    const filteredProducts = products.filter(product => product.image_link && product.product_link);
    res.render('makeup-products', { products: filteredProducts });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.render('makeup-products', { products: null, error: 'Error fetching data' });
  }
});


const YELP_API_KEY = 'nuyFelZ_i30p8nE_g0BHG751fEfaMsAVwlrNfA1dNgywsS6iYKzDM9qSksqNAv4W_U-f33JhvB4rTG6riJDUOHwzR0P_vgUizltYGo0JewTbV0nVHklKJTPq9zngZXYx'; // Use your actual Yelp API key

router.get('/salons', (req, res) => {
  res.render('api2', { salons: null });
});

const categoryMap = {
  nails: 'othersalons',
  makeup: 'makeupartists',
  hair: 'hair',
  eyelash: 'eyelashservice',
  spa: 'spas',
  skincare: 'skincare'
};

router.post('/salons', async (req, res) => {
  const userSearch = req.body.category.toLowerCase(); 
  const yelpCategory = categoryMap[userSearch] || 'beautysvc'; 

  const url = `https://api.yelp.com/v3/businesses/search?location=New York&categories=${yelpCategory}&limit=9`;

  const options = {
    headers: {
      Authorization: `Bearer ${YELP_API_KEY}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    const data = await fetchData(url, options); 
    const salons = data.businesses.map(business => ({
      name: business.name,
      image_url: business.image_url,
      url: business.url,
      rating: business.rating,
      address: business.location.display_address.join(', '), 
      services: business.categories.map(category => category.title).join(', '), 
      coordinates: business.coordinates 
    }));
    res.render('api2', { salons });
  } catch (error) {
    console.error('Error:', error);
    res.render('api2', { salons: null, error: 'Error fetching data' });
  }
});


//cbaceb99cefe40acba91f7504ef24af0
const NEWS_API_KEY = 'cbaceb99cefe40acba91f7504ef24af0'; 
const BASE_URL = 'https://newsapi.org/v2/everything';

async function fetchBeautyNews(query) {
  const url = `${BASE_URL}?q="${encodeURIComponent(query)}"&sortBy=popularity&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await axios.get(url);
    const articles = response.data.articles;

    const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(query.toLowerCase()));

    return filteredArticles;
  } catch (error) {
    console.error('Error fetching beauty news:', error);
    return [];
  }
}

router.get('/beauty-news', (req, res) => {
  res.render('beauty-news', { articles: null });
});

router.post('/beauty-news', async (req, res) => {
  const query = req.body.search; 
  const articles = await fetchBeautyNews(query); 
  res.render('beauty-news', { articles }); 
});

module.exports = router;
