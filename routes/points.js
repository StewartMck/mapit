/*  All routes for Points are defined here
    DATA: api/points/
*/
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:map_id", (req, res) => {
    let queryString = `
    SELECT *
    FROM points
    WHERE map_id = $1 AND is_active = TRUE;`;
    const queryParams = [req.params.map_id];
    db.query(queryString, queryParams)
      .then((data) => {
        const points = data.rows;
        res.json({ points });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    let queryString = `
    INSERT INTO points(title, description, image_url, longitude, latitude, type, rating, map_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`;
    const queryParams = Object.values(req.body);
    db.query(queryString, queryParams)
      .then((data) => {
        const points = data.rows;
        res.json({ points });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:point_id", (req, res) => {
    let queryString = `
    UPDATE points
    SET title = $1, description = $2, image_url = $3, type = $4, rating = $5
    WHERE points.id = $6
    RETURNING *`;
    const queryParams = Object.values(req.body);
    queryParams.push(req.params.point_id);
    db.query(queryString, queryParams)
      .then((data) => {
        const points = data.rows;
        res.json({ points });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:point_id/delete", (req, res) => {
    let queryString = `
    UPDATE points SET is_active = FALSE
    WHERE points.id = $1
    RETURNING *
    `;
    const queryParams = [req.params.point_id];
    db.query(queryString, queryParams)
      .then((data) => {
        const points = data.rows;
        res.json({ points });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
