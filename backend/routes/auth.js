const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
});

router.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    
});

router.get('/getUser', fetchUser, async (req, res) => {
    res.status(200).json({ name: req.user.name });
});

module.exports = router;


