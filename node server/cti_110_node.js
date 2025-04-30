const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

// Database setup
const { Pool } = require('pg');
const connectionString = `postgres://postgres:CTI_110_WakeTech@localhost/Gradebook`;
const pool = new Pool({ connectionString });

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the gradebook.html file
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'gradebook.html'));  // Update path here
});

app.use("/", router);

// API endpoint for grades
router.get('/api/grades', function(req, res) {
    pool.query(
        `SELECT Students.student_id, first_name, last_name, AVG(assignments.grade) as total_grade
         FROM Students
         LEFT JOIN Assignments ON Assignments.student_id = Students.student_id
         GROUP BY Students.student_id
         ORDER BY total_grade DESC`,
        [],
        function(err, result) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json(result.rows);
        }
    );
});

// Start the Express server
app.listen(3000, function() {
    console.log("App Server via Express is listening on port 3000");
    console.log("To quit, press CTRL + C");
});
