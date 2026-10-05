/* LEVEL 04: https://datalemur.com/sql-game/level4.html

    The Front Man needs to analyze and rank the teams before the Tug of War game begins. 
    For each team that has exactly 10 players, calculate their average player age. 
    Additionally, categorize the teams based on their average player age into three age groups:
        'Fit': Average age < 40
        'Grizzled': Average age between 40 and 50 (inclusive)
        'Elderly': Average age > 50

        Show the team_id, average age, age group, and rank the teams based on their average player age (highest average age = rank 1).
*/
/*
    SCHEMA for `player`:
    id	first_name	last_name	age	status	team_id
    1	Luigi	    Mangione	27	alive	23
    2	Seokjin	    Nam	        68	alive	23
    3	Chiho	    Dae	        54	alive	23
    4	Joonho	    Choi	    53	alive	24
*/

SELECT 
    t.team_id, 
    t.age_team,
    CASE
        WHEN t.age_team < 40 THEN 'Fit'
        WHEN t.age_team > 50 THEN 'Elderly'
        ELSE 'Grizzled'
    END AS age_group,
    RANK() OVER (ORDER BY age_team DESC) AS rank
FROM (
    SELECT team_id, COUNT(*) AS n_players, AVG(age) AS age_team
    FROM player  
    GROUP BY team_id
) t
WHERE t.n_players = 10
