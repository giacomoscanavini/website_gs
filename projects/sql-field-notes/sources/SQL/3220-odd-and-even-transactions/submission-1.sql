# Write your MySQL query statement below
WITH 
    Days AS (
        SELECT DISTINCT transaction_date
        FROM Transactions
    ),
    Evens AS (
        SELECT 
            transaction_date, 
            SUM(amount) AS even_sum
        FROM Transactions
        WHERE amount % 2 = 0
        GROUP BY transaction_date
    ),
    Odds AS ( 
        SELECT 
            transaction_date, 
            SUM(amount) AS odd_sum
        FROM Transactions
        WHERE amount % 2 = 1
        GROUP BY transaction_date
    )

SELECT 
    d.transaction_date, 
    COALESCE(o.odd_sum, 0) AS odd_sum, 
    COALESCE(e.even_sum, 0) AS even_sum
FROM Days d
LEFT JOIN Odds o ON d.transaction_date = o.transaction_date
LEFT JOIN Evens e ON d.transaction_date = e.transaction_date
ORDER BY d.transaction_date


/*
SELECT 
    transaction_date,
    SUM(CASE 
            WHEN amount % 2 = 1 THEN amount 
            ELSE 0
        END) AS odd_sum,
    SUM(CASE 
            WHEN amount % 2 = 0 THEN amount 
            ELSE 0 
        END) AS even_sum
FROM Transactions 
GROUP BY transaction_date
ORDER BY transaction_date ASC
*/