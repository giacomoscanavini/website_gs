/* LEVEL 09: https://datalemur.com/sql-game/level9.html
    
    Identify who deviated from their assigned position during the Squid Game, 
    and then output a list of guard IDs and access times of any OTHER guards 
    who visited the same location during the disappearance timeframe
*/
/*
    SCHEMA for `guard`:
    id	assigned_post	shift_start	shift_end
    1	Stairs	        00:05:00	06:05:00
    2	Stairs	        20:10:00	05:10:00
    3	Stairs	        17:04:00	00:04:00
    
    SCHEMA for `daily_door_access_logs`:
    id	guard_id	access_time	door_location
    1	40	        17:30:00	Game area
    2	7	        21:00:00	Stairs
    3	19	        06:00:00	Dormitory
        
    SCHEMA for `game_schedule`:
    id	type	                date	                                                    start_time	end_time
    1	Red light green light	Thu May 26 1983 08:00:00 GMT+0800 (Hong Kong Standard Time)	19:02:00	20:14:00
    2	Red light green light	Sat Sep 04 1971 09:00:00 GMT+0900 (Hong Kong Summer Time)	16:55:00	17:49:00
    3	Tug of War	            Wed Apr 10 2013 08:00:00 GMT+0800 (Hong Kong Standard Time)	12:14:00	13:44:00
*/


WITH 
	Most_recent_squid_game AS (
        SELECT start_time, end_time
        FROM Game_schedule
        WHERE LOWER(type) = 'squid game'
        ORDER BY date DESC
        LIMIT 1
	),
    Guards_on_shift AS (
        SELECT g.id, g.assigned_post, g.shift_start, g.shift_end
        FROM Guard g, Most_recent_squid_game m
        WHERE 
            (m.start_time BETWEEN g.shift_start and g.shift_end) OR 
            (m.end_time   BETWEEN g.shift_start and g.shift_end) OR 
            ((g.shift_start BETWEEN m.start_time and m.end_time) AND (g.shift_end BETWEEN m.start_time and m.end_time))
    ),
	Suspect AS (
		SELECT 
			g.id,
			g.assigned_post, 
			g.shift_start,
			g.shift_end, 
			d.access_time, 
			d.door_location
		FROM Guards_on_shift g
		INNER JOIN Daily_door_access_logs d
			ON g.id = d.guard_id
		WHERE g.assigned_post <> d.door_location
	)
	
SELECT g.id, d.access_time
FROM Guards_on_shift g
INNER JOIN Daily_door_access_logs d
    ON g.id = d.guard_id
WHERE 
    (d.access_time BETWEEN 
	   (select start_time from Most_recent_squid_game) and
	   (select end_time from Most_recent_squid_game)) AND
    (d.door_location IN (select door_location from Suspect))