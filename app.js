const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express');
const Table = require('cli-table3');
const colors = require('@colors/colors');
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
.___________________________________________________________.
|      ______                 _                             |             
|     |  ____|               | |                            |   
|     | |__   _ __ ___  _ __ | | ___  _   _  ___  ___       |     
|     |  __| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\      |                 
|     | |____| | | | | | |_) | | (_) | |_| |  __/  __/      |           
|     |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|      |            
|       __  __         | |             __/ |                |
|      |  \\/  |        |_|            |___/                 |           
|      | \\  / | __ _ _ _ _  __ _  __ _  ___ _ __            |         
|      | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |/ _ \\ '__|           |            
|      | |  | | (_| | | | | (_| | (_| |  __/ |              |           
|      |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|              |           
|                                 __/ |                     |               
|                                |___/                      |       
|___________________________________________________________|
`;

// Function to display the art logo
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

const addDept = {
  type: 'input',
  message: 'What is the name of the new department?',
  name: 'newDept'
};

function displayMainMenu() {
  inquirer.prompt(taskList).then((answer) => {
    if (answer.task === 'View all departments') {
      db.query('SELECT id, department_name FROM departments', function (err, departments) {
        if (err) {
          console.error(err);
          return;
        }
        
      // Create a new table instance
        const table = new Table({
          head: ['Department ID'.white, 'Department Name'.blue],
        });
  
      // Add rows to the table
        departments.forEach((department) => {
          table.push([department.id, department.department_name]);
        });
  
      // Display the formatted table
        console.log(table.toString());
        displayMainMenu();
        });
      }

    else if (answer.task === 'View all roles') {
      db.query('SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id', function (err, roles) {
        if (err) {
          console.error(err);
          return;
        }
        
      // Create a new table instance
        const table = new Table({
          head: ['Role ID'.white, 'Role Title'.yellow, 'Role Salary'.green, 'Department'.blue],
        });
  
      // Add rows to the table
        roles.forEach((role) => {
          table.push([role.id, role.title, role.salary, role.department]);
        });
  
      // Display the formatted table
        console.log(table.toString());
        displayMainMenu();
        });
    }

    else if (answer.task === 'View all employees') {
      db.query('SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, CONCAT(m.first_name, " ", m.last_name) AS manager, roles.id AS role_id, roles.title AS role, roles.salary AS salary, roles.department_id, departments.department_name AS department FROM employees AS e LEFT JOIN employees AS m ON e.manager_id = m.id LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id', function (err, employees) {
        if (err) {
          console.error(err);
          return;
        }
        
      // Create a new table instance
        const table = new Table({
          head: ['Employee ID'.white, 'First Name'.magenta, 'Last Name'.magenta, 'Title'.yellow, 'Salary'.green, 'Department'.blue, 'Manager'.red],
        });
  
      // Add rows to the table
        employees.forEach((employee) => {
          table.push([employee.id, employee.first_name, employee.last_name, employee.role, employee.salary, employee.department, employee.manager]);
        });
  
      // Display the formatted table
        console.log(table.toString());
        displayMainMenu();
        });
    }

    else if (answer.task === 'Add a department') {
      inquirer.prompt(addDept).then((response) => {
        if(addDept) {
          db.query(`INSERT INTO departments(department_name) VALUES("${response.newDept}");`,
          function (err) {
            if (err) {
              console.error(err);
              return;
            } 
          console.log(`${response.newDept} was successfully added to the department list!`)
          displayMainMenu();
          });
        };
      });
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

