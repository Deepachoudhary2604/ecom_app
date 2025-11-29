const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

// Sign up page (GET)
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// Sign up (POST)
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        // Validate inputs
        if (!username || !email || !password || !confirmPassword) {
            req.flash('error', 'All fields are required!');
            return res.redirect('/signup');
        }

        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match!');
            return res.redirect('/signup');
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            req.flash('error', 'Username or Email already exists!');
            return res.redirect('/signup');
        }

        // Create new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        req.flash('success', 'Account created successfully! Please login.');
        res.redirect('/login');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
});

// Login page (GET)
router.get('/login', (req, res) => {
    res.render('auth/login');
});

// Login (POST)
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    res.redirect('/products');
});

// Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash('success', 'You have been logged out!');
        res.redirect('/products');
    });
});

module.exports = router;
