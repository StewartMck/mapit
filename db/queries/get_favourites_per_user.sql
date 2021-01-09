SELECT users.email, favourites.map_id
FROM users
JOIN favourites ON favourites.user_id = users.id
ORDER BY users.email;
