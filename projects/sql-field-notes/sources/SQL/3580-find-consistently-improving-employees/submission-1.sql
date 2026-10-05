# Write your MySQL query statement below
WITH 
    ValidReviews AS (
        SELECT 
            review_id, employee_id, rating, 
            ROW_NUMBER() OVER (
                PARTITION BY employee_id 
                ORDER BY review_id DESC
            ) AS ranked
        FROM Performance_reviews
        WHERE employee_id IN (
            SELECT employee_id
            FROM Performance_reviews
            GROUP BY employee_id
            HAVING COUNT(*) >= 3
        )
    ),
    LatestReviews AS (
        SELECT ranked, employee_id, rating
        FROM ValidReviews
        WHERE ranked IN (1, 2, 3)
    ),
    OrderedReviews AS (
        SELECT DISTINCT
            l1.employee_id,  
            l1.ranked AS ranked1, 
            l2.ranked AS ranked2,
            l3.ranked AS ranked3,
            l1.rating AS rating1, 
            l2.rating AS rating2,
            l3.rating AS rating3
        FROM LatestReviews l1
        LEFT JOIN LatestReviews l2 ON l1.ranked = l2.ranked - 1 
                                    AND l1.employee_id = l2.employee_id
                                    AND l1.ranked = 1
        LEFT JOIN LatestReviews l3 ON l2.ranked = l3.ranked - 1 
                                    AND l1.employee_id = l3.employee_id
                                    AND l1.ranked = 1
        WHERE l1.ranked = 1
    )

SELECT 
    o.employee_id, 
    e.name, 
    (o.rating1 - o.rating3) AS improvement_score
FROM OrderedReviews o 
LEFT JOIN Employees e ON o.employee_id = e.employee_id
WHERE o.rating1 > o.rating2 AND o.rating2 > o.rating3
ORDER BY o.rating1 - o.rating3 DESC, e.name ASC