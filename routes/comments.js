/*  All routes for Comments are defined here
    DATA: api/comments/
*/
const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:point_id", (req, res) => {
    let queryString = `
    SELECT *
    FROM comments
    WHERE point_id = $1 AND is_active = TRUE;`;
    const queryParams = [req.params.point_id];
    db.query(queryString, queryParams)
      .then((data) => {
        const comments = data.rows;
        res.json({ comments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    let queryString = `
    INSERT INTO comments(comment, point_id)
    VALUES($1, $2)
    RETURNING *`;
    const queryParams = Object.values(req.body);
    db.query(queryString, queryParams)
      .then((data) => {
        const comments = data.rows;
        res.json({ comments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:comment_id", (req, res) => {
    let queryString = `
    UPDATE comments SET comment = $1
    WHERE comments.id = $2
    RETURNING *`;
    const queryParams = Object.values(req.body);
    queryParams.push(req.params.comment_id);
    db.query(queryString, queryParams)
      .then((data) => {
        const comments = data.rows;
        res.json({ comments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/:comment_id/delete", (req, res) => {
    let queryString = `
    UPDATE comments SET is_active = FALSE
    WHERE comments.id = $1
    RETURNING *
    `;
    const queryParams = [req.params.comment_id];
    db.query(queryString, queryParams)
      .then((data) => {
        const comments = data.rows;
        res.json({ comments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
