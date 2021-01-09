SELECT points.title, ROUND(AVG(points.rating), 2) AS avg_rating
FROM points
GROUP BY points.title
ORDER BY avg_rating;
