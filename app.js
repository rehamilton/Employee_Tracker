const mysql = require("mysql");
const inquirer = require("inquirer")



const con = mysql.createConnection({
    host: 'localhost', // where mysql is located 
    user: 'root', // your mysql username
    password: 'root', // your mysql password,
    database: "employee_trackerdb"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

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
            "View Employees by Department",
            "View Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
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
            case "View Employees by Department":
                getDepartmentID();
                break;
            case "View Employees By Manager":
                employeeManager()
                return
            case "Add Employee":
                addEmployee()
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

async function getDepartmentID () {
    
    let departments = await getDepartments()

    console.log(departments);

    // inquirer.prompt([{
    //     type: "list",
    //     name: "selection",
    //     message: "What would you like to do?",
    //     choices: departments
    // }]).then(choice => {
        
        
    //     deptID = `SELECT id FROM department WHERE name = "${choice.selection}"`
        
    //     // query = `SELECT * FROM department
    //     // RIGHT JOIN role
    //     // ON ${dpetID} = department_id`

    //     console.log(choice);
    //     console.log({deptID});

    //     con.query(deptID, function(err,result) {
    //         if (err) throw err;
    //         console.log(result);

    //         getRoles(result)
       
    //     });
    // })

};


async function addEmployee() {
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

init()
