/*  All routes for Favourites are defined here
    DATA: api/favourites/
*/
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/:user_id", (req, res) => {
    let queryString = `
    INSERT INTO favourites (map_id, user_id)
VALUES ($1, $2)
RETURNING *;`;
    const queryParams = Object.values(req.body);
    console.log(queryParams);
    queryParams.push(req.params.user_id);
    console.log(queryParams);
    db.query(queryString, queryParams)
      .then((data) => {
        const map = data.rows;
        res.json({ map });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:user_id/delete", (req, res) => {
    let queryString = `
    DELETE FROM favourites WHERE map_id = $1 AND user_id = $2
    RETURNING *;
    `;
    const queryParams = Object.values(req.body);
    console.log(queryParams);
    queryParams.push(req.params.user_id);
    console.log(queryParams);

    db.query(queryString, queryParams)
      .then((data) => {
        const map = data.rows;
        res.json({ map });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
