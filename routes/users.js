/*  All routes for Users are defined here
    DATA: api/users/
*/
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let queryString = `
    SELECT *
    FROM users;
    `;
    db.query(queryString)
      .then((data) => {
        const user = data.rows;
        res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:email", (req, res) => {
    let queryString = `
    SELECT users.*,  COUNT(points.*) AS number_points, COUNT(maps.*) AS number_maps
    FROM users
    JOIN maps ON users.id = maps.user_id
    JOIN points ON maps.id = points.map_id
    WHERE users.email = $1 AND maps.is_active = TRUE
    GROUP by users.id;
    `;
    const queryParams = [req.params.email];
    db.query(queryString, queryParams)
      .then((data) => {
        const user = data.rows;
        res.json({ user });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
