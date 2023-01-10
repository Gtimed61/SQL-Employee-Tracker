const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
//const consoleTable = require('console.table');

const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Family1244@',
        database: 'employee_tracker_db'
    });

db.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the employee_tracker_db database.');
    promptUser();
});

// default response for any other request (Not Found)
//app.use((req, res) => {
//    res.status(404).end();
//});

//app.listen(PORT, () => {
//    console.log(`App listening on PORT: ${PORT}`);
//});



//prompts user to select an action
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments', 
                'View all roles',
                'View all employees',  
                'Add a department', 
                'Add a role', 
                'Add an employee', 
                'Update an employee role', 
                'Exit'
            ]
        }
    ]);
};

//view all departments
const viewDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, ( err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        promptUser();
    }
    );
};

//view roles
const viewRoles = () => {
    const sql = `SELECT * FROM role`;
    db.query(sql, ( err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        promptUser();
    }
    );
};

//view employees
const viewEmployees = () => {
    const sql = `SELECT * FROM employee`;
    db.query(sql, ( err, rows) => {
        if (err) {
            console.log(err);
        }
        console.table(rows);
        promptUser();
    }
    );
};

//add a department
const addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`;
        const params = answer.name;
        db
        .query
        (sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Department added successfully');
            promptUser();
        });
    });
};

//add a role
const addRole = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `title`,
            message: `What is the title of the role?`
        },
        {
            type: `input`,
            name: `salary`,
            message: `What is the salary of the role?`
        },
        {
            type: `input`,
            name: `department_id`,
            message: `What is the department id of the role?`
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [answer.title, answer.salary, answer.department_id];
        db
        .query
        (sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Role added successfully');
            promptUser();
        });
    });
};

//add an employee
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `first_name`,
            message: `What is the first name of the employee?`
        },
        {
            type: `input`,
            name: `last_name`,
            message: `What is the last name of the employee?`
        },
        {
            type: `input`,
            name: `role_id`,
            message: `What is the role id of the employee?`
        },
        {
            type: `input`,
            name: `manager_id`,
            message: `What is the manager id of the employee?`
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
        db
        .query
        (sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Employee added successfully');
            promptUser();
        });
    });
};  

//update an employee role
const updateEmployeeRole = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `role_id`,
            message: `What is the new role id of the employee?`
        },
        {
            type: `input`,
            name: `id`,
            message: `What is the id of the employee?`
        }
    ])
    .then((answer) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [answer.role_id, answer.id];
        db
        .query
        (sql, params, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('Employee role updated successfully');
            promptUser();
        });
    });
};

//exit
const exit = () => {
    process.exit();
}



