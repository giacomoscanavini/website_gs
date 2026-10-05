# Write your MySQL query statement below
WITH IdToExclude AS (
    SELECT DISTINCT o.sales_id
    FROM Orders o
    LEFT JOIN Company c ON o.com_id = c.com_id
    WHERE c.name = 'RED'
)

SELECT name
FROM SalesPerson
WHERE sales_id NOT IN (
    SELECT sales_id
    FROM IdToExclude
)