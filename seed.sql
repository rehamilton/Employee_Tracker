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
("Bourdain", "Anthony", "1", "1"), ("Ramsay", "Gordon", "2", "1"), ("Oliver", "Jamie", "3", "1"), 
("Titschmarsh", "Alan", "4", "4"), ("Don", "Monty", "0005", "4"), ("Albone", "Charlie", "6", "4"),
("Obrist", "Hans-Ulrich", "7", "7"), ("Kahlo", "Frida", "8", "7"), ("McCartney", "Jamie", "9", "7");