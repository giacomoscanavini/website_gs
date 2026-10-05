# Write your MySQL query statement below
WITH 
    NonUniqueTIV AS (
        SELECT tiv_2015
        FROM Insurance
        GROUP BY tiv_2015
        HAVING COUNT(*) > 1
    ),
    UniqueCity AS (
        SELECT pid
        FROM Insurance
        GROUP BY lat, lon
        HAVING COUNT(*) = 1
    )
    
SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE pid IN (SELECT pid FROM UniqueCity) AND tiv_2015 IN (SELECT tiv_2015 FROM NonUniqueTIV)