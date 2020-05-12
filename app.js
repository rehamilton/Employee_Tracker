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
        name: "category",
        message: "What category would you like to post your item to?",
        default: "electronics"
    },
    {
        type: "input",
        name: "item_name",
        message: "What item would you like to post?",
        default: "mobile phone"
    },
    {
        type: "input",
        name: "starting_bid",
        message: "What would you like the starting bid to be?",
        default: "5"
    },])
    .then(response => {
        console.log(response);
        con.query(`INSERT INTO auctions (item_name, category, starting_bid) VALUES ("${response.item_name}", "${response.category}", "${response.starting_bid}")`, 
            function (err, res){
                if (err) console.log(err);
                return res;
        })
    })
}

init()
