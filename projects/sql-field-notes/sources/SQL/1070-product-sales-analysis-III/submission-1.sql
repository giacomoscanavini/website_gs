# Write your MySQL query statement below
WITH SalesII AS (
    SELECT 
        product_id, 
        year,
        RANK() OVER (
            PARTITION BY product_id
            ORDER BY year ASC
        ) AS year_order, 
        quantity,
        price
    FROM Sales
)

SELECT product_id, year AS first_year, quantity, price
FROM SalesII
WHERE year_order = 1