
const list ={
    employeeListPush: function(employees) {

        let employeeList = [];


        for (let i = 0; i < employees.length; i++) {
            let employeeName =
              employees[i].id + " " + employees[i].first_name + " " + employees[i].last_name;
            employeeList.push(employeeName);
        };
    
        return employeeList
    },
    roleListPush: function(roles) {

        let roleList = [];

        //turn query return into strings and place in array for user to choose from - roles
        for (let i = 0; i < roles.length; i++) {
            let roleName =
              roles[i].id + " " + roles[i].title;
            roleList.push(roleName);
        };
    
        return roleList
    },
    managerListPush: function(managers) {

        let managerList = [];

        //turn query return into strings and place in array for user to choose from - managers
        for (let i = 0; i < managers.length; i++) {
            let managerName =
                managers[i].id + " " + managers[i].first_name + " " + managers[i].last_name;
            managerList.push(managerName);
        };
    
        return managerList
    },
    departmentListPush: function(departments) {

        let departmentList = [];

        //turn query return into strings and place in array for user to choose from - managers
        for (let i = 0; i < departments.length; i++) {
            let departmentName =
                departments[i].id + " " + departments[i].name;
            departmentList.push(departmentName);
        };
    
        return departmentList
    }

}


module.exports = list