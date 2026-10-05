/* LEVEL 02: https://datalemur.com/sql-game/level2.html

    The organizers need to calculate how many food portions to withhold to create the right amount of tension. 
    In a table, calculate how many rations would feed 90% of the remaining(alive) non-insider players (rounded down), 
    and in another column, indicate if the current rations supply is sufficient. (True or False)
*/
/*
    SCHEMA for `player`:
    id	first_name	last_name	age	status	debt	    isinsider
    1	Luigi	    Mangione	27	alive	3930975804	false
    2	Seokjin	    Nam	        68	alive	684587725	false
    3	Chiho	    Dae	        54	alive	983907316	false

    SCHEMA for `rations`:
    amount
    399
*/

WITH
    table_prop AS (
        SELECT FLOOR( COUNT(*) * 0.9 ) AS portions
        FROM player
        WHERE status = 'alive' AND isinsider = false
    )

SELECT 
    table_prop.portions AS portions,
    CASE 
        WHEN table_prop.portions > rations.amount THEN 'False'
        ELSE 'True'
    END AS amount
FROM table_prop, rations