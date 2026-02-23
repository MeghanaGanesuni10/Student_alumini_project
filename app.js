require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const User = require('./models/User');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, "public")));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

app.use('/api', require('./routes/auth'));


// 🔐 PROTECTED DASHBOARD ROUTE
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, "public/dashboard.html"));
});
// PROFILE PAGE
app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, "public/profile.html"));
});

// ALUMNI PAGE
app.get('/alumni', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, "public/alumni.html"));
});

// MENTORSHIP PAGE
app.get('/mentorship', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, "public/mentorship.html"));
});

// JOBS PAGE
app.get('/jobs', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login.html');
    }
    res.sendFile(path.join(__dirname, "public/jobs.html"));
});

// GET LOGGED IN USER DATA
app.get('/api/user', (req, res) => {
    if (!req.session.user) {
        return res.json({ success: false });
    }
    res.json({ success: true, user: req.session.user });
});

// LOGOUT
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
