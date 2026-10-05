# Write your MySQL query statement below
WITH ManagersLeftID AS (
    SELECT manager_id
    FROM Employees
    WHERE manager_id NOT IN (SELECT employee_id FROM Employees)
)

SELECT employee_id
FROM Employees
WHERE manager_id IN (SELECT manager_id FROM ManagersLeftID) AND salary < 30000
ORDER BY employee_id ASC