SELECT day, COUNT(*) AS number_of_assignments, SUM(duration) AS duration
from assignments
GROUP BY day
ORDER BY day;