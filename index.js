const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const router = require('router');
var ui = new inquirer.ui.BottomBar();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Rabbit#1234',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`, '\033[2J'), promptEmployeeDepartmentOrRole()
);

async function promptEmployeeDepartmentOrRole(){
    console.log('\033[2J');
    const responses = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Which of the following would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', `update an employee's role`, 'end program and exit']
    }
    ]);
    {
        if (responses.choice === 'view all departments') {
            console.log('\033[2J');
            console.log("OK - here are all the departments");
            db.query("SELECT department_name FROM department", function (err, result, fields) {
                if (err)
                    throw err;
                console.log('\033[2J');
                var rows = JSON.parse(JSON.stringify(result));
                console.table(rows), console.log("(arrow up or down to move on)");
            });
        } else if (responses.choice === 'view all roles') {
            console.log('\033[2J');
            console.log("OK - here are all the roles");
            db.query("SELECT title FROM employee_role", function (err_1, result_2, fields_1) {
                if (err_1)
                    throw err_1;
                console.log('\033[2J');
                var rows_1 = JSON.parse(JSON.stringify(result_2));
                console.table(rows_1), console.log("(arrow up or down to move on)");
            });
        } else if (responses.choice === 'view all employees') {
            console.log('\033[2J');
            console.log("OK - here are all the employees");
            db.query("SELECT first_name, last_name, title FROM employee", function (err_2, result_3, fields_2) {
                if (err_2)
                    throw err_2;
                var rows_2 = JSON.parse(JSON.stringify(result_3));
                console.log('\033[2J');
                console.table(rows_2), console.log("(arrow up or down to move on)");
            });
        } else if (responses.choice === "add a department") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of department would you like to add?'
            }]).then(function (input) {
                db.query(`INSERT INTO department (id, department_name) VALUES (id,"${input.department}");`, function (err, result) {
                  if (err) {
                      console.log(err);
                    } else {
                        console.log("department added.");
                        console.log("arrow down for more options")
                    }
                });
            });

        } else if (responses.choice === "add a role") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'number',
                name: 'role_id',
                message: 'What is the id of the role you would you like to add?'
            },
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of this role?'
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'What is the department id number of the role you are adding? (001 Sales, 002 Engineering, 003 Engineering, 004 Legal)',
                choices: ['001','002','003','004']
            }]).then(function (input) {
                db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("${input.role_id}","${input.title}","${input.salary}","${input.department_id}");`, function (err, result) {
                  if (err) {
                      console.log(err);
                    } else {
                        console.log("Employee role added.");
                    }
                });
            });
        } else if (responses.choice === "add an employee") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'input',
                name: 'id',
                message: "What is the employee's ID number?"
            },{
                type: 'input',
                name: 'first_name',
                message: "What is their first name?"
            },{
                type: 'input',
                name: 'last_name',
                message: "What is their last name?"
            },{
                type: 'list',
                name: 'department_id',
                message: 'What is the department id number of the role you are adding? (Sales-001, Engineering-002, Finance-003 , Legal-004)',
                choices: ['001','002','003','004']
            },{
                type: 'list',
                name: 'manager_id',
                message: "What is the ID of this employee's manager? (Luke-0002, Leia-0003, Ben-0005, Darth-0007)",
                choices: ['0002','0003','0005','0007']
            },{
                type: 'list',
                name: 'title',
                message: "What is their title (role ID)? (Sales Person-0001, Sales Manager-0002','Lead Engineer-0003','Software Engineer-0004','Account Manager-0005','Accountant-0006','Lead Attorney-0007','Attorney-0008')",
                choices: ['Sales Person','Sales Manager','Lead Engineer','Software Engineer','Account Manager','Accountant','Lead Attorney','Attorney']
            }]).then(function (input) {
                db.query(`INSERT INTO employee (id, first_name, last_name, department_id, manager_id, title) VALUES ("${input.id}","${input.first_name}","${input.last_name}","${input.department_id}","${input.manager_id}","${input.title}")`, function (err, result) {
                  if (err) {
                      console.log(err);
                    } else {
                        console.log("Employee added.");
                    }
                });
            });

        } else if (responses.choice === "update an employee role") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'list',
                name: 'employee_role',
                message: 'What employee role would you like to update?',
                choices: ['Sales Person','Sales Manager','Lead Engineer','Software Engineer','Account Manager','Accountant','Lead Attorney','Attorney']
            }]).then(async function (input) {
                console.log(input.employee_role);
                if (input.employee_role === 'Sales Person') {
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Sales Peoples' Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Sales Peoples' Salary to be?`                    
                    }]).then(function (input)                    {
                        console.log(input.title);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, results, fields) {
                          if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Sales Manager") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Sales Manager's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Sales Manager's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Lead Engineer") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Lead Engineer's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Lead Engineer's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Software Engineer") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Software Engineer's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Software Engineer's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Account Manager") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Account Manager's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Account Manager's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Accountant") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Accountant's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Accountant's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Lead Attorney") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Lead Attorney's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Lead Attorney's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                    });
                } else  if (input.employee_role === "Attorney") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Attorney's Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Attorney's Salary to be?`                    
                    }]).then(function (input) {
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES (role_id,"${input.title}","${input.salary}", department_id);`, function (err, result) {
                            if (err) 
                            throw err;
                              console.log(err);
                            console.log('\033[2J');
                            db.query("SELECT * FROM employee_role", function (err_1, result_2, fields_1) {
                                if (err_1)
                                    throw err_1;
                                console.log('\033[2J');
                                var rows_1 = JSON.parse(JSON.stringify(result_2));
                                console.table(rows_1), console.log("(arrow up or down to move on)");
                            });
                        });
                                });                        
                            }       
                        })                                        
            } else if (responses.choice === `update an employee's role`) {
                console.log('\033[2J');
                await inquirer.prompt([{
                    type: 'list',
                    name: 'employeeName',
                    message: `Which employee would you like to update?`,
                    choices: ['Luke','Leia','Ben','Darth','C','R2','Chewie','Han']
                },{
                    type: 'list',
                    name: 'title',
                    message: `What is this employee's new role?`,
                    choices: ['Sales Person', 'Sales Manager','Lead Engineer','Software Engineer','Account Manager','Accountant','Lead Attorney','Attorney']
                }]).then(function (input) {
                    db.query(`UPDATE employee SET title = '${input.title}' WHERE first_name = '${input.employeeName}'`, function (err, result) {
                        if (err) {
                            console.log(err);
                          } else {
                              console.log("Employee role changed.");
                              console.log("arrow down for more options")
                          }
                });
                });
            } else if (responses.choice === 'end program and exit') {
                console.log('\033[2J');
            console.log("good bye!");
            process.kill(process.pid, 'SIGTERM');
        }}
        promptEmployeeDepartmentOrRole();
    }
