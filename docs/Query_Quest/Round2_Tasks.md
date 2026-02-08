Query Quest — Round 2: Execution Tasks
======================================

Instructions: 45 minutes. Use the provided dataset (or your own SQL environment). Write SQL queries and show results. Provide query and brief explanation.

Task 1 — Movie Streaming Platform Analytics (based on sample schema in dataset.sql)
- Q1: Identify the movies that have been watched more times than the average number of views per movie.
  Solution (example):
  ```sql
  SELECT m.movie_id, m.movie_title, COUNT(*) AS views
  FROM watch_history w
  JOIN movies m ON w.movie_id = m.movie_id
  GROUP BY m.movie_id, m.movie_title
  HAVING COUNT(*) > (
    SELECT AVG(cnt) FROM (
      SELECT COUNT(*) AS cnt FROM watch_history GROUP BY movie_id
    ) t
  );
  ```

- Q2: Find the most-watched genre based on total watch time.
  Solution:
  ```sql
  SELECT m.genre, SUM(w.watch_time_minutes) AS total_minutes
  FROM watch_history w
  JOIN movies m ON w.movie_id = m.movie_id
  GROUP BY m.genre
  ORDER BY total_minutes DESC
  LIMIT 1;
  ```

Task 2 — User Engagement
- Q: List users who have watched movies from at least 3 different genres.
  Solution:
  ```sql
  SELECT u.user_id, u.user_name, COUNT(DISTINCT m.genre) AS genres_watched
  FROM watch_history w
  JOIN users u ON w.user_id = u.user_id
  JOIN movies m ON w.movie_id = m.movie_id
  GROUP BY u.user_id, u.user_name
  HAVING COUNT(DISTINCT m.genre) >= 3;
  ```

Task 3 — Retention Insight
- Q: For each subscription type, find average watch time per user.
  Solution:
  ```sql
  SELECT u.subscription_type, AVG(user_total) AS avg_watch_per_user
  FROM (
    SELECT u.user_id, u.subscription_type, SUM(w.watch_time_minutes) AS user_total
    FROM users u
    LEFT JOIN watch_history w ON u.user_id = w.user_id
    GROUP BY u.user_id, u.subscription_type
  ) AS per_user
  GROUP BY subscription_type;
  ```

Task 4 — Advanced (tie-breaker / challenge)
- Q: Find movies where the average watch time per view is less than 50% of the movie's runtime (assume runtime column exists). Explain possible reasons.
  Solution (if runtime present):
  ```sql
  SELECT m.movie_id, m.movie_title, AVG(w.watch_time_minutes) AS avg_watch, m.runtime
  FROM movies m
  JOIN watch_history w ON m.movie_id = w.movie_id
  GROUP BY m.movie_id, m.movie_title, m.runtime
  HAVING AVG(w.watch_time_minutes) < 0.5 * m.runtime;
  ```

Grading: correctness of SQL, efficiency (reasonable use of joins/aggregation), explanation of results.
