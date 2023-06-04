// Declared classes based on the tables that were created
// Classes are then exported to be utilized in the app.js file

class Employee{
    constructor(first_name, last_name, role_id, manager_id){
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}

class Role{
    constructor(title, salary, department_id){
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }
}

class Department{
    constructor(department_name){
        this.department_name = department_name;
    }
}

module.exports = {Employee, Role, Department};