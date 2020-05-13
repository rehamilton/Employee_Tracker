startPrompt = [
    {
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
            "Update Employee Manager",
            "Exit"
        ]
    }
]

module.exports = startPrompt



// async function getDepartmentID () {
    
//     let departments = await getDepartments()

//     console.log(departments);

//     // inquirer.prompt([{
//     //     type: "list",
//     //     name: "selection",
//     //     message: "What would you like to do?",
//     //     choices: departments
//     // }]).then(choice => {
        
        
//     //     deptID = `SELECT id FROM department WHERE name = "${choice.selection}"`
        
//     //     // query = `SELECT * FROM department
//     //     // RIGHT JOIN role
//     //     // ON ${dpetID} = department_id`

//     //     console.log(choice);
//     //     console.log({deptID});

//     //     con.query(deptID, function(err,result) {
//     //         if (err) throw err;
//     //         console.log(result);

//     //         getRoles(result)
       
//     //     });
//     // })

// };