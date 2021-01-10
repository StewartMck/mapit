SELECT users.*, maps.id, favourites.map_id, COUNT(points.*) AS number_points, COUNT(maps.*) AS number_maps
FROM users
JOIN favourites ON favourites.user_id = users.id
JOIN maps ON favourites.map_id = maps.id
JOIN points ON maps.id = points.map_id
WHERE users.id = 1 AND maps.is_active = TRUE
GROUP BY users.id, maps.id, favourites.map_id;
