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

  router.get("/:id", (req, res) => {
    let userData = {};
    let queryString = `
    SELECT users.*,  COUNT(points.*) AS number_points, COUNT(maps.*) AS number_maps
    FROM users
    LEFT OUTER JOIN maps ON users.id = maps.user_id
    LEFT OUTER JOIN points ON maps.id = points.map_id
  WHERE users.id = $1 AND maps.is_active = TRUE
  GROUP by users.id;
  `;
    const queryParams = [req.params.id];
    return (
      db
        .query(queryString, queryParams)
        // need a catch here to end req and return empty obj when user does not have any maps that are active.
        .then((user) => {
          userData.userInfo = user.rows[0];
          return db.query(`SELECT map_id FROM
        favourites WHERE user_id = ${user.rows[0].id}`);
        })
        .then((favourites) => {
          userData.favourites = favourites.rows;
          return db.query(`SELECT points.id as point_id, points.title, maps.name, maps.id AS map_id
        FROM points
        JOIN maps ON points.map_id = maps.id
        WHERE maps.user_id = ${userData.userInfo.id}
        ORDER BY maps.name;`);
        })
        .then((points) => {
          userData.points = points.rows;
          res.json({ userData });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        })
    );
  });

  return router;
};
