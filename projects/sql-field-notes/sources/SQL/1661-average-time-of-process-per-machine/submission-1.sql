# Write your MySQL query statement below
WITH 
    s AS (
        SELECT machine_id, process_id, timestamp
        FROM Activity
        WHERE activity_type = 'start'
    ),

    e AS (
        SELECT machine_id, process_id, timestamp
        FROM Activity
        WHERE activity_type = 'end'
    ),

    m AS (
        SELECT s.machine_id, s.process_id, e.timestamp - s.timestamp AS processing_time
        FROM s
        JOIN e ON s.machine_id = e.machine_id AND s.process_id = e.process_id
    )

SELECT machine_id, ROUND(SUM(processing_time)/COUNT(*), 3) AS processing_time
FROM m
GROUP BY machine_id
