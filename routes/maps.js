/*  All routes for Maps are defined here
    DATA: api/maps/
*/
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:map_id", (req, res) => {
    let queryString = `
    SELECT * FROM maps
    WHERE maps.id = $1 AND is_active = TRUE;`;
    const queryParams = [req.params.map_id];
    db.query(queryString, queryParams)
      .then((data) => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/latest/map", (req, res) => {
    let queryString = `
    SELECT id
    FROM maps
    ORDER BY id DESC
    LIMIT 1;`;
    db.query(queryString)
      .then((data) => {
        const maps = data.rows[0];
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    let queryString = `
    SELECT *
    FROM maps
    WHERE is_active = TRUE;`;
    db.query(queryString)
      .then((data) => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });


  router.post("/", (req, res) => {
    let queryString = `
    INSERT INTO maps(user_id, name, center_lat, center_long, zoom, type)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`;
    const queryParams = Object.values(req.body);
    db.query(queryString, queryParams)
      .then((data) => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:map_id/delete", (req, res) => {
    let queryString = `
    UPDATE maps SET is_active = FALSE
    WHERE maps.id = $1
    RETURNING *;
    `;
    const queryParams = [req.params.map_id];
    db.query(queryString, queryParams)
      .then((data) => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
