USE employee_trackerDB;

INSERT INTO employee_trackerdb.department (name)
VALUES ("Kitchen"), ("Garden"), ("Collections");

INSERT INTO employee_trackerdb.role (title, salary, department_id)
VALUES 
("Chef", "100000", "1"), ("Sous Chef", "80000", "1"), ("Kitchen Hand", "50000", "1"), 
("Head Gardener", "100000", "2"), ("Gardener", "60000", "2"), ("Lawn Maintenance", "50000", "2"),
("Curator", "150000", "3"), ("Artist", "90000", "3"), ("Sculptor", "80000", "3");

INSERT INTO employee_trackerdb.employee (first_name, last_name, role_id, manager_id)
VALUES 
("Anthony", "Bourdain", "1", "1"), ("Gordon", "Ramsay", "2", "1"), ("Jamie", "Oliver", "3", "1"), 
("Alan", "Titschmarsh", "4", "4"), ("Monty", "Don", "0005", "4"), ("Charlie", "Albone", "6", "4"),
("Hans-Ulrich", "Obrist", "7", "7"), ("Frida", "Kahlo", "8", "7"), ("Jamie", "McCartney", "9", "7");