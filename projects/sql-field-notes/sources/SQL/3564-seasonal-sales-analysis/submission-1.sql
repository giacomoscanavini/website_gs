# Write your MySQL query statement below
WITH 
    SeasonSales AS (
        SELECT 
            s.product_id, 
            CASE 
                WHEN MONTH(s.sale_date) IN (12, 1, 2) THEN 'Winter'
                WHEN MONTH(s.sale_date) IN (3, 4, 5) THEN 'Spring'
                WHEN MONTH(s.sale_date) IN (6, 7, 8) THEN 'Summer'
                ELSE 'Fall'
            END AS season,
            s.quantity, 
            s.quantity * s.price AS revenue,
            p.category
        FROM Sales s
        LEFT JOIN Products p ON s.product_id = p.product_id
    ),
    GroupSales AS (
        SELECT 
            season, category, 
            SUM(quantity) AS total_quantity, 
            ROUND(SUM(revenue), 2) AS total_revenue
        FROM SeasonSales
        GROUP BY season, category
        ORDER BY total_quantity DESC, total_revenue DESC
    ),
    OrderedSales AS (
        SELECT 
            season, category, total_quantity, total_revenue,
            ROW_NUMBER() OVER (
                PARTITION BY season 
                ORDER BY total_quantity DESC, total_revenue DESC
            ) AS ranked
        FROM GroupSales
    )

SELECT season, category, total_quantity, total_revenue
FROM OrderedSales
WHERE ranked = 1

