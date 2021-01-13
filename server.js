// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session')


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));

app.use(cookieSession({
  name: "session",
  keys: ["key1"],
  secret: "You will never crack this"
}));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes = require("./routes/maps");
const pointRoutes = require("./routes/points");
const commentRoutes = require("./routes/comments");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/maps", mapsRoutes(db));
app.use("/api/points", pointRoutes(db));
app.use("/api/comments", commentRoutes(db));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  const userID = req.session.user_id;

  //checking if user is logged in
  if (!userID) {
    res.render("index_landing");
    return;
  }

  res.render("map");
});


//login where it sets a cookie by user_id
app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

app.get("/user", (req, res) => {
  const userId = req.session.user_id

  if (!userId) {
    res.render("/index_landing");
    return;
  }
  //db queries here pass results to temp vars
  let queryString = `
  SELECT *
  FROM users
  WHERE users.id = $1`
  const queryParams = [userId];
  db.query(queryString, queryParams)
    .then((data) => {
      const templateVars = data.rows[0];
      console.log(templateVars);
      res.render("user", templateVars);
    })
});

// app.post("/api/maps/:map_id/delete", (req, res) => {
//   res.redirect("/user")
// })

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
