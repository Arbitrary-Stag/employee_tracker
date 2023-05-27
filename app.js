const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
require('dotenv').config();
const {Employee, Role, Department} = require('./lib/levels.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'employee_tracker_db'
});

db.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connected to the employee_tracker_db database!');
  // Call the displayLogo function before displaying the main menu
  displayLogo();
  displayMainMenu();
});

// ASCII art logo
const logo = `
._______________________________________________________________.
|      ______                 _                                 |             
|     |  ____|               | |                                |   
|     | |__   _ __ ___  _ __ | | ___  _   _  ___  ___           |     
|     |  __| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\          |                 
|     | |____| | | | | | |_) | | (_) | |_| |  __/  __/          |           
|     |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|          |            
|       __  __         | |             __/ |                    |
|      |  \\/  |        |_|            |___/                     |           
|      | \\  / | __ _ _ _ _  __ _  __ _  ___ _ __                |         
|      | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|               |            
|      | |  | | (_| | | | | (_| | (_| |  __/ |                  |           
|      |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|                  |           
|                                 __/ |                         |               
|                                |___/                          |       
|_______________________________________________________________|
`;

// Function to display the ASCII art logo
function displayLogo() {
  console.log(logo);
}

const taskList = {
  type: 'list',
  message: 'What would you like to do?',
  name: 'task',
  choices: ['View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee role', 
            'Exit'],
};

function displayMainMenu() {
  inquirer.prompt(taskList).then((answer) => {
    if (answer.task === 'View all departments') {
      db.query('SELECT id, department_name FROM departments', function (err, results) {
        if (err) {
          console.error(err);
          return;
        }
        console.table(results);
        displayMainMenu();
      });
    }
    else if (answer.task === 'View all roles') {
      console.log(answer.task);
      displayMainMenu();
    }
    else if (answer.task === 'View all employees') {
      console.log(answer.task);
      displayMainMenu();
    }
    else if (answer.task === 'Add a department') {
      console.log(answer.task);
      displayMainMenu();
    }
    else if (answer.task === 'Add a role') {
      console.log(answer.task);
      displayMainMenu();
    }
    else if (answer.task === 'Add an employee') {
      console.log(answer.task);
      displayMainMenu();
    }
    else if (answer.task === 'Update an employee role') {
      console.log(answer.task);
      displayMainMenu();
    }
    else if (answer.task === 'Exit') {
      console.log('Thank you for using the Employee Management App!');
      process.exit(1);
    }
  });
};

app.use((req, res) => {
  res.status(404).end();
});

