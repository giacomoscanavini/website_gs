# Write your MySQL query statement below
SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING (SELECT COUNT(product_key) FROM Product) = COUNT(DISTINCT product_key) 