# Managing students list

Implement a Student class that will represent a student with the following
properties and methods:

- Properties:
  - name - a string representing the name of the student.
  - age - a number representing the age of the student.
  - grade - a string representing the grade the student is in.
- Methods:
  - displayInfo() - a method that displays information about the student in the format: Name: {name}, Age: {age}, Grade: {grade}.

## Solution

```Js
class Student {
// Constructor of the Student class
constructor(name, age, grade) {
this.name = name; // Name of the student
this.age = age; // Age of the student
this.grade = grade; // Class the student is in
}

// Method for displaying information about the student
displayInfo() {
console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
}
}

// Example of using the class
const student1 = new Student("John Smith", 16, "10th grade");
student1.displayInfo(); // Output: Name: John Smith, Age: 16, Grade: 10th grade

const student2 = new Student("Jane Doe", 17, "11th grade");
student2.displayInfo(); // Output: Name: Jane Doe, Age: 17, Grade: 11th grade
```

1. Class Definition: We create a Student class using the class keyword.

2. Constructor: The constructor method is called when a new instance of the class is created. It takes three parameters: name, age, and grade, which initialize the corresponding properties of the class.

3. The properties: this.name, this.age, and this.grade are the properties of the class instance that store the student information.

4. displayInfo Method: This method prints the student information in the given format using console.log.

5. Example Usage: We create two instances of the Student class by passing the student's name, age, and grade to the constructor. Then we call the displayInfo method, which prints the information about each student to the console.
