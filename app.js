const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth'); 
const apiRoutes = require('./routes/api');
const adminRoutes = require('./routes/adminRoutes');

app.use(function(err, req, res, next) {
  console.error(err.stack); // Log the error to the server console for debugging
  res.status(500).json({ success: false, error: 'Internal Server Error' }); // Send a JSON response
});

const CarouselItem = require('./models/carouselItem');
const CityInfo = require('./models/carouselItem');

const app = express();

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '89',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
  if(req.session.userId) {
      res.redirect('/main'); 
  } else {
      res.render('welcome'); 
  }
});

function isAuthenticated(req, res, next) {
  if (req.session.user) {
      next();
  } else {
      res.redirect('/login');
  }
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.isAdmin) {
      next();
  } else {
      res.status(403).send('Access denied. Only admins are allowed here.');
  }
}
 // Make sure to require the model at the top of your app.js

 app.get('/main', async (req, res) => {
  try {
      // Fetch city information if you have such a model. This is just an example.
      const cityInfo = await CityInfo.findOne() || { images: [], name: '', description: '' };
      // Fetch all carousel items from the database
      const carouselItems = await CarouselItem.find({});
      // Check if the logged-in user is an admin
      const isAdmin = req.session.user && req.session.user.isAdmin;
      // Render the main page template with the fetched data
      res.render('main', { cityInfo, carouselItems, isAdmin });
  } catch (error) {
      console.error('Failed to fetch data:', error);
      res.render('main', { errorMessage: 'Failed to load the page due to an error.' }); 
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if(err) {
          console.log(err); 
          res.redirect('/main');
      } else {
          res.clearCookie('connect.sid', { path: '/' }); 
          res.redirect('/'); 
      }
  });
});

app.get('/adminOnlyPage', isAdmin, (req, res) => {
  res.render('adminOnlyPage');
});

app.use(express.static('public'));

app.use('/makeup-products', require('./routes/api'));

app.use('/', authRoutes); 
//app.use('/main', isAuthenticated, indexRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
