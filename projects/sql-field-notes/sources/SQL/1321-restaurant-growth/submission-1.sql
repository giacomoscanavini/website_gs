# Write your MySQL query statement below
WITH Rolling AS (
    SELECT 
        DISTINCT visited_on, 
        SUM(amount) OVER (
            ORDER BY visited_on RANGE BETWEEN INTERVAL 6 DAY PRECEDING AND CURRENT ROW
        ) AS rolling_amount,
        MIN(visited_on) OVER () AS first_date
    FROM Customer
)

SELECT
    visited_on, 
    rolling_amount AS amount,
    ROUND(rolling_amount / 7, 2) AS average_amount
FROM Rolling
WHERE visited_on >= first_date + 6