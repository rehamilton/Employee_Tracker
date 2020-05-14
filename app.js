const inquirer = require("inquirer")
const con = require("./config/dbconnection")
const list = require("./config/lists")

const allEmployeeQuery = `SELECT * FROM employee`;
const allRoleQuery = `SELECT * FROM role`;
const allDepartmentQuery = `SELECT * FROM department`;

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
            "Add Employee",
            "Add Department",
            "Add Role",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
        ]
    }])
    .then(choice => {
        switch(choice.selection) {
            case "View all Employees":
                getEmployees() 
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
            case "Update Employee Manager":
                updateManager()
                return
            case "Exit":
                //add in connection end
                con.end()
                break
        };
    });
};

async function getEmployees () {
    
    con.query(allEmployeeQuery, function(err,result) {
        if (err) throw err;
        console.table(result)

        init()   
    });
};

function getDepartments() {
    
    con.query(allDepartmentQuery, function(err, result){
        if (err) throw err;
        console.table(result)

        init()
    });
};

async function getRoles() {
   
    con.query(allRoleQuery, function(err, result){
        if (err) throw err;
        console.table(result)

        init()
    });
};

// function to add employee
async function addEmployee() {

    con.query(`${allEmployeeQuery};${allRoleQuery}`, function(err, res) {

        let employeeList = list.employeeListPush(res[0])
        let roleList = list.roleListPush(res[1])

        inquirer
        .prompt([{
            type: "input",
            name: "first_name",
            message: "What is the employee's first name?",
            validate: function(input) {
                if (input ===""){
                    return "FIRST NAME REQUIRED";
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
                    return "LAST NAME REQUIRED";
                }else{
                    return true
                }
            }
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: roleList
        },
        {
            type: "list",
            name: "manager",
            message: "What is the employees manager's ID?",
            choices: employeeList
        }])
        .then(response => {

            //Get id's back from employee and role strings
            let managerid = response.manager.split(" ")
            let roleid = response.role.split(" ")

            con.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [response.first_name,response.last_name, roleid[0], managerid[0]],
                function (err, res){
                    if (err) console.log(err);
                    console.log("employee successfully added")

                init()
            });
        });
    });
};

function addDepartment() {
    inquirer
    .prompt([{
        type: "input",
        name: "name",
        message: "What is the department's name?",
        validate: function(input) {
            if (input ===""){
                return "DEPARTMENT NAME REQUIRED";
            }else{
                return true
            }
        }
    }])
    .then(response => {
        console.log(response);
        con.query(`INSERT INTO department (name) VALUES (?)`,[response.name], 
            function (err, res){
                if (err) console.log(err);
                console.log("department successfully added")

            init()
        });
    });
};

function addRole() {

    con.query(allDepartmentQuery, function(err,res) {

        let departmentList = list.departmentListPush(res)

        inquirer
        .prompt([{
            type: "input",
            name: "title",
            message: "What is the role title?",
            validate: function(input) {
                if (input ===""){
                    return "ROLE TITLE REQUIRED";
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
                    return "SALARY REQUIRED";
                }else{
                    return true
                }
            }
        },
        {
            type: "list",
            name: "department",
            message: "Which department does the role belong to?",
            choices: departmentList
        }])
        .then(response => {
            // console.log(response);
            let departmentid = response.department.split(" ")

            con.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [response.title, response.salary, departmentid[0]], 
                function (err, res){
                    if (err) console.log(err);
                    console.log("role successfully added")

                init()
            });
        });
    });
};

async function updateRole() {
    
    //use muliple statement to retrieve info from role table and employee table
    con.query(`${allEmployeeQuery};${allRoleQuery}`, function(err, res) {

        let employeeList = list.employeeListPush(res[0])
        let roleList = list.roleListPush(res[1])

      inquirer
        .prompt([
          {
            //Ask user to choose from employee list
            type: "list",
            name: "employee",
            message: "select employee to update role",
            choices: employeeList
          },
          {
            //ask user to choose from role list
            type: "list",
            name: "newRole",
            message: "What is the Employee's new Role?",
            choices: roleList
          }
        ])
        .then(response => {

            //Get id's back from employee and role strings
            let employeeid = response.employee.split(" ")
            let roleid = response.newRole.split(" ")

            //Update employee table based on employee and role selection using id's
            con.query(`UPDATE employee SET role_id = "${roleid[0]}" WHERE id = "${employeeid[0]}"`,
            function (err, res){
                if (err) console.log(err);
                console.log("role successfully updated")

            init()
            });
        });
    });
};

function updateManager() {
    //declare arrays to be used to store user choices
    

    //use statement to retrieve info from employee table
    con.query(`${allEmployeeQuery}`, function(err, res) {

        let employeeList = list.employeeListPush(res)
        let managerList = list.managerListPush(res)
      
        inquirer
        .prompt([
          {
            //Ask user to choose from employee list
            type: "list",
            name: "employee",
            message: "select employee to update role",
            choices: employeeList
          },
          {
            //ask user to choose manager from employee list
            type: "list",
            name: "manager",
            message: "Who is the Employee's new Manager?",
            choices: managerList
          }
        ])
        .then(response => {

            //Get id's back from employee and manager strings
            let employeeid = response.employee.split(" ")
            let managerid = response.manager.split(" ")

            //Update employee table based on employee and manager selection using id's
            con.query(`UPDATE employee SET manager_id = "${managerid[0]}" WHERE id = "${employeeid[0]}"`,
            function (err, res){
                if (err) console.log(err);
                console.log("manager successfully updated")

            init()
            });
        });
    });
};

function removeEmployee() {

    con.query(allEmployeeQuery, function(err,res) {

        let employeeList = list.employeeListPush(res)

        inquirer
        .prompt([{
            type: "list",
            name: "employee",
            message: "Which Employee would you ike to delete?",
            choices: employeeList
        }])
        .then(response => {

            let employeeid = response.employee.split(" ")

            //remove employee only if first and last name match inputs
            con.query(`DELETE FROM employee WHERE id= ?`, [employeeid[0]], function(err, res) {
                if (err) console.log(err);
                    console.log("employee successfully deleted")

                init()
            });
        });
    });
};

init()