# Write your MySQL query statement below
WITH Quantities AS (
    SELECT 
        product_id, 
        SUM(unit) AS unit
    FROM Orders
    WHERE order_date > '2020-01-31' AND order_date < '2020-03-01'
    GROUP BY product_id
)

SELECT 
    p.product_name,
    q.unit
FROM Quantities q 
LEFT JOIN Products p ON q.product_id = p.product_id
WHERE q.unit >= 100