SELECT users.email, comments.comment
FROM users
LEFT OUTER JOIN comments ON users.id = comments.user_id
ORDER BY users.email;
