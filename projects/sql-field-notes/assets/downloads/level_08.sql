/* LEVEL 08: https://datalemur.com/sql-game/level8.html

    Find and display the information for the player with the highest hesitation time among those who were pushed off 
    in the game that has the highest average hesitation time before a push occured
*/
/* 
    SCHEMA for `player`:
    id	first_name	last_name	game_id	survived	death_description	last_moved_time_seconds
    1	Luigi	    Mangione	50	    true	    null	            39
    4	Joonho	    Choi	    50	    true	    null	            7
    5	Seokjin	    Jung	    50	    false	    Wrong panel	        63

    SCHEMA for `glass_bridge`:
    id	date
    1	Wed Jul 29 1970 09:00:00 GMT+0900 (Hong Kong Summer Time)
    2	Thu Jul 29 1971 09:00:00 GMT+0900 (Hong Kong Summer Time)
    3	Sat Jul 29 1972 09:00:00 GMT+0900 (Hong Kong Summer Time)
*/

WITH 
    Hesitation_game AS (
        SELECT game_id
        FROM Player
        WHERE death_description = 'pushed'
        GROUP BY game_id
        ORDER BY AVG(last_moved_time_seconds) DESC
        LIMIT 1
    )

SELECT 
    p.id, 
    p.first_name, 
    p.last_name,
    p.last_moved_time_seconds AS hesitation_time
FROM Player p
INNER JOIN Hesitation_game h
    ON p.game_id = h.game_id
WHERE p.death_description = 'pushed'
ORDER BY p.last_moved_time_seconds DESC
LIMIT 1