# Write your MySQL query statement below
WITH Cumulative AS (
    SELECT 
        person_name, 
        turn,
        SUM(weight) OVER (ORDER BY turn ASC) AS cumsum_weight
    FROM Queue
)

SELECT person_name
FROM Cumulative
WHERE cumsum_weight <= 1000
ORDER BY turn DESC
LIMIT 1