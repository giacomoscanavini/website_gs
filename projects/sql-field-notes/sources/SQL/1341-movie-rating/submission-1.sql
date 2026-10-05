# Write your MySQL query statement below
WITH 
    ReviewPerUserID AS (
        SELECT user_id, COUNT(*) AS nReviews
        FROM MovieRating
        GROUP BY user_id
    ),
    ReviewPerUserName AS (
        SELECT a.user_id, a.nReviews, b.name
        FROM ReviewPerUserID a
        LEFT JOIN Users b ON a.user_id = b.user_id
    ),
    FirstUserName AS (
        SELECT name AS results
        FROM ReviewPerUserName
        ORDER BY nReviews DESC, name ASC
        LIMIT 1
    ),
    MovieAvgRatingFeb AS (
        SELECT movie_id, AVG(rating) AS avgRating
        FROM MovieRating
        WHERE created_at >= '2020-02-01' AND created_at < '2020-03-01'
        GROUP BY movie_id
    ),
    MovieAvgRatingFebName AS (
        SELECT a.movie_id, a.avgRating, b.title
        FROM MovieAvgRatingFeb a
        LEFT JOIN Movies b ON a.movie_id = b.movie_id
    ), 
    FirstMovieName AS (
        SELECT title AS results
        FROM MovieAvgRatingFebName
        ORDER BY avgRating DESC, title ASC
        LIMIT 1
    )

SELECT results
FROM FirstUserName

UNION ALL

SELECT results
FROM FirstMovieName