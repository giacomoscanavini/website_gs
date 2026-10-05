/* LEVEL 03: https://datalemur.com/sql-game/level3.html

    Analyze the average completion times for each shape in the honeycomb game during the hottest and coldest months, 
    using data from the past 20 years only. Order the results by average completion time.
*/
/* 
    SCHEMA for `monthly_temperatures`:
    month	avg_temperature
    1	    -2.50
    2	    0.00
    3	    5.50
    4	    12.00
    5	    17.50
    6	    22.00
    7	    25.50
    8	    26.00
    9	    21.00
    10	    14.50
    11	    7.50
    12	    0.50

    SCHEMA for `honeycomb_game`:
    id	shape	    average_completion_time	    date
    1	triangle	6.45	                    Sat Mar 15 2025 08:00:00 GMT+0800 (Hong Kong Standard Time)
    2	circle	    6.75	                    Sat Mar 15 2025 08:00:00 GMT+0800 (Hong Kong Standard Time)
    3	star	    7.30	                    Sat Mar 15 2025 08:00:00 GMT+0800 (Hong Kong Standard Time)
*/

WITH 
    Extrama_month AS (
        SELECT *
        FROM (
            SELECT * 
            FROM monthly_temperatures
            ORDER BY avg_temperature ASC
            LIMIT 1
        ) as Cold

        UNION

        SELECT *
        FROM (
            SELECT * 
            FROM monthly_temperatures
            ORDER BY avg_temperature DESC
            LIMIT 1
        ) as Hot
    ),

    Honeycomb_game_extended AS (
        SELECT 
            shape, 
            average_completion_time,
            EXTRACT(MONTH FROM date) AS month_num,
            EXTRACT(YEAR FROM date) AS year_num
        FROM honeycomb_game
    )

SELECT 
    h.shape, 
    h.month_num,
    AVG(h.average_completion_time) AS avg_temp
FROM Honeycomb_game_extended h 
INNER JOIN Extrama_month e
    ON e.month = h.month_num
WHERE h.year_num >= 2006
GROUP BY h.shape, h.month_num
ORDER BY avg_temp ASC