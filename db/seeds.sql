INSERT INTO departments (department_name)
VALUES ("Corporate")
       ("Grunt Work")

INSERT INTO roles (title, salary, department_id)
VALUES ("Boss", 100000.00, 1),
       ("Minion", 1.00, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("William", "Weaver", 1, null),
       ("Kharlo", "Pena", 2, 1),
       ("Andrew", "Hawley", 1, 1);