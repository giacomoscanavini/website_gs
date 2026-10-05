# Write your MySQL query statement below
WITH Orders AS (
    SELECT 
        customer_id,
        CASE
            WHEN order_date = customer_pref_delivery_date THEN 1
            ELSE 0
        END AS immediate,
        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY order_date ASC
        ) AS number
    FROM Delivery
)

SELECT ROUND(100 * SUM(immediate) / COUNT(immediate), 2) AS immediate_percentage
FROM Orders
WHERE number = 1
