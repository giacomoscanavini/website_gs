# Write your MySQL query statement below
WITH Reports AS (
    SELECT 
        reports_to AS manager_id,
        COUNT(age) AS reports_count,
        ROUND(AVG(age)) AS average_age
    FROM Employees
    GROUP BY reports_to
    HAVING reports_to IS NOT NULL
)

SELECT 
    r.manager_id AS employee_id,
    e.name, 
    r.reports_count,
    r.average_age
FROM Reports r
LEFT JOIN Employees e ON r.manager_id = e.employee_id
ORDER BY r.manager_id