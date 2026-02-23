const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        return res.json({ success: true });

    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Signup failed" });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: "Incorrect password" });
        }

        req.session.user = user;

        return res.json({ success: true });

    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Login failed" });
    }
});

module.exports = router;
