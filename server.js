const express = require("express");
const path = require("path");
// route
const api = require("./routes/api");

// use port from heroku or 3001
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

// get notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// read and display notes from db.json
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "db/db.json"));
});

// get index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
