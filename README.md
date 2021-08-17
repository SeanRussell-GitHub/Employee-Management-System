# Employee-Management-System
Employee Management System   [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# 12 Homework SQL: Employee Tracker

Employee Tracker is a Node.js command-line application that displays employee information in table format about employees and allows the user to modify those records. 
#
Use this command in an integrated terminal to start the application:

```bash
node index.js
```
#
This  CMS application uses the following NPM packages:

*  console.table (for viewing tables)
*  express (web application framework)
*  inquirer (for Q&A)
*  mysql2 (database)
*  router (routes)
*  inquirer (for question and answer prompts)
*  mysql2 (for database management)

(Content Management System (CMS) used to interact with the information contained in the database.)

##
#
Please follow the link to a walkthrough video that demonstrates its functionality and all of the tests passing.
## Video link:
### https://drive.google.com

#

## User Story

```md
As a manager I want to be able to view my team's basic info 
so that I have a quick method of reference
```

```md
As abusiness owner I want to be able to view and manage the departments, roles, and employees in my company
```

## Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select which employee role to update,
what to change the title to be, what the salary of the role to be, 
and then I am shown a table of the changes
WHEN I choose to update an employee's role
THEN I am prompted to select an employee to update and their new role
this information is then updated in the database 
```

## Database Structure
* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `employee role`

    * `role_id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `department_id`: `INT` to hold reference to role id

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

    * `title` : `VARCHAR(30)` to hold refernce to the employee title

* `manager`
    * `id` : `INT PRIMARY KEY`
    *  `first_name ` : `VARCHAR(30)` to hold the manager first name
    *  `last_name` : `VARCHAR(30)` to hold the manager last name
    *  `manager_title` : `VARCHAR(30)` to hold the manager department name
## Review

Submitting both of the following for review:

* A walkthrough video:
* https://drive.google.com/file/d/1W-uVqtIH1gYZZzlgG5x6-G7kS4zTO7Ei/view

* GitHub repository:
(https://github.com/SeanRussell-GitHub/Employee-Management-System.git)

