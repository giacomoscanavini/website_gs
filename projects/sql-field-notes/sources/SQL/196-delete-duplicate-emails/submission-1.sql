# Write your MySQL query statement below
WITH Ranked AS (
    SELECT 
        id, 
        email, 
        ROW_NUMBER() OVER (
            PARTITION BY email ORDER BY id
        ) AS ranked
    FROM Person
)

DELETE FROM Person
WHERE id IN (
    SELECT id
    FROM Ranked 
    WHERE ranked > 1
)