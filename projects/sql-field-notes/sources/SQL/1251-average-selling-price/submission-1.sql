# Write your MySQL query statement below
WITH Sold AS (
    SELECT p.product_id, u.units, p.price * u.units AS paid
    FROM Prices p
    LEFT JOIN UnitsSold u ON (p.product_id = u.product_id) AND (u.purchase_date BETWEEN p.start_date AND p.end_date)
)

SELECT product_id, COALESCE(ROUND(SUM(paid) / SUM(units), 2), 0) AS average_price
FROM Sold
GROUP BY product_id