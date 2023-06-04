// Declared variables and boiler plate code //
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

// Logo Art
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

// Main menu list
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

// Prompt for add a department selection
const addDept = {
  type: 'input',
  message: 'What is the name of the new department?',
  name: 'newDept'
};

// The BIG BOY, this function is the parent element of all the rest of the app's code
function displayMainMenu() {
  // Inquirer uses the variable taskList to display the main menu
  inquirer.prompt(taskList).then((answer) => {
    // Depending on the selection chosen by the user, diffferent portions of this function are called

    // View all departments choice
    if (answer.task === 'View all departments') {
      db.query('SELECT id, department_name FROM departments', function (err, departments) {
        if (err) {
          console.error(err);
          return;
        }
        
      // Creates a new table instance
        const table = new Table({
          head: ['Department ID'.white, 'Department Name'.blue],
        });
  
      // Adds rows to the table
        departments.forEach((department) => {
          table.push([department.id, department.department_name]);
        });
  
      // Displays the formatted table
        console.log(table.toString());
      // Re-calls the parent function, which begins by re-displaying the main menu  
        displayMainMenu();
        });
      }

      // View all roles choice
    else if (answer.task === 'View all roles') {
      db.query('SELECT roles.id, roles.title, roles.salary, departments.department_name AS department FROM roles INNER JOIN departments ON roles.department_id = departments.id', function (err, roles) {
        if (err) {
          console.error(err);
          return;
        }
        
      // Creates a new table instance
        const table = new Table({
          head: ['Role ID'.white, 'Role Title'.yellow, 'Role Salary'.green, 'Department'.blue],
        });
  
      // Adds rows to the table
        roles.forEach((role) => {
          table.push([role.id, role.title, role.salary, role.department]);
        });
  
      // Displays the formatted table
        console.log(table.toString());
      // Re-calls the parent function, which begins by re-displaying the main menu  
        displayMainMenu();
        });
    }

      // View all employees choice
    else if (answer.task === 'View all employees') {
      db.query('SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, CONCAT(m.first_name, " ", m.last_name) AS manager, roles.id AS role_id, roles.title AS role, roles.salary AS salary, roles.department_id, departments.department_name AS department FROM employees AS e LEFT JOIN employees AS m ON e.manager_id = m.id LEFT JOIN roles ON e.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id', function (err, employees) {
        if (err) {
          console.error(err);
          return;
        }
        
      // Creates a new table instance
        const table = new Table({
          head: ['Employee ID'.white, 'First Name'.magenta, 'Last Name'.magenta, 'Title'.yellow, 'Salary'.green, 'Department'.blue, 'Manager'.red],
        });
  
      // Adds rows to the table
        employees.forEach((employee) => {
          table.push([employee.id, employee.first_name, employee.last_name, employee.role, employee.salary, employee.department, employee.manager]);
        });
  
      // Displays the formatted table
        console.log(table.toString());
      // Re-calls the parent function, which begins by re-displaying the main menu
        displayMainMenu();
        });
    }

      // Add a department choice
    else if (answer.task === 'Add a department') {
      // calls the unique addDept prompt
      inquirer.prompt(addDept).then((response) => {
        if(addDept) {
          // Inserts the departments information into the database
          db.query(`INSERT INTO departments(department_name) VALUES("${response.newDept}");`,
          function (err) {
            if (err) {
              console.error(err);
              return;
            } 
          console.log(`${response.newDept} was successfully added to the department list!`)
        // Re-calls the parent function, which begins by re-displaying the main menu
          displayMainMenu();
          });
        };
      });
    }

      // Add a role choice
    else if (answer.task === 'Add a role') {
      db.query('SELECT * FROM departments', (err, departments) => {
        if (err) {
          console.error(err);
          return;
        }
      // Prompts the user for information regarding the new role
        inquirer.prompt(
          [
            {
              type: 'input',
              message: 'What is the title of the new role?',
              name: 'title'
            },
            {
              type: 'input',
              message: 'What is the salary of the new role?',
              name: 'salary'
            },
            {
              type: 'list',
              name: 'department',
              message: 'What department should the new role belong to?',
              choices: departments.map((department) => department.department_name)
            }
          ]
        ).then((input) => {
          const departmentId = departments.find(
            (department) => department.department_name === input.department
          ).id;
          // Inserts the new roles information into the database
          db.query(`INSERT INTO roles(title, salary, department_id) VALUES("${input.title}", "${input.salary}", "${departmentId}");`,
          function (err) {
            if (err) {
              console.error(err);
              return;
            } 
          console.log(`${input.title} was successfully added to the role list!`)
        // Re-calls the parent function, which begins by re-displaying the main menu
          displayMainMenu();
          });
        });
      });
    }

      // Add an employee choice
    else if (answer.task === 'Add an employee') {
      db.query('SELECT * FROM roles', (err, roles) => {
        if (err) {
          console.error(err);
          return;
        }
        
        db.query('SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS manager FROM employees', (err, mgr) => {
          if (err) {
            console.error(err);
            return;
          }
        
          // Prompts the user for information about the new employee
          inquirer.prompt(
            [
              {
                type: 'input',
                message: 'What is the first name of the new employee?',
                name: 'first_name',
              },
              {
                type: 'input',
                message: 'What is the last name of the new employee?',
                name: 'last_name',
              },
              {
                type: 'list',
                message: 'What is the role title of the new employee?',
                name: 'role',
                choices: roles.map((role) => role.title)
              },
              {
                type: 'list',
                message: "Who is the new employee's manager?",
                name: 'manager',
                choices: mgr.map((empMgr) => empMgr.manager)
              }
            ]
          ).then((newEmp) => {
            const roleId = roles.find(role => role.title === newEmp.role).id;
            const emp = newEmp.first_name + " " + newEmp.last_name;
            db.query('SELECT employees.id FROM employees WHERE CONCAT(employees.first_name, " ", employees.last_name) = ?', [newEmp.manager],
            function (err, managerId) {
              if (err) {
                console.log(err);
              }
              const mgrId = managerId[0].id;  
              // Inserts the new employees information into the database
              db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES("${newEmp.first_name}", "${newEmp.last_name}", "${roleId}", "${mgrId}");`,
              function (err) {
                if (err) {
                  console.error(err);
                  return;
                } 
                console.log(`${emp} was successfully added to the employee list!`)
              // Re-calls the parent function, which begins by re-displaying the main menu
                displayMainMenu();
              });
            });  
          });  
        });
      }); 
    }

      // Update an employee choice
    else if (answer.task === 'Update an employee role') {
      db.query('SELECT * FROM roles', (err, titles) => {
        if (err) {
          console.error(err);
          return;
        }
      
        db.query('SELECT employees.id, CONCAT(employees.first_name, " ", employees.last_name) AS emp_name FROM employees', (err, emps) => {
          if (err) {
            console.error(err);
            return;
          }
        // Prompts the user for information about the employee who's role they wish to update  
          inquirer.prompt([
            {
              type: 'list',
              name: 'target_emp',
              message: "Please select the name of the employee who's role you wish to update.",
              choices: emps.map((names) => names.emp_name)
            },
            {
              type: 'list',
              name: 'new_role',
              message: "Please select the new role you wish to assign this employee.",
              choices: titles.map((title) => title.title)
            }
          ])
          .then((choices) => {
            const roleId = titles.find(title => title.title === choices.new_role).id;
            db.query('SELECT employees.id FROM employees WHERE CONCAT(employees.first_name, " ", employees.last_name) = ?', [choices.target_emp],
            function (err, empId) {
              if (err) {
                console.log(err);
              }
              const targetEmpId = empId[0].id;  
              // Updates the employee table in the database with the selected employee's new role
              db.query("UPDATE employees SET role_id = ? WHERE id = ?;", [roleId, targetEmpId],
              function (err) {
                if (err) {
                  console.error(err);
                  return;
                } 
                console.log(`${choices.target_emp}'s role was successfully updated to ${choices.new_role}!`)
              // Re-calls the parent function, which begins by re-displaying the main menu
                displayMainMenu();
              });  
            });  
          });
        });
      });
    }

    // This selection closes the application and sends a thank you message for using the app
    else if (answer.task === 'Exit') {
      console.log('Thank you for using the Employee Management App!');
      process.exit(1);
    }
  });
};