const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const fetchUser = require('../middleware/fetchUser.js');

const Note = require('../models/note.js');

router.get('/getNotes', fetchUser,
    async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id });
            res.status(200).json(notes);
        } catch(err) {
            res.status(500).json({ error: `Internal Server Error!` });
        }
    }
);

router.post('/newNote', fetchUser,  
    [
        body('title', 'Enter a Title').isEmpty(),
        body('description', 'Enter a Description').isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        try {
            const the_new_note = {
                title: req.body.title,
                description: req.body.description,
                user: req.user.id
            }

            if(req.body.tag) {
                the_new_note.tag = req.body.tag 
            }

            await Note.create(the_new_note);
            res.status(200).json({ message: `Note created successfully!` });
        } catch(err) {
            res.status(500).json({ error: `Internal Server Error!` });
        }
        
    }
);

router.delete('/deleteNote/:id', fetchUser,
    async (req, res) => {
        try {
            const note = await findById(req.params.id);
            if(!note) {
                return res.status(404).json({ error: `Note not found!` });
            }

            if(note.user != req.user.id) {
                return res.status(401).json({ error: `Not authorized!` });
            }

            await Note.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: `Note deleted successfully!` });
        } catch(err) {
            res.status(500).json({ error: `Internal Server Error!` });
        }      
    }
);

router.put('/updateNote/:id', fetchUser,
    [
        body('title', 'Enter a Title').isEmpty(),
        body('description', 'Enter a Description').isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        try {
            const note = await findById(req.params.id);
            if(!note) {
                return res.status(404).json({ error: `Note not found!` });
            }

            if(note.user != req.user.id) {
                return res.status(401).json({ error: `Not authorized!` });
            }

            await Note.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json({ message: `Note updated successfully!` });
        } catch(err) {
            res.status(500).json({ error: `Internal Server Error!` });
        }      
    }
);

module.exports = router;