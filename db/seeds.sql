INSERT INTO department (id, department_name)
VALUES (001, "Sales"),
       (002, "Engineering"),
       (003, "Finance"),
       (004, "Legal");

INSERT INTO employee_role (role_id, title, salary, department_id)
VALUES  (0001, "Sales Person", "80000", 001),
        (0002, "Sales Manager", "90000", 001),
        (0003, "Lead Engineer", "150000", 002),
        (0004, "Software Engineer", "120000", 002),
        (0005, "Account Manager", "160000", 003),
        (0006, "Accountant", "125000", 003),
        (0007, "Lead Attorney", "250000", 004),
        (0008, "Attorney", "190000", 004);

INSERT INTO employee (id, first_name, last_name, department_id, manager_id, role_id)
VALUES  (01, "Luke", "Skywalker", 001, null, 0002),
        (02, "Leia", "Organa", 002, null, 0003),
        (03, "Ben", "Kenobi", 003, null, 0005),
        (04, "Darth", "Vader", 004, null, 0007),
        (05, "C", "3P0", 001, 01, 0001),
        (06, "R2", "D2", 002, 02, 0004),
        (07, "Chewie", "Chewbacca", 003, 03, 0006),
        (08, "Han", "Solo", 004, 04, 0008);

INSERT INTO manager (id, first_name, last_name, manager_title, role_id)
VALUES  (01, "Luke", "Skywalker", "Sales Manager", 0002),
        (02, "Leia", "Organa", "Lead Engineer", 0003),
        (03, "Ben", "Kenobi", "Account Manager", 0005),
        (04, "Darth", "Vader", "Legal Team Lead", 0007);