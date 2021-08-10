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
  console.log(`Connected to the employee_db database.`)
);

active();
// promptEmployeeDepartmentOrRole();

const options = {
    addRole() {
        console.log('Roles')
    },
    addDepartment() {

    },
    addEmployee() {

    }
}

async function active() {
    const choice = await promptEmployeeDepartmentOrRole();
    // await response.choice();
    const isContinue = await promptEmployeeDepartmentOrRole();
    if (isContinue) active();
}

function promptEmployeeDepartmentOrRole(){
    // console.log('\033[2J');
    return inquirer.prompt([{
        type: 'list',
        message: 'Which of the following would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'end program and exit'],
        name: 'choice'
    }
]).then(function (responses) {
    // console.log(responses.choice);
    { if (responses.choice === 'view all departments') {
        console.log("OK - here are all the departments");
        // const result = db.query('SELECT department_name FROM department');
        // const results = { departments: (result) ? result.rows : null};
        db.query("SELECT department_name FROM department", function (err, result, fields) {
            if (err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                console.log(rows)});
                // active();
        } else if (responses.choice ===  'view all roles') {
            console.log("OK - here are all the roles");
            db.query("SELECT title FROM employee_role", function (err, result, fields) {
                if (err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                console.log(rows)});
                // active();
        } else if (responses.choice ===  'view all employees') {
            // console.log('\033[2J');
            console.log("OK - here are all the employees");
            db.query("SELECT first_name, last_name FROM employee", function (err, result, fields) {
                if (err) throw err;
                var rows = JSON.parse(JSON.stringify(result));
                console.log(rows)});
                // active();
        } else if (responses.choice === "add a department") {
            // console.log("OK - what department would you like to add?");
            return inquirer.prompt([{
                type: 'input',
                name: 'department',
                message: 'What is the name of department would you like to add?'
            }]).then(function(answer){
                console.log(answer);
                // var answered = JSON.parse(JSON.stringify(answer));
                // console.log(answered);
                // // var newDpt = `INSERT INTO department(id, department_name) VALUES ('999', ${answered});`;
                // // db.query(newDpt, function (err, result) {
                // //   if (err) throw err;
                // //   console.log("Table created");
                // //   active();
            // })
            })
        } else if (responses.choice === "add a role") {
            console.log("OK - what role would you like to add?");

        } else if (responses.choice === "add an employee") {
            console.log("OK - what employee would you like to add?");

        } else if (responses.choice === "update an employee role") {
            console.log("OK - what employee role would you like to update?");

        } else if (responses.choice === 'end program and exit') {
            console.log("good bye!");
            process.kill(process.pid, 'SIGTERM');
        }
    }
    // active();
})
}

async function promptToContinue(){
    return inquirer.prompt([{
        type: 'confirm',
        message: 'do you want to continue',
        name: 'continue',
    }]).then(function (confirm) {
        if (confirm = "true"){ active()
        } else if (!confirm) {
        console.log('Thanks for playing!')
        process.kill(process.pid, 'SIGTERM');
    }
})
}