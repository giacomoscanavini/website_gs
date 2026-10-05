# Write your MySQL query statement below
WITH 
    Ranked AS (
        SELECT 
            salary, 
            ROW_NUMBER() OVER (PARTITION BY salary) AS ranks
        FROM Employee
    ),
    UniqueRanks AS (
        SELECT salary
        FROM Ranked 
        WHERE ranks = 1
    ),
    Numbered AS (
        SELECT 
            salary,
            ROW_NUMBER() OVER (ORDER BY salary DESC) AS numb
        FROM UniqueRanks
    )

SELECT (
    SELECT salary 
    FROM Numbered
    WHERE numb = 2
) AS SecondHighestSalary