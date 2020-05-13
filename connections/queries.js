const con = require("./dbconnection")

class queries {
    constructor(con) {
        this.con = con;
    }
    allDepartments(){
        return this.con.query(`SELECT * FROM department`)
    }
    allEmployees() {
        return this.con.query(`SELECT * FROM employee`)
    }
    allRoles() {
        return this.con.query(`SELECT * from role`)
    }
}