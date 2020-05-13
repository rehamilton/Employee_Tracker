const mysql = require("mysql");
const inquirer = require("inquirer")
const con = require("./connections/dbconnection")
const queries = require("./connections/queries")


// initiating function
async function init() {
    inquirer
    .prompt([{
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Roles",
            // "View Employees By Manager",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Remove Employee",
            "Update Employee Role",
            // "Update Employee Manager",
            "Exit"
        ]
    }])
    .then(choice => {
        switch(choice.selection) {
            case "View all Employees":
                viewAll() 
                return;
            case "View all Departments":
                getDepartments() 
                return;
            case "View all Roles":
                getRoles() 
                return;
            case "Add Employee":
                addEmployee()
                return
            case "Add Department":
                addDepartment()
                return
            case "Add Role":
                addRole()
                return
            case "Remove Employee":
                removeEmployee()
                return
            case "Update Employee Role":
                updateRole()
                return
            case "View Employees By Manager":
                employeeManager()
                return
            case "Update Employee Manager":
                updateManager()
                return
            case "Exit":
                //add in connection end
                con.end()
                break
        }
    }) 
}

async function viewAll () {
    employeeSQLquery = function () {
        return `SELECT * FROM employee`
    };

    con.query(employeeSQLquery(), function(err,result) {
        if (err) throw err;
        console.table(result)

        init()   
    });
};

function getDepartments() {
    deptSQLquery = function () {
        return `SELECT * FROM department`
    }
    
    con.query(deptSQLquery(), function(err, result){
        if (err) throw err;

        console.table(result)

        init()
    });
};

async function getRoles() {
    console.log("roles");

    getSQLquery = function () {
        return `SELECT * FROM role`
    }
    
    con.query(getSQLquery(), function(err, result){
        if (err) throw err;

        console.table(result)

        init()
    });
};

// function to add employee
async function addEmployee() {

    inquirer
    .prompt([{
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
        validate: function(input) {
            if (input ===""){
                console.log("FIRST NAME REQUIRED");
                return false;
            }else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
        validate: function(input) {
            if (input ===""){
                console.log("LAST NAME REQUIRED");
                return false;
            }else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "role_id",
        message: "What is the employee's role ID?",
        validate: function(input) {
            if (input ===""){
                console.log("ROLE ID REQUIRED");
                return false;
            }else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "manager_id",
        message: "What is the employees manager's ID?",
        validate: function(input) {
            if (input ===""){
                console.log("MANAGER ID REQUIRED");
                return false;
            }else{
                return true
            }
        }
    }])
    .then(response => {
        console.log(response);


        con.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.first_name,response.last_name, response.role_id, response.manager_id],
            function (err, res){
                if (err) console.log(err);
                console.log("employee successfully added")

            init()
        })
    })
};

async function addDepartment() {
    inquirer
    .prompt([{
        type: "input",
        name: "name",
        message: "What is the department's name?"
    }])
    .then(response => {
        console.log(response);
        con.query(`INSERT INTO department (name) VALUES (?)`,[response.name], 
            function (err, res){
                if (err) console.log(err);
                console.log("department successfully added")

            init()
        })
    })
};

async function addRole() {
    inquirer
    .prompt([{
        type: "input",
        name: "title",
        message: "What is the role title?",
        validate: function(input) {
            if (input ===""){
                console.log("ROLE TITLE REQUIRED");
                return false;
            }else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "salary",
        message: "What is the role's base salary?",
        validate: function(input) {
            if (input ===""){
                console.log("SALARY REQUIRED");
                return false;
            }else{
                return true
            }
        }
    },
    {
        type: "input",
        name: "department_id",
        message: "What is the role's department ID?",
        validate: function(input) {
            if (input ===""){
                console.log("DEPARTMENT ID REQUIRED");
                return false;
            }else{
                return true
            }
        }
    }])
    .then(response => {
        console.log(response);
        con.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, response.department_id], 
            function (err, res){
                if (err) console.log(err);
                console.log("role successfully added")

            init()
        })
    })
};

function updateRole() {
    let employeeList = [];
    let roleList = []
    con.query("SELECT * FROM employee;SELECT * FROM role", function(err, answer) {

        let employees = answer[0]
        let roles = answer[1]
        
            
      for (let i = 0; i < employees.length; i++) {
        let employeeName =
          employees[i].id + " " + employees[i].first_name + " " + employees[i].last_name;
        employeeList.push(employeeName);
      }

      for (let i = 0; i < roles.length; i++) {
        let roleName =
          roles[i].id + " " + roles[i].title;
        roleList.push(roleName);
      }
      
        console.log({employeeList});
        console.log({roleList});

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            message: "select employee to update role",
            choices: employeeList
          },
          {
            type: "list",
            name: "newRole",
            message: "What is the Employee's new Role?",
            choices: roleList
          }
        ])
        .then(response => {

            let employee = response.employee
            let role = response.newRole

            console.log(employee);
            console.log(role);

            let employeeid = employee.slice(0, 1)
            let roleid = role.slice(0, 1)

            console.log(employeeid);
            console.log(roleid);
            
            con.query(`UPDATE employee SET role_id = "${roleid}" WHERE id = "${employeeid}"`,
            function (err, res){
                if (err) console.log(err);
                console.log("role successfully updated")

            init()
            })
        });
    });
}

function removeEmployee() {

    inquirer
    .prompt([{
        type: "input",
        name: "first_name",
        message: "What is the Employee's first name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the Employee's last name?"
    }])
    .then(response => {

        query = `DELETE FROM employee WHERE first_name= ? AND last_name = ?`

        con.query(query, [response.first_name, response.last_name], function(err, res) {
            if (err) console.log(err);
                console.log("employee successfully deleted")

            init()
        })

    })
}


init()
