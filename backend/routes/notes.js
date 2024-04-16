const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');

const fetchuser = require('../middleware/fetchuser.js');
const {encryptText, decryptText} = require('../middleware/crypt.js');

const Note = require('../models/note.js');

router.get('/getNotes', fetchuser, async (req, res) => {
        try {
            const notes = await Note.find({ user: req.user.id });
            for(let i = 0; i < notes.length; i++) {
                notes[i].description = decryptText(notes[i].description);
            }
            res.status(200).json(notes);
        } catch(err) {
            console.log(err)
            res.status(500).json({ error: `Internal Server Error!` });
        }
    }
);

router.get('/getNote/:id', fetchuser,
    async (req, res) => {
        try {
            console.log('first');
            const note = await Note.findById(req.params.id);
            if(!note) {
                return res.status(404).json({ error: `Note not found!` });
            }

            if(note.user != req.user.id) {
                return res.status(401).json({ error: `Not authorized!` });
            }
            console.log(note)
            
            note.description = decryptText(note.description);
            res.status(200).json(note);
        } catch(err) {
            res.status(500).json({ error: `Internal Server Error!` });
        }
    }
);

router.post('/newNote', fetchuser,  
    [
        body('title', 'Enter a Title').notEmpty(),
        body('description', 'Enter a Description').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        try {
            const the_new_note = {
                title: req.body.title,
                description: encryptText(req.body.description),
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

router.delete('/deleteNote/:id', fetchuser,
    async (req, res) => {
        try {
            const note = await Note.findById(req.params.id);
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

router.put('/updateNote/:id', fetchuser,
    [
        body('title', 'Enter a Title').notEmpty(),
        body('description', 'Enter a Description').notEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array()[0].msg });
        }

        try {
            const note = await Note.findById(req.params.id);
            if(!note) {
                return res.status(404).json({ error: `Note not found!` });
            }

            if(note.user != req.user.id) {
                return res.status(401).json({ error: `Not authorized!` });
            }

            req.body.description = encryptText(req.body.description);
            await Note.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json({ message: `Note updated successfully!` });
        } catch(err) {
            console.log(err);
            res.status(500).json({ error: `Internal Server Error!` });
        }      
    }
);

router.get('/searchNotes/:query', fetchuser, 
    async (req, res) => {
        try {
            const notes = await Note.find({user: req.user.id, $text: { $search: req.params.query }});
            res.status(200).json(notes);
        } catch(err) {
            res.status(500).json({ error: `Internal Server Error!` });
        }
    }
);

module.exports = router;