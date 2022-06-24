const api = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// read and display notes from db.json
api.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

// create new note and add to file
api.post("/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));

  // assign uuid to each json object
  newNote.id = uuidv4();

  //push updated note to file
  noteList.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

api.delete("/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
  // del note with matching id
  let deleteNote = noteList.filter((selected) => selected.id !== req.params.id);

  // update note list
  fs.writeFileSync("./db/db.json", JSON.stringify(deleteNote));
  res.json(deleteNote);
});

module.exports = api;
