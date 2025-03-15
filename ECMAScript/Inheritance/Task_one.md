# Company personnel management

Implement classes for managing company employees:

Employee class

- Properties:
  - name — a string representing the employee's name.
- Methods:
  - displayInfo() — a method that displays information about the employee in the format: Name: {name}.

Manager class

- Inherits: Employee class.
- Additional properties:
  - department — a string representing the department in which the manager works.
- Overridden methods:
  - displayInfo() — a method that overrides the parent class's displayInfo() method and displays information about the manager in the format: Name: {name}, Department: {department}.

## Solution

```Js
// Employee class
class Employee {
constructor(name) {
this.name = name; // Employee name
}

// Method for displaying employee information
displayInfo() {
console.log(`Name: ${this.name}`); // Display the employee name
}
}

// Manager class that inherits from Employee
class Manager extends Employee {
constructor(name, department) {
super(name); // Call the parent class constructor
this.department = department; // Department the manager works in
}

// Override the displayInfo method
displayInfo() {
console.log(`Name: ${this.name}, Department: ${this.department}`); // Display the manager's name and department
}
}

// Example of using classes
const employee = new Employee("John Smith");
employee.displayInfo(); // Output: Name: John Smith

const manager = new Manager("Jane Doe", "Sales");
manager.displayInfo(); // Output: Name: Jane Doe, Department: Sales
```

1. Employee Class:

- The constructor takes the employee's name and initializes the name property.
- The displayInfo method displays the employee's name in the format Name: {name}.

2. Manager Class:

- This class inherits from Employee using the extends keyword.
- In the constructor of the Manager class, the super(name) constructor of the parent class is called to initialize the name.
- In addition, the department property is set in the constructor to represent the department in which the manager works.
- The displayInfo method is overridden to display information in the format Name: {name}, Department: {department}.

3. Usage example:

- An instance of the Employee class is created and the displayInfo method is called, which displays the name.
- An instance of the Manager class is created and the displayInfo method is also called, which displays the name and department.
