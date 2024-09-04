const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change the port number

app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'joseph',
  password: '12345',
  database: 'hostel'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('MySQL connected');
});

app.post('/authenticate', (req, res) => {
  const { name, password, userType } = req.body;

  let tableName = '';
  if (userType === 'admin') {
    tableName = 'admin';
  } else if (userType === 'student') {
    tableName = 'student';
  }

  const query = `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`;
  db.query(query, [name, password], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.length > 0) {
      res.status(200).json({ message: 'Login successful', userType });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
