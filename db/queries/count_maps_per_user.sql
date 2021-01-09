SELECT users.first_name, users.last_name,  COUNT(maps.*)
FROM maps
RIGHT OUTER JOIN users ON maps.user_id = users.id
GROUP BY users.id;
