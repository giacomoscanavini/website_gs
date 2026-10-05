/* LEVEL 06: https://datalemur.com/sql-game/level6.html

    The guards are investigating equipment durability across different game types, 
    as some equipment has been breaking prematurely. Determine the game type with the 
    highest number of equipment failures and identify the supplier responsible for 
    the most failures within that game type. Finally, calculate the average lifespan 
    until first failure, in whole years (using 365.2425 days per year), of all failed 
    equipment supplied by this supplier for the most faulty game type.
*/
/* 
    SCHEMA for `suppliers`:
    id	name	            country
    1	Dewey Mulholland	China
    2	Stacey Shutt	    Indonesia
    3	Alexandre Sebert    Philippines

    SCHEMA for `equipment`:
    id	supplier_id	game_type	            installation_date
    1	40	        honeycomb	            Tue Sep 07 2010 08:00:00 GMT+0800 (China Standard Time)
    2	13	        glass bridge	        Mon Mar 17 2008 08:00:00 GMT+0800 (China Standard Time)
    3	3	        red light green light   Sat Oct 28 2000 08:00:00 GMT+0800 (China Standard Time)

    SCHEMA for `failure_incidents`:
    id	failed_equipment_id	    failure_type	    failure_date
    1	130	                    parts missing	    Fri Aug 02 2019 08:00:00 GMT+0800 (China Standard Time)
    2	19	                    broken	            Tue Sep 11 2012 08:00:00 GMT+0800 (China Standard Time)
    3	98	                    broken	            Wed Mar 09 2011 08:00:00 GMT+0800 (China Standard Time)
*/

WITH	
	Game_with_highest_failures AS (
	  	SELECT e.game_type
		FROM Equipment e
		INNER JOIN Failure_incidents f
			ON e.id = f.failed_equipment_id
		GROUP BY e.game_type
		ORDER BY COUNT(*) DESC
		LIMIT 1
	),
	Worst_supplier AS (
		SELECT e.supplier_id
		FROM Equipment e
		INNER JOIN Game_with_highest_failures g
			ON e.game_type = g.game_type
		INNER JOIN Failure_incidents f
			ON e.id = f.failed_equipment_id
		GROUP BY e.supplier_id
		ORDER BY COUNT(*) DESC
		LIMIT 1
	),
	Installation_records AS (
	  SELECT e.id, e.installation_date 
	  FROM Equipment e, Worst_supplier w, Game_with_highest_failures g
	  WHERE e.game_type = g.game_type AND e.supplier_id = w.supplier_id
	),
	Failed_time AS (
	  SELECT 
		  f.failed_equipment_id,
		  MIN(i.installation_date) AS installation_date,
		  MIN(f.failure_date) AS first_failure_date,
		  (MIN(f.failure_date) - MIN(i.installation_date)) / 365.2425 AS time_to_first_failure
	  FROM Failure_incidents f
	  INNER JOIN Installation_records i
		  ON f.failed_equipment_id = i.id
	  GROUP BY f.failed_equipment_id
	)
		   
SELECT FLOOR(AVG(time_to_first_failure))
FROM Failed_time
                
                