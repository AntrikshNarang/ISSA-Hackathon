const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const fetchUser = require('../middleware/fetchUser.js');

const User = require('../models/user.js');

router.post('/login', 
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a valid Password').isLength({ min: 8 }),
    ], 
    async (req, res) => {
       
    }
);

router.post('/signUp', 
    [
        body('name', 'Enter a valid Name').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a valid Password').isLength({ min: 8 }),
    ], 
    async (req, res) => {
        
    }
);

router.get('/getUser', fetchUser, async (req, res) => {
    res.status(200).json({ name: req.user.name });
});

module.exports = router;


