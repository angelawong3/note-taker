const html = require("express").Router();
const path = require("path");

// get notes.html
html.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// get index.html
html.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = html;
