const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Read notes from the db.json file
router.get('/notes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('develop/db/db.json', 'utf8'));
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while reading notes.' });
  }
});

// Create a new note and save it to the db.json file
router.post('/notes', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('develop/db/db.json', 'utf8'));
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };

    data.push(newNote);
    fs.writeFileSync('develop/db/db.json', JSON.stringify(data, null, 2));
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving the note.' });
  }
});

// Delete a note with a specific ID
router.delete('/notes/:id', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('develop/db/db.json', 'utf8'));
    const noteId = req.params.id;

    const updatedData = data.filter((note) => note.id !== noteId);
    fs.writeFileSync('develop/db/db.json', JSON.stringify(updatedData, null, 2));
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the note.' });
  }
});

module.exports = router;
