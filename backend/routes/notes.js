const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const fetchUser = require('../middleware/fetchUser.js');

const Note = require('../models/note.js');

router.get('/getNotes', fetchUser,
    async (req, res) => {

    }
);

router.post('/newNote', fetchUser,  
    [
        body('title', 'Enter a Title').isEmpty(),
        body('description', 'Enter a Description').isEmpty(),
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;
        
    }
);

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

});

router.put('/updateNote/:id', fetchUser,
    [
        body('title', 'Enter a Title').isEmpty(),
        body('description', 'Enter a Description').isEmpty(),
    ],
    async (req, res) => {
        const { title, description, tag } = req.body;
        
    }
);

module.exports = router;