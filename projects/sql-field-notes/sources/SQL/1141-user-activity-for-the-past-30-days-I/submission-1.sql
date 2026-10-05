# Write your MySQL query statement below
SELECT
    activity_date AS day, 
    COUNT(DISTINCT user_id) AS active_users
FROM Activity 
WHERE 
    DATEDIFF('2019-07-27', activity_date) < 30 AND
    activity_date <= '2019-07-27' AND
    activity_type IN ('open_session', 'end_session', 'scroll_down', 'send_message')
GROUP BY activity_date 