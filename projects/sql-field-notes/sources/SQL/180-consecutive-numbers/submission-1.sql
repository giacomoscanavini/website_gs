# Write your MySQL query statement below
WITH Nums AS (
    SELECT 
        num, 
        LEAD(num, 1) OVER () AS next_num,
        LEAD(num, 2) OVER () AS next_next_num
    FROM Logs
)

SELECT DISTINCT num AS ConsecutiveNums
FROM Nums
WHERE num = next_num AND next_num = next_next_num