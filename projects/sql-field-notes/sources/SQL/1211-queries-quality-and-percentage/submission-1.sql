# Write your MySQL query statement below
WITH Quality AS (
    SELECT 
        *,
        (rating / position) AS quality,
        CASE
            WHEN rating < 3 THEN 1
            ELSE 0
        END AS poor_quality
    FROM Queries
)

SELECT 
    query_name, 
    ROUND(AVG(quality), 2) AS quality, 
    ROUND(100 * SUM(poor_quality)/COUNT(poor_quality), 2) AS poor_query_percentage
FROM Quality
GROUP BY query_name