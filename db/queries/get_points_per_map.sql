SELECT points.id, points.title, maps.name
FROM points
JOIN maps ON points.map_id = maps.id
ORDER BY maps.name;
