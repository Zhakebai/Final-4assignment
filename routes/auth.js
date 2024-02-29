const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const ADMIN_USERNAME = 'Zhanerke';
const ADMIN_EMAIL = 'janerke05070507@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'janerke05070507@gmail.com', 
      pass: 'bxvlliteyuufvjwg' 
  }
});

router.get('/register', (req, res) => {
    res.render('register', { errorMessage: null });
});

router.post('/register', async (req, res) => {
    try {

        const existingUserByUsername = await User.findOne({ username: req.body.username });
        if (existingUserByUsername) {
            return res.render('register', { errorMessage: 'Username already taken. Please choose another.' });
        }

        const existingUserByEmail = await User.findOne({ email: req.body.email });
        if (existingUserByEmail) {
            return res.render('register', { errorMessage: 'Email already in use. Please login or use another email.' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword, 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            age: req.body.age,
            country: req.body.country,
            gender: req.body.gender,
            role: 'regular user'
        });
        await user.save();

        
        req.session.userId = user._id;
        req.session.role = user.role;

        const mailOptions = {
            from: 'janerke05070507@gmail.com',
            to: user.email,
            subject: 'Welcome to Our App!',
            text: `Hello ${user.firstName}!\n\nWelcome to Our App. We're glad to have you with us.`,
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
                res.render('register', { errorMessage: 'User registered but failed to send welcome email.' });
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('/main');
            }
        });

    } catch (error) {
        console.error(error);
        res.render('register', { errorMessage: 'An error occurred during registration.' });
    }
});

router.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.render('login', { errorMessage: 'No account found with that email. Please register.' });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
            req.session.user = {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.role === 'admin'
            };
            res.redirect('/main');
        } else {
            res.render('login', { errorMessage: 'Incorrect password.' });
        }
    } catch (error) {
        console.error(error);
        res.render('login', { errorMessage: 'An error occurred during login.' });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err);
            res.redirect('/main');
        } else {
            res.clearCookie('connect.sid');
            res.redirect('/');
        }
    });
});

module.exports = router;


