const express = require('express');
const notes = require('../controller/notesController');

const router = express.Router();

router.get('/', notes.getNotes);
router.get('/new', notes.newNote);
router.post('/new', notes.createNote);
router.get('/edit/:id/', notes.getNote);
router.post('/edit/:id/', notes.editNote);
router.delete('/:id/', notes.deleteNote);

module.exports = router;
