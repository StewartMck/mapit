-- Sample Seed Data
INSERT INTO maps (user_id, name, center_lat, center_long, zoom, type)
VALUES (1, 'Montreal', 45.504186, -73.589343, 12, 'roadmap'),
(1, 'Ottawa', 45.421144, -75.694403, 18, 'roadmap'),
(2, 'Toronto', 43.655583, -79.405398, 11, 'satellite'),
(3, 'London', 42.986255, -81.250256, 13, 'terrain'),
(4, 'Winnipeg', 49.890502, -97.142416, 16, 'roadmap'),
(1, 'Regina', 50.475199, -104.615336, 18, 'roadmap'),
(2, 'Calgary', 51.063143, -114.104826, 17, 'roadmap'),
(3, 'Edmonton', 53.517617, -113.495989, 17, 'roadmap'),
(3, 'Vancouver', 49.291815, -123.143430, 17, 'roadmap'),
(4, 'Victoria', 48.426918, -123.367227, 18, 'roadmap');
