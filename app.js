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

const myQueryText = "";

function runQuery(myQueryText) {
    const  myQuery = con.query(myQueryText, function(err,res) {
        if (err) throw err;
        return res
    })
}

function getStarted() {
    inquirer
    .prompt([{
        type: "list",
        name: "selection",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "View Employees by Department",
            "View Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager"
        ]
    }])
    .then(choice => {
        switch(choice.selection) {
            case "View all Employees":
                viewAll()
                return;
            case "View Employees by Department":
                employeeDepartment()
                return;
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
        }
    }) 
}

function viewAll () {

    getSQLquery = function () {
        return `SELECT * FROM employee`
    };

    con.query(getSQLquery(), function(err,result) {
        if (err) throw err;
        console.table(result)
    });

};

function addEmployee() {
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

getStarted()
