const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Note = require('../models/note.js');

router.get('/getNotes', fetchUser, async (req, res) => {

});

router.post('/newNote', fetchUser,  async (req, res) => {
    const { title, description, tag } = req.body;
    
});

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

});

router.put('/updateNote/:id', fetchUser, async (req, res) => {

});

module.exports = router;