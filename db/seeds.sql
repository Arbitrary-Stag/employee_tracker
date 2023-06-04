-- Seeds for the three declared tables,
-- Note that primary key, id, is not included in the seed
-- as auto increment is being utilized 

INSERT INTO departments (department_name)
VALUES ("Bakery"),
       ("Cafe"),
       ("Deli"),
       ("Floral"),
       ("Receiving"),
       ("Customer Service");

INSERT INTO roles (title, salary, department_id)
VALUES ("Head Baker", 70000.00, 1),
       ("Assistant Baker", 50000.00, 1),
       ("Bakery Manager", 70000.00, 1),
       ("Cafe Manager", 70000.00, 2),
       ("Barista", 40000.00, 2),
       ("Deli Chef", 60000.00, 3),
       ("Deli Assistant", 45000.00, 3),
       ("Floral Manager", 60000.00, 4),
       ("Florist", 50000.00, 4),
       ("Receiving Manager", 80000.00, 5),
       ("Stockroom Associate", 50000.00, 5),
       ("Representative", 55000.00, 6),
       ("Customer Service Manager", 80000.00, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("William", "Weaver", 4, null), -- cafe mgr
       ("Kharlo", "Pena", 5, 1), -- barista
       ("Andrew", "Hawley", 1, 4), -- head baker
       ("Anh", "Phan", 3, null), -- bakery mgr
       ("Veronica", "Weaver", 9, 6), -- florist
       ("Evelyn", "Weaver", 8, null), -- floral mgr
       ("Bill", "Weaver", 6, null), -- deli chef
       ("Reid", "Scrivener", 11, 9), -- stockroom assoc
       ("Lynda", "Scrivener", 10, null), -- receiving mgr
       ("Jane", "Melton", 12, 11), -- representative
       ("Debbie", "Torjusen", 13, null), -- cust serv mgr
       ("Hannah", "O'Keefe", 12, 11), -- representative
       ("Chris", "O'Keefe", 5, 1), -- barista
       ("Rocky", "Melton", 2, 4), -- asst baker
       ("Marly", "Moye", 7, 7), -- deli asst
       ("Brian", "Moye", 7, 7), -- deli asst
       ("Silmary", "Cedeno", 9, 6), -- florist
       ("Tony", "Cedeno", 11, 9); -- stockroom assoc