# Write your MySQL query statement below
WITH Rate AS (
    SELECT 
        s.user_id, 
        CASE
            WHEN c.action = 'confirmed' THEN 1
            ELSE 0
        END AS boolean
    FROM Signups s
    LEFT JOIN Confirmations c ON s.user_id = c.user_id
)

SELECT user_id, ROUND(SUM(boolean)/COUNT(boolean), 2) AS confirmation_rate
FROM Rate
GROUP BY user_id