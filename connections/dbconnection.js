const mysql = require("mysql");
const inquirer = require("inquirer")



const con = mysql.createConnection({
    host: 'localhost', // where mysql is located 
    user: 'root', // your mysql username
    password: 'root', // your mysql password,
    database: "employee_trackerdb",
    multipleStatements: true
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con