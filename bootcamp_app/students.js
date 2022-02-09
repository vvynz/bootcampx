const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
SELECT students.id AS student_id, students.name AS name, cohorts.name AS cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv.slice(2)[0]}%'
LIMIT ${process.argv.slice(2)[1] || 5}; 
`)
  // Using the template strings, we can just insert the process.argv directly into the query.
  .then(res => {
    // console.log(res.rows);

    // const input = process.argv.slice(2);
    // console.log(process.argv.slice(2)[0]);

    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort.`)
    })
  })
  .catch(err => console.error('query error', err.stack));