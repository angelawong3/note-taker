const api = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
let newId = uuidv4();

// read and display notes from db.json
api.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../db/db.json"));
});

// create new note and add to file
api.post("/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));

  // assign uuid to each json object
  newNote.id = newId;
  //push updated note to file
  noteList.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

// del note with matching id
api.delete("/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json"));
  let noteId = req.params.id.toString();

  noteList = noteList.filter((selected) => {
    return selected.id != noteId;
  });

  // update note list
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

module.exports = api;
