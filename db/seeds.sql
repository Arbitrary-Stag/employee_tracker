INSERT INTO departments (id, department_name)
VALUES (1, "Bakery"),
       (2, "Cafe"),
       (3, "Deli"),
       (4, "Floral"),
       (5, "Receiving"),
       (6, "Customer Service");

INSERT INTO roles (id, title, salary, department_id)
VALUES (1, "Head Baker", 70000.00, 1),
       (2, "Assistant Baker", 50000.00, 1),
       (3, "Bakery Manager", 70000.00, 1),
       (4, "Cafe Manager", 70000.00, 2),
       (5, "Barista", 40000.00, 2),
       (6, "Deli Chef", 60000.00, 3),
       (7, "Deli Assistant", 45000.00, 3),
       (8, "Floral Manager", 60000.00, 4),
       (9, "Florist", 50000.00, 4),
       (10, "Receiving Manager", 80000.00, 5),
       (11, "Stockroom Associate", 50000.00, 5),
       (12, "Representative", 55000.00, 6),
       (13, "Customer Service Manager", 80000.00, 6);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (1, "William", "Weaver", 4, null), -- cafe mgr
       (2, "Kharlo", "Pena", 5, 1), -- barista
       (3, "Andrew", "Hawley", 1, 4), -- head baker
       (4, "Anh", "Phan", 3, null), -- bakery mgr
       (5, "Veronica", "Weaver", 9, 6), -- florist
       (6, "Evelyn", "Weaver", 8, null), -- floral mgr
       (7, "Bill", "Weaver", 6, null), -- deli chef
       (8, "Reid", "Scrivener", 11, 9), -- stockroom assoc
       (9, "Lynda", "Scrivener", 10, null), -- receiving mgr
       (10, "Jane", "Melton", 12, 11), -- representative
       (11, "Debbie", "Torjusen", 13, null), -- cust serv mgr
       (12, "Hannah", "O'Keefe", 12, 11), -- representative
       (13, "Chris", "O'Keefe", 5, 1), -- barista
       (14, "Rocky", "Melton", 2, 4), -- asst baker
       (15, "Marly", "Moye", 7, 7), -- deli asst
       (16, "Brian", "Moye", 7, 7), -- deli asst
       (17, "Silmary", "Cedeno", 9, 6), -- florist
       (18, "Tony", "Cedeno", 11, 9); -- stockroom assoc