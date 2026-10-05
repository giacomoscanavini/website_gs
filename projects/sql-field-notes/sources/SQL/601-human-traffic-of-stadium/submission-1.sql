# Write your MySQL query statement below
WITH 
    CrowdedDays AS (
        SELECT  
            id, visit_date, people,
            id - ROW_NUMBER() OVER (ORDER BY id) AS group_num
        FROM Stadium 
        WHERE people >= 100
    ),
    ValidGroups AS (
        SELECT group_num
        FROM CrowdedDays
        GROUP BY group_num
        HAVING COUNT(*) >= 3
    )

SELECT 
    c.id, c.visit_date, c.people
FROM CrowdedDays c
JOIN ValidGroups v ON c.group_num = v.group_num
ORDER BY c.visit_date ASC

