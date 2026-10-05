# Write your MySQL query statement below
WITH T AS (
    SELECT 
        DATE_FORMAT(trans_date, '%Y-%m') AS month,
        country, 
        amount,
        CASE 
            WHEN state = 'approved' THEN 1
            ELSE 0
        END AS approved
    FROM Transactions
)

SELECT 
    month, 
    country, 
    COUNT(approved) AS trans_count,
    SUM(approved) AS approved_count, 
    SUM(amount) AS trans_total_amount,
    SUM(amount * approved) AS approved_total_amount
FROM T
GROUP BY month, country