# Write your MySQL query statement below
WITH 
    Labels AS (
        SELECT 
            CASE
                WHEN income < 20000 THEN 'Low Salary'
                WHEN income >= 20000 AND income <= 50000 THEN 'Average Salary'
                ELSE 'High Salary'
            END AS category
        FROM Accounts
    ),
    Valid AS (
        SELECT category, COUNT(category) AS accounts_count
        FROM Labels
        GROUP BY category
    ),
    Categories AS (
        SELECT 'Low Salary' AS category
        UNION SELECT 'Average Salary'
        UNION SELECT 'High Salary'
    )

SELECT *
FROM Valid

UNION 

SELECT category, 0 AS accounts_count
FROM Categories
WHERE category NOT IN (SELECT category FROM Valid)