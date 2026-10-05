/* LEVEL 07: https://datalemur.com/sql-game/level7.html

    Create a comprehensive report identifying guards who were missing from their sleeping quarters during off-duty hours. 
    This report should include the following details for each missing guard, ordered by guard ID:
        Guard Number
        Code Name
        Status
        Last Seen in Room
        Spotted Outside Room Time
        Spotted Outside Room >Location
        Time Between Room and Outside
        Time Range from First to Last Detection of Any Guard
*/
/* 
    SCHEMA for `guard`:
    id	assigned_room_id	code_name	status
    1	15	                Centipede	circle
    2	14	                Tammar	    circle
    3	13	                Roach	    triangle

    SCHEMA for `room`:
    id	floor	isvacant	last_check_time
    1	2	    false	    21:02:00
    2	4	    false	    20:58:00
    3	2	    false	    20:42:00

    SCHEMA for `failure_incidents`:
    id	location	        movement_detected	guard_spotted_id	movement_detected_time
    1	Orange Doorway(A)	true	            31	                20:30:00
    2	Orange Doorway(B)	false	            null	            null
    3	Orange Doorway(C)	false	            null	            null
*/

SELECT 
	g.id AS guard_number,
	g.code_name AS code_name, 
	g.status,  
	r.last_check_time AS last_seen_in_room,
	c.movement_detected_time AS spotted_outside_room_time,
	c.location AS spotted_outside_room_location,
	c.movement_detected_time - r.last_check_time AS time_between_room_and_outside,
	(SELECT MAX(Camera.movement_detected_time) - MIN(Camera.movement_detected_time)
     FROM Camera
     WHERE Camera.guard_spotted_id IS NOT NULL) AS time_range_first_last_detection
FROM Guard g
LEFT JOIN Room r
	ON r.id = g.assigned_room_id
INNER JOIN Camera c
	ON c.guard_spotted_id = g.id
WHERE r.isVacant = true
ORDER BY g.id            