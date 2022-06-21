const api = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const newId = uuidv4();

// create new note and add to file
api.post("/notes", (req, res) => {
  let newNote = req.body;
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

  // assign uuid to each json object
  newNote.id = newId;
  //push updated note to file
  noteList.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

// del note with matching id
api.delete("/notes/:id", (req, res) => {
  let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteId = req.params.id.toString();

  noteList = noteList.filter((selected) => {
    return selected.id != noteId;
  });

  // update note list
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
});

module.exports = api;
