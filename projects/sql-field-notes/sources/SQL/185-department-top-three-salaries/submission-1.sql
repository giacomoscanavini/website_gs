# Write your MySQL query statement below
WITH Ranked AS (
    SELECT 
        id, name, salary, departmentId,
        DENSE_RANK() OVER (
            PARTITION BY departmentId ORDER BY salary DESC
        ) AS ranked
    FROM Employee
    ORDER BY departmentId ASC, salary DESC
)

SELECT 
    d.name AS Department,
    r.name AS Employee, 
    r.salary AS Salary
FROM Ranked r
LEFT JOIN Department d ON r.departmentId = d.id 
WHERE r.ranked <= 3