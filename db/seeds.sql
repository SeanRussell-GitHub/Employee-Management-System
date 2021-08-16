INSERT INTO department (id, department_name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal");

INSERT INTO employee_role (role_id, title, salary, department_id)
VALUES  (9999, "Sales Person", "80000", 001),
        (8888, "Sales Manager", "90000", 001),
        (7777, "Lead Engineer", "150000", 002),
        (6666, "Software Engineer", "120000", 002),
        (5555, "Account Manager", "160000", 003),
        (4444, "Accountant", "125000", 003),
        (3333, "Lead Attorney", "250000", 004),
        (2222, "Attorney", "190000", 004);

INSERT INTO employee (id, first_name, last_name, department_id, manager_id, title)
VALUES  (01, "Luke", "Skywalker", 001, null, "Sales Manager"),
        (02, "Leia", "Organa", 002, null, "Lead Engineer"),
        (03, "Ben", "Kenobi", 003, null, "Account Manager"),
        (04, "Darth", "Vader", 004, null, "Lead Attorney"),
        (05, "C", "3P0", 001, 01, "Sales Person"),
        (06, "R2", "D2", 002, 02, "Software Engineer"),
        (07, "Chewie", "Chewbacca", 003, 03, "Accountant"),
        (08, "Han", "Solo", 004, 04, "Attorney");

INSERT INTO manager (id, first_name, last_name, manager_title, role_id)
VALUES  (01, "Luke", "Skywalker", "Sales Manager", 8888),
        (02, "Leia", "Organa", "Lead Engineer", 7777),
        (03, "Ben", "Kenobi", "Account Manager", 5555),
        (04, "Darth", "Vader", "Legal Team Lead", 3333);