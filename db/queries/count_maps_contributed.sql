-- Maps Contributed = Points Made
SELECT users.id, users.email,  COUNT(points.*)
FROM users
RIGHT OUTER JOIN maps ON maps.user_id = users.id
RIGHT OUTER JOIN points ON maps.id = points.map_id
GROUP BY users.id;
