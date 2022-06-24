// import express
const express = require("express");

// routes
const html = require("./routes/html");
const api = require("./routes/api");

// use port from heroku or 3001
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use("/", html);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
