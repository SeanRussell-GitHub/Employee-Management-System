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
    // MySQL Username
    user: 'root',
    // TODO: Add MySQL Password
    password: 'Rabbit#1234',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`), active()
);

async function active() {
    const choice = await promptEmployeeDepartmentOrRole();
    console.log('\033[2J');
    // await response.choice();
    const isContinue = await promptEmployeeDepartmentOrRole();
    console.log('\033[2J')
    if (isContinue) active();
}

async function promptEmployeeDepartmentOrRole(){
    // console.log('\033[2J');
    const responses = await inquirer.prompt([{
        type: 'list',
        name: 'choice',
        message: 'Which of the following would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'end program and exit']
    }
    ]);
    {
        if (responses.choice === 'view all departments') {
            console.log('\033[2J');
            console.log("OK - here are all the departments");
            // const result = db.query('SELECT department_name FROM department');
            // const results = { departments: (result) ? result.rows : null};
            db.query("SELECT department_name FROM department", function (err, result, fields) {
                if (err)
                    throw err;
                console.log('\033[2J');
                var rows = JSON.parse(JSON.stringify(result));
                console.table(rows), console.log("(arrow up or down to move on)");
            });
            active();
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
            active();
        } else if (responses.choice === 'view all employees') {
            console.log('\033[2J');
            console.log("OK - here are all the employees");
            db.query("SELECT first_name, last_name FROM employee", function (err_2, result_3, fields_2) {
                if (err_2)
                    throw err_2;
                var rows_2 = JSON.parse(JSON.stringify(result_3));
                console.log('\033[2J');
                console.table(rows_2), console.log("(arrow up or down to move on)");
            });
            active();
        } else if (responses.choice === "add a department") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of department would you like to add?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is the id of department would you like to add?'
            }]).then(function (input) {
                console.log(input);
                console.log(input.department);
                
                // const newDpt = `INSERT INTO department (department_name) VALUES ("${named}");`;
                db.query(`INSERT INTO department (id, department_name) VALUES ("${input.id}","${input.department}");`, function (err, result) {
                  if (err) {
                      console.log(err);
                    } else {
                        console.log("department added.");
                    }
                //   console.log("Table created");
                active();
                });
            });

        } else if (responses.choice === "add a role") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'input',
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
                console.log(input);
                console.log(input.employee_role);
                
                // const newDpt = `INSERT INTO department (department_name) VALUES ("${named}");`;
                db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("${input.role_id}","${input.title}","${input.salary}","${input.department_id});`, function (err, result) {
                  if (err) {
                      console.log(err);
                    } else {
                        console.log("Emp0loyee role added.");
                    }
                //   console.log("Table created");
                active();
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
                type: 'radio',
                name: 'department_id',
                message: 'What is the department id number of the role you are adding? (Sales-001, Engineering-002, Finance-003 , Legal-004)',
                choices: ['001','002','003','004']
            },{
                type: 'radio',
                name: 'manager_id',
                message: "What is the ID of this employee's manager? (Luke-0002, Leia-0003, Ben-0005, Darth-0007)",
                choices: ['0002','0003','0005','0007']
            },{
                type: 'radio',
                name: 'role_id',
                message: "What is their role ID? (Sales Person-0001, Sales Manager-0002','Lead Engineer-0003','Software Engineer-0004','Account Manager-0005','Accountant-0006','Lead Attorney-0007','Attorney-0008')",
                choices: ['0001','0002','0003','0004','0005','0006','0007','0008']
            }]).then(function (input) {
                console.log(input);
                console.log(input.employee);
                
                // const newDpt = `INSERT INTO department (department_name) VALUES ("${named}");`;
                db.query(`INSERT INTO employee (id, first_name, last_name, department_id, manager_id, role_id) VALUES ("${input.id}","${input.first_name}","${input.last_name}","${input.department_id}","${input.manager_id}","${input.role_id}");`, function (err, result) {
                  if (err) {
                      console.log(err);
                    } else {
                        console.log("Employee added.");
                    }
                //   console.log("Table created");
                active();
                });
            });

        } else if (responses.choice === "update an employee role") {
            console.log('\033[2J');
            await inquirer.prompt([{
                type: 'radio',
                name: 'employee_role',
                message: 'What employee role would you like to update?',
                choices: ['Sales Person','Sales Manager','Lead Engineer','Software Engineer','Account Manager','Accountant','Lead Attorney','Attorney']
            }]);
            {
                if (responses.choice === "Sales Person") {
                    console.log('\033[2J');
                    await inquirer.prompt([{
                        type: 'input',
                        name: 'title',
                        message: `What would you like the Sales Peoples' Title to be?`
                    },{
                        type: 'number',
                        name: 'salary',
                        message: `What would you like the Sales Peoples' Salary to be?`                    
                    }]).then(function (input) {
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0001","${input.title}","${input.salary}","001");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Sales Manager") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0002","${input.title}","${input.salary}","001");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Lead Engineer") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0003","${input.title}","${input.salary}","002");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Software Engineer") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0004","${input.title}","${input.salary}","002");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Account Manager") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0005","${input.title}","${input.salary}","003");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Accountant") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0006","${input.title}","${input.salary}","003");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Lead Attorney") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0007","${input.title}","${input.salary}","004");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });
                } else  if (responses.choice === "Attorney") {
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
                        console.log(input);
                        console.log(input.employee_role);
                        db.query(`INSERT INTO employee_role (role_id, title, salary, department_id) VALUES ("0008","${input.title}","${input.salary}","004");`, function (err, result) {
                          if (err) {
                              console.log(err);
                            } else {
                                console.table(employee_role);
                            }
                        active();
                        });
                    });                        
                }
            }
        } else if (responses.choice === 'end program and exit') {
            console.log("good bye!");
            process.kill(process.pid, 'SIGTERM');
        }
}} 