# Write your MySQL query statement below
WITH First_login AS (
    SELECT 
        DISTINCT player_id,
        MIN(event_date) OVER (PARTITION BY player_id) AS first_day
    FROM Activity
)

SELECT ROUND(COUNT(*) / (SELECT COUNT(DISTINCT player_id) FROM Activity), 2) AS fraction
FROM Activity a
INNER JOIN First_login f ON 
    DATEDIFF(a.event_date, f.first_day) = 1 AND
    a.player_id = f.player_id