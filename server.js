const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'employee_tracker_db'
});
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  process.exit(1);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  