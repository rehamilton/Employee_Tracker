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
            "Update Employee",
            // "View Employees By Manager",
            "Add Employee",
            "Add Department",
            "Add Role",
            // "Remove Employee",
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
            case "View Employees By Manager":
                employeeManager()
                return
            case "Add Employee":
                addEmployee()
                return
            case "Add Department":
                addDepartment()
                return
            case "Add Role":
                addRole()
                return
            case "Update Employee":
                updateEmployee()
                return
            case "Remove Employee":
                removeEmployee()
                return
            case "Update Employee Role":
                updateRole()
                return
            case "Update Employee Manager":
                updateManager()
                return
            case "Exit":
                //add in connection end
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

    console.log(getSQLquery);
    
    con.query(getSQLquery(), function(err, result){
        if (err) throw err;

        console.table(result)

        init()
    });

};

// function to add employee
async function addEmployee() {

    const employee = await queries.allEmployees();
    const employeeList = departments.map(({id, first_name, last_name}) => ({
        name: first_name + " " + last_name,
        value: id
    }))

    console.log(employeeList);

    inquirer
    .prompt([{
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?"
    },
    {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?"
    },
    {
        type: "input",
        name: "role_id",
        message: "What is the employee's role ID?"
    },
    {
        type: "input",
        name: "manager_id",
        message: "What is the employees manager's ID?"
    }])
    .then(response => {
        console.log(response);
        con.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.first_name}", "${response.last_name}", "${response.role_id}", "${response.manager_id}")`, 
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
        con.query(`INSERT INTO department (name) VALUES ("${response.name}")`, 
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
        message: "What is the role title?"
    },
    {
        type: "input",
        name: "salary",
        message: "What is the role's base salary?"
    },
    {
        type: "input",
        name: "department_id",
        message: "What is the role's department ID?"
    }])
    .then(response => {
        console.log(response);
        con.query(`INSERT INTO role (title, salary, department_id) VALUES ("${response.title}", "${response.salary}", "${response.department_id}")`, 
            function (err, res){
                if (err) console.log(err);
                console.log("role successfully added")

            init()
        })
    })
};

function updateEmployee() {
    let employeeList = [];
    con.query("SELECT * FROM employee", function(err, answer) {
      // console.log(answer);
      for (let i = 0; i < answer.length; i++) {
        let employeeName =
          answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
        employeeList.push(employeeName);
      }
      
  
      inquirer
        .prompt([
          {
            type: "list",
            name: "updateEmpRole",
            message: "select employee to update role",
            choices: employeeList
          },
          {
            type: "list",
            name: "newrole",
            message: "select new role",
            message: "What is the Employee's new Role?"

          }
        ])
        .then();
    });
  }

init()
