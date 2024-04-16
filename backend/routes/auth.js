const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET_STRING = process.env.JWT_SECRET_STRING;

const fetchuser = require('../middleware/fetchuser.js');

const User = require('../models/user.js');

router.post('/login', 
    [
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a valid Password').isLength({ min: 8 }),
    ], 
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({error: errors.array()[0].msg});
            }
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if(user) {
                const passwordCompare = await bcrypt.compare(password, user.password);
                if(passwordCompare) {
                    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
                    res.status(200).json({token});
                } else {
                    res.status(400).json({error: 'Invalid Credentials'});
                }
            } else {
                res.status(400).json({error: 'Invalid Credentials'});
            }

            const token = jwt.sign({id: user._id, name: user.name}, JWT_SECRET_STRING);
            res.status(200).json({token});

        } catch(error) {
            console.log(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    } 
);

router.post('/signUp', 
    [
        body('name', 'Enter a valid Name').isLength({ min: 3 }),
        body('email', 'Enter a valid Email').isEmail(),
        body('password', 'Enter a valid Password').isLength({ min: 8 }),
    ], 
    async (req, res) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({error: errors.array()[0].msg});
            }
            const {name, email, password} = req.body;
            const user = await User.findOne({email});
            if(user) {
                return res.status(400).json({error: 'User already exists with this Email'});
            }
            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(password, salt);
            const newUser = await User.create({
                name,
                email,
                password: securePassword,
            });
            const token = jwt.sign({id: newUser._id, name}, JWT_SECRET_STRING);
            res.status(200).json({token});
        } catch(error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
);

router.get('/getUser', fetchuser, async (req, res) => {
    res.status(200).json({ name: req.user.name });
});

module.exports = router;


