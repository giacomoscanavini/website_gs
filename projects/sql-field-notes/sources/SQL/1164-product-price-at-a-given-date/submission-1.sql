# Write your MySQL query statement below
WITH 
    Latest AS (
        SELECT 
            *,
            ROW_NUMBER() OVER (
                PARTITION BY product_id ORDER BY change_date DESC
            ) AS latest
        FROM Products 
        WHERE change_date <= '2019-08-16'
    ),
    Valid AS (
        SELECT product_id, new_price AS price
        FROM Latest
        WHERE latest = 1
    )

SELECT *
FROM Valid

UNION 

SELECT DISTINCT product_id, 10 AS price
FROM Products
WHERE product_id NOT IN (SELECT product_id FROM Valid)