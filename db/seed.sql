USE employee_trackerDB;

INSERT INTO employee_trackerdb.department (name)
VALUES ("Kitchen"), ("Garden"), ("Collections");

INSERT INTO employee_trackerdb.role (title, salary, department_id)
VALUES 
("Chef", "100000", "001"), ("Sous Chef", "80000", "001"), ("Kitchen Hand", "50000", "001"), 
("Head Gardener", "100000", "002"), ("Gardener", "60000", "002"), ("Lawn Maintenance", "50000", "002"),
("Curator", "150000", "3"), ("Artist", "90000", "3"), ("Sculptor", "80000", "3");

INSERT INTO employee_trackerdb.employee (first_name, last_name, role_id, manager_id)
VALUES 
("Anthony", "Bourdain", "001", "001"), ("Gordon", "Ramsay", "002", "001"), ("Jamie", "Oliver", "003", "001"), 
("Alan", "Titschmarsh", "004", "004"), ("Monty", "Don", "005", "004"), ("Charlie", "Albone", "006", "004"),
("Hans-Ulrich", "Obrist", "007", "007"), ("Frida", "Kahlo", "008", "007"), ("Jamie", "McCartney", "009", "007");