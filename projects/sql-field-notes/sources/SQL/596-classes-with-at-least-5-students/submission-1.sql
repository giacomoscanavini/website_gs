# Write your MySQL query statement below
WITH Classes AS (
    SELECT 
        COUNT(DISTINCT student) AS nStudents, 
        class
    FROM Courses
    GROUP BY class
)

SELECT class
FROM Classes
WHERE nStudents >= 5