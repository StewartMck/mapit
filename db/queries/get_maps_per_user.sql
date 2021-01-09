SELECT users.first_name, users.last_name, maps.*
FROM maps
JOIN users ON maps.user_id = users.id;
