# Book Library Management

Implement a Book class that will represent a book with the following properties and methods:

- Properties:
  - title - a string representing the title of the book.
  - author - a string representing the name of the author of the book.
  - pages - a number representing the number of pages in the book.
- Methods:
  - displayInfo() - a method that displays information about the book in the format: Title: {title}, Author: {author}, Pages: {pages}.

## Solution

```Js
class Book {
// Constructor of the Book class
constructor(title, author, pages) {
this.title = title; // Title of the book
this.author = author; // Author of the book
this.pages = pages; // Number of pages
}

// Method for displaying information about the book
displayInfo() {
console.log(`Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}`);
}
}

// Example of using the class
const book1 = new Book("1984", "George Orwell", 328);
book1.displayInfo(); // Output: Title: 1984, Author: George Orwell, Pages: 328
```

1. Class Definition: We create a Book class using the class keyword.

2. Constructor: The constructor method is called when a new instance of the class is created. It takes three parameters: title, author, and pages, which initialize the corresponding properties of the class.

3. Properties: this.title, this.author, and this.pages are properties of the class instance that store information about the book.

4. displayInfo Method: This method prints information about the book in a given format using console.log.

5. Example Usage: We create a new instance of the Book class by passing the book title, author name, and number of pages to the constructor. Then we call the displayInfo method, which prints information about the book to the console.
