# Write your MySQL query statement below
WITH Frequency AS (
    SELECT
        num, 
        COUNT(*) AS frequency
    FROM MyNumbers
    GROUP BY num
)

SELECT MAX(num) AS num
FROM Frequency
WHERE frequency = 1