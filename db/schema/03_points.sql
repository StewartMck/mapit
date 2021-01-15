DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
id SERIAL PRIMARY KEY NOT NULL,
title VARCHAR(255) NOT NULL,
description TEXT,
longitude FLOAT(6) NOT NULL,
latitude FLOAT(6) NOT NULL,
type VARCHAR(30),
rating SMALLINT NOT NULL DEFAULT 0,
is_active BOOLEAN NOT NULL DEFAULT TRUE,
map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
