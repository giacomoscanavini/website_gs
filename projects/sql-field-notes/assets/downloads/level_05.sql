/* LEVEL 05: https://datalemur.com/sql-game/level5.html

    For the Marbles game, the Front Man needs you to discover who Player 456's closest companion is. 
    First, find the player who has interacted with Player 456 the most frequently in daily activities. 
    Then, confirm this player is still alive and return a row with both players' first names, and the number of interactions they've had.
*/
/* 
    SCHEMA for `player`:
    id	first_name	last_name	age	    status
    1	Luigi	    Mangione	27	    alive
    2	Seokjin	    Nam	        68	    dead
    3	Chiho	    Dae	        54	    dead

    SCHEMA for `Daily_interactions`:
    id	player1_id	player2_id	type	        date
    1	272	        431	        Conversation	Fri Jun 26 2020 08:00:00 GMT+0800 (Hong Kong Standard Time)
    2	300	        417	        Eating	        Fri Jun 26 2020 08:00:00 GMT+0800 (Hong Kong Standard Time)
    3	150	        1	        Hugging	        Thu Jun 25 2020 08:00:00 GMT+0800 (Hong Kong Standard Time)
*/

WITH
	Player_interactions AS (
	  SELECT t.target_id, t.player_id, COUNT(*) AS counts
	  FROM (
		  SELECT 
			  456 AS target_id,
			  CASE
				WHEN player1_id <> 456 THEN player1_id
				ELSE player2_id 
			  END AS player_id,
			  type,
			  EXTRACT(DAY FROM date) AS day,
			  EXTRACT(MONTH FROM date) AS month,
			  EXTRACT(YEAR FROM date) AS year
		  FROM Daily_interactions
		  WHERE player1_id = 456 OR player2_id = 456
	  ) AS t
	  GROUP BY t.target_id, t.player_id
	  ORDER BY counts DESC
	)
	
SELECT 
	pl.first_name AS name_456,
	p.first_name AS name_other,
	counts
FROM Player_interactions i
INNER JOIN player pl
	ON i.target_id = pl.id
INNER JOIN player p
	ON i.player_id = p.id
WHERE p.status = 'alive'
LIMIT 1