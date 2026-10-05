# Write your MySQL query statement below
WITH 
    BoughtPairs AS (
        SELECT 
            p1.user_id, 
            p1.product_id AS product1_id, 
            p2.product_id AS product2_id
        FROM ProductPurchases p1
        CROSS JOIN ProductPurchases p2
        WHERE p1.user_id = p2.user_id AND p1.product_id < p2.product_id
    ), 
    ValidPairs AS (
        SELECT product1_id, product2_id, COUNT(*) AS customer_count
        FROM BoughtPairs
        GROUP BY product1_id, product2_id
        HAVING COUNT(*) >= 3
    )

SELECT 
    v.product1_id, v.product2_id, 
    p1.category AS product1_category,
    p2.category AS product2_category,
    v.customer_count 
FROM ValidPairs v
LEFT JOIN ProductInfo p1 ON v.product1_id = p1.product_id
LEFT JOIN ProductInfo p2 ON v.product2_id = p2.product_id
ORDER BY customer_count DESC, v.product1_id ASC, v.product2_id ASC