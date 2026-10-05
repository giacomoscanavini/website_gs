/* LEVEL 01: https://datalemur.com/sql-game/level1.html

    The organizers want to identify vulnerable living players who might be easily manipulated for the next game. 
    Find all players who are alive, in severe debt (debt > 400,000,000 won), and are either elderly (age > 65) 
    OR have a vice of Gambling with no family connections. 
*/
/*
SCHEMA for `player`:
id	first_name	last_name	age	status	debt	    vice	            has_close_family
1	Luigi	    Mangione	27	alive	3930975804	Healthcare	        false
2	Seokjin	    Nam	        68	alive	684587725	Negative thinking	false
3	Chiho	    Dae	        54	alive	983907316	Gossiping	        true
4	Joonho	    Choi	    53	alive	1926314889	Procrastination	    false
*/

SELECT *
FROM player
WHERE 
    status = 'alive' AND
    debt > 400000000 AND
    (age > 65 OR (vice = 'Gambling' AND has_close_family = false))