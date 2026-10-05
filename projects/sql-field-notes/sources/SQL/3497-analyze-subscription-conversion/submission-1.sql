# Write your MySQL query statement below
WITH Payments AS (
    SELECT 
        user_id, 
        ROUND(AVG(IF(activity_type='free_trial', activity_duration, NULL)), 2) AS trial_avg_duration,
        ROUND(AVG(IF(activity_type='paid', activity_duration, NULL)), 2) AS paid_avg_duration
    FROM UserActivity
    WHERE activity_type <> 'cancelled'
    GROUP BY user_id
    ORDER BY user_id ASC
) 

SELECT * 
FROM Payments
WHERE 
    paid_avg_duration IS NOT NULL
    AND trial_avg_duration IS NOT NULL