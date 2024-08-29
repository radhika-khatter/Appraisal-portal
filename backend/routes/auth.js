const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Utility function to handle sign-up
const handleSignUp = async (req, res, model) => {
    const { name, email, password } = req.body;

    try {
        let user = await model.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new model({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.send('User saved');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Utility function to handle sign-in
const handleSignIn = async (req, res, model) => {
    const { email, password } = req.body;

    try {
        let user = await model.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.send('User signed in');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Sign up and Sign in routes for Faculty
router.post('/signup/faculty', (req, res) => handleSignUp(req, res, User));
router.post('/signin/faculty', (req, res) => handleSignIn(req, res, User));

// Sign up and Sign in routes for Admin
router.post('/signup/admin', (req, res) => handleSignUp(req, res, Admin));
router.post('/signin/admin', (req, res) => handleSignIn(req, res, Admin));

module.exports = router;

