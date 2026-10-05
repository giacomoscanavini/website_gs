# Write your MySQL query statement below
WITH NStudents AS (
    SELECT COUNT(id) AS length
    FROM Seat
)

SELECT
    CASE 
        WHEN id % 2 = 0 THEN id-1
        WHEN id <> (SELECT length FROM NStudents) AND id % 2 = 1 THEN id+1
        ELSE id
    END AS id, 
    student
FROM Seat
ORDER BY id ASC