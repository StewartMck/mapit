SELECT points.title, comments.comment
FROM points
LEFT OUTER JOIN comments ON points.id = comments.point_id
ORDER BY points.title;
