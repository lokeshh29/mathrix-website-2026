-- Sample dataset for Query Quest — Movie Streaming
-- Works on SQLite/MySQL/Postgres with minor adjustments

DROP TABLE IF EXISTS watch_history;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id INTEGER PRIMARY KEY,
  user_name TEXT NOT NULL,
  subscription_type TEXT NOT NULL
);

CREATE TABLE movies (
  movie_id INTEGER PRIMARY KEY,
  movie_title TEXT NOT NULL,
  genre TEXT NOT NULL,
  runtime INTEGER
);

CREATE TABLE watch_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  movie_id INTEGER NOT NULL,
  watch_time_minutes INTEGER NOT NULL,
  watch_date DATE,
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(movie_id) REFERENCES movies(movie_id)
);

-- Sample users
INSERT INTO users(user_id, user_name, subscription_type) VALUES
(1, 'Alice', 'Premium'),
(2, 'Bob', 'Free'),
(3, 'Carlos', 'Premium'),
(4, 'Diana', 'Basic'),
(5, 'Esha', 'Premium');

-- Sample movies
INSERT INTO movies(movie_id, movie_title, genre, runtime) VALUES
(1, 'Space Odyssey', 'Sci-Fi', 140),
(2, 'Laugh Out Loud', 'Comedy', 95),
(3, 'Deep Blue', 'Documentary', 60),
(4, 'Heist Night', 'Thriller', 110),
(5, 'Romantic Sunset', 'Romance', 105);

-- Sample watch history (multiple rows to simulate views)
INSERT INTO watch_history(user_id, movie_id, watch_time_minutes, watch_date) VALUES
(1,1,120,'2026-01-10'),
(2,1,30,'2026-01-11'),
(3,1,140,'2026-01-12'),
(1,2,90,'2026-01-12'),
(2,2,85,'2026-01-13'),
(4,3,60,'2026-01-14'),
(5,1,100,'2026-01-15'),
(3,4,50,'2026-01-16'),
(1,4,110,'2026-01-17'),
(2,4,20,'2026-01-18'),
(5,5,105,'2026-01-19'),
(1,3,30,'2026-01-20'),
(3,2,45,'2026-01-21'),
(4,2,95,'2026-01-22');

-- End of dataset
