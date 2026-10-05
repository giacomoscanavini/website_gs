# Write your MySQL query statement below
WITH Orders2019 AS (
    SELECT buyer_id, COUNT(*) AS orders_in_2019
    FROM Orders 
    WHERE order_date >= '2019-01-01' AND order_date <= '2019-12-31'
    GROUP BY buyer_id
)

SELECT 
    u.user_id AS buyer_id, 
    u.join_date, 
    COALESCE(o.orders_in_2019, 0) AS orders_in_2019
FROM Users u
LEFT JOIN Orders2019 o ON u.user_id = o.buyer_id
