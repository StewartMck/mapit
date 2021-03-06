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
    const userID = req.params.id;
    const queryParams = [userID];
    return db
      .query(queryString, queryParams)
      .then((user) => {
        userData.userInfo = user.rows[0];
        return db.query(`SELECT favourites.map_id AS id, maps.name, maps.user_id
          FROM favourites
          JOIN maps ON favourites.map_id = maps.id
          WHERE favourites.user_id = ${userID} AND maps.is_active = TRUE
          ;
          `);
      })
      .then((favourites) => {
        userData.favourites = favourites.rows;
        return db.query(`SELECT maps.id, maps.name, maps.user_id
          FROM maps
          JOIN points ON points.map_id = maps.id
          WHERE points.user_id = ${userID} AND maps.is_active =TRUE
          GROUP BY maps.id, points.user_id;
          `);
      })
      .then((points) => {
        userData.points = points.rows;
        res.json({ userData });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message, userData });
      });
  });

  return router;
};
