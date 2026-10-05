# Write your MySQL query statement below
WITH Operations AS (
    SELECT 
        stock_name,  
        CASE 
            WHEN operation = 'Buy' THEN -1 * price
            ELSE price
        END AS capital_gain_loss
    FROM Stocks
)

SELECT stock_name, SUM(capital_gain_loss) AS capital_gain_loss
FROM Operations
GROUP BY stock_name