# Write your MySQL query statement below
WITH 
    ValidTrips AS (
        SELECT 
            t.client_id, t.driver_id, t.status, t.request_at,
            u1.banned AS client_banned, u2.banned AS driver_banned
        FROM Trips t
        LEFT JOIN Users u1 ON t.client_id = u1.users_id
        LEFT JOIN Users u2 ON t.driver_id = u2.users_id
        WHERE 
            (u1.banned = 'No' AND u2.banned = 'No')
            AND (t.request_at >= '2013-10-01' AND t.request_at <= '2013-10-03')
    ),
    ValidCancelled AS (
        SELECT
            request_at AS Day,
            COUNT(*) AS valid_cancel
        FROM ValidTrips
        WHERE status LIKE 'cancelled%'
        GROUP BY request_at
    ),
    ValidTotal AS (
        SELECT
            request_at AS Day,
            COUNT(*) AS valid
        FROM ValidTrips
        GROUP BY request_at
    )

SELECT 
    t.Day,
    COALESCE(ROUND(c.valid_cancel / t.valid , 2), 0) AS 'Cancellation Rate'
FROM ValidTotal t
LEFT JOIN ValidCancelled c ON t.Day = c.Day
GROUP BY t.Day