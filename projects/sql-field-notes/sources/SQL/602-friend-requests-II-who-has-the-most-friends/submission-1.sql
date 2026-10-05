# Write your MySQL query statement below
WITH 
    TableRequest AS (
        SELECT 
            requester_id AS id, 
            COUNT(*) AS askedApproved
        FROM RequestAccepted
        GROUP BY requester_id
    ),
    TableAccepted AS (
        SELECT 
            accepter_id AS id, 
            COUNT(*) AS receivedApproved
        FROM RequestAccepted
        GROUP BY accepter_id
    ),
    PooledUsers AS (
        SELECT DISTINCT requester_id AS id FROM RequestAccepted
        UNION 
        SELECT DISTINCT accepter_id AS id FROM RequestAccepted
    ),
    Users AS (
        SELECT DISTINCT id
        FROM PooledUsers
    ),
    Numbers AS (
        SELECT 
            u.id, 
            COALESCE(ta.receivedApproved, 0) + COALESCE(tr.askedApproved, 0) AS num
        FROM Users u
        LEFT JOIN TableAccepted ta ON u.id = ta.id
        LEFT JOIN TableRequest tr ON u.id = tr.id
    )

SELECT id, num
FROM Numbers
ORDER BY num DESC
LIMIT 1