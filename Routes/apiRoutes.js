const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const apiRouter = express.Router();

apiRouter.get('/notes', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  res.json(notes);
});

apiRouter.post('/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();
  const notes = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  notes.push(newNote);
  fs.writeFileSync('db.json', JSON.stringify(notes, null, 2));
  res.json(newNote);
});

module.exports = apiRouter;
