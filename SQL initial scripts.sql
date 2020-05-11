DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NULL,
    salary DECIMAL NULL,
    department_id INT,
    CONSTRAINT FK_department_id FOREIGN KEY (department_id)
        REFERENCES department (id),
	PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id),
    CONSTRAINT FK_role_id FOREIGN KEY (role_id)
        REFERENCES role (id),
    CONSTRAINT FK_manager_id FOREIGN KEY (manager_id)
        REFERENCES employee (id)
);
