# Write your MySQL query statement below
WITH M AS (
    SELECT managerId, COUNT(*) AS nReports
    FROM Employee
    GROUP BY managerId
)

SELECT e.name
FROM Employee e
LEFT JOIN M ON e.id = M.managerId
WHERE M.nReports >= 5