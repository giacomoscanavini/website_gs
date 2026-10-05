# Write your MySQL query statement below
WITH Comparison AS (
    SELECT 
        student_id,
        subject,
        NTH_VALUE(score, 1) OVER (
            PARTITION BY student_id, subject
            ORDER BY exam_date ASC
        ) AS first_score,
        NTH_VALUE(score, 1) OVER (
            PARTITION BY student_id, subject
            ORDER BY exam_date DESC
        ) AS latest_score
    FROM Scores
)

SELECT DISTINCT student_id, subject, first_score, latest_score
FROM Comparison
WHERE first_score < latest_score