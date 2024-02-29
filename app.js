const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user'); // Ensure the path is correct

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017', 
{ useNewUrlParser: true, useUnifiedTopology: true });

app.post('/register', async (req, res) => {
    try {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        country: req.body.country,
        gender: req.body.gender
      });
      await newUser.save();
      res.send('User registered successfully');
    } catch (error) {
      res.status(500).send('Error registering new user');
    }
  });
  
app.get('/register', (req, res) => {
  res.render('register');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
