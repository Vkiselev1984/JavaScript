# Collections and Iterators. Modules

## Task one

Create a mechanism for safely adding metadata to book objects using Symbol.

1. Create unique symbols for metadata: reviews, rating, tags.
2. Implement the addMetadata (add metadata)
   and getMetadata (get metadata) functions.
3. Create a book object, add metadata and output it to the console

Using Symbol.iterator, create a Library object that can be iterated over. Each iteration should return the next book in the library.

1. Create a library object that contains an array of books and has a Symbol.iterator property.
2. Implement a custom iterator for the library object. The iterator should iterate over the books in order.
3. Use a for...of loop to iterate over the books in the library and print them to the console.

### Solution

```javascript
// Create unique symbols for metadata
const reviewSymbol = Symbol("review");
const ratingSymbol = Symbol("rating");
const tagsSymbol = Symbol("tags");
```

S- ymbol is a primitive data type in JavaScript that creates unique identifiers. Each call to Symbol() returns a new unique symbol, even if the arguments passed are the same.
We create three symbols: reviewSymbol, ratingSymbol, and tagsSymbol, which will be used as keys to store book metadata.

- Since symbols are unique, they prevent the possibility of conflicting with other object properties.

```javascript
// Implement functions for adding and getting metadata
function addMetadata(book, metadata) {
  if (metadata.review) {
    book[reviewSymbol] = metadata.review;
  }
  if (metadata.rating) {
    book[ratingSymbol] = metadata.rating;
  }
  if (metadata.tags) {
    book[tagsSymbol] = metadata.tags;
  }
}
```

AddMetadata function takes two arguments: a book object and a metadata object, checks if the metadata object has review, rating, and tags properties:

- if they do, the corresponding values ​​are added to the book object using the generated symbols as keys.

This way, the metadata is added to the book, but cannot be accidentally overwritten or accessed via regular properties.

```javascript
function getMetadata(book) {
  return {
    review: book[reviewSymbol],
    rating: book[ratingSymbol],
    tags: book[tagsSymbol],
  };
}
```

This function returns an object containing the book's metadata.

It extracts metadata values ​​from a book using characters as keys. This allows you to safely access the metadata without worrying about it being overwritten or overwritten.

```javascript
//Create a book object and add metadata
const book = {
  title: "War and Peace",
  author: "Leo Tolstoy",
};

addMetadata(book, {
  review: "This is a great work about life and human destinies.",
  rating: 5,
  tags: ["classic", "novel", "history"],
});
```

Here we create a book object with a title and author.
We then call the addMetadata function, passing in the book object and the metadata object. Metadata is added to the book using symbols.

```javascript
// Output metadata to the console
const metadata = getMetadata(book);
console.log("Book metadata:");
console.log("Review:", metadata.review);
console.log("Rating:", metadata.rating);
console.log("Tags:", metadata.tags);
```

We call getMetadata to get the book's metadata and store it in the metadata variable.

We then print the metadata to the console.

**Advantages of using Symbol**

- Uniqueness: Each symbol is unique, preventing conflicts with other properties of the object.
- Hiddenness: Properties using symbols are not exposed when iterating over the object (e.g. with for...in or Object.keys()), making them "hidden" from normal access.
- Security: This helps avoid accidental overwriting of metadata, as it cannot be accessed via normal keys.

Let's add a collection and iteration to manage books.

```javascript
// Create unique symbols for metadata
const reviewSymbol = Symbol("review"); // Symbol for storing a review
const ratingSymbol = Symbol("rating"); // Symbol for storing a rating
const tagsSymbol = Symbol("tags"); // Symbol for storing tags

// Implement functions for adding and getting metadata
function addMetadata(book, metadata) {
  // Check if there is a review and add it
  if (metadata.review) {
    book[reviewSymbol] = metadata.review;
  }
  // Check if there is a rating and add it
  if (metadata.rating) {
    book[ratingSymbol] = metadata.rating;
  }
  // Check if there are tags and add them
  if (metadata.tags) {
    book[tagsSymbol] = metadata.tags;
  }
}

function getMetadata(book) {
  // Return an object with metadata, retrieving it using symbols
  return {
    review: book[reviewSymbol],
    rating: book[ratingSymbol],
    tags: book[tagsSymbol],
  };
}

// Create a collection of books
const library = [];

// Function for adding a book to the library
function addBookToLibrary(title, author, metadata) {
  const book = { title, author }; // Create a book object
  addMetadata(book, metadata); // Add metadata to the book
  library.push(book); // Add a book to the library
}

// Add several books to the library
addBookToLibrary("War and Peace", "Leo Tolstoy", {
  review: "This is a magnificent work about life and human destinies.",
  rating: 5,
  tags: ["classic", "novel", "history"],
});

addBookToLibrary("1984", "George Orwell", {
  review: "A prophetic novel about totalitarianism.",
  rating: 4,
  tags: ["dystopia", "novel"],
});

// Iterate over the library and output metadata
for (const book of library) {
  const metadata = getMetadata(book); // Get metadata for the book
  console.log(`Book: ${book.title}, Author: ${book.author}`); // Output the title and author of the book
  console.log("Review:", metadata.review); // Display the review
  console.log("Rating:", metadata.rating); // Display the rating
  console.log("Tags:", metadata.tags); // Display the tags
  console.log("------------------------"); // Separator for easier reading
}
```

We create a library array that will hold book objects. This allows us to manage multiple books and their metadata.

The addBookToLibrary function creates a new book object and adds metadata to it using addMetadata. The book is then added to the library array.

We use a for...of loop to loop through all the books in the library. For each book, we get the metadata using getMetadata and print it to the console. This allows us to conveniently view information about each book.

We just have a library array to store books, but if we create a library object that contains a books array and methods to work with it, we can manage the library and its contents in a more structured way.

We use the standard JavaScript iteration mechanism to make the code more readable and concise.

```javascript
// Create unique symbols for metadata
const reviewSymbol = Symbol("review"); // Symbol for storing a review
const ratingSymbol = Symbol("rating"); // Symbol for storing a rating
const tagsSymbol = Symbol("tags"); // Symbol for storing tags

// Implement functions for adding and getting metadata
function addMetadata(book, metadata) {
  if (metadata.review) {
    book[reviewSymbol] = metadata.review;
  }
  if (metadata.rating) {
    book[ratingSymbol] = metadata.rating;
  }
  if (metadata.tags) {
    book[tagsSymbol] = metadata.tags;
  }
}

function getMetadata(book) {
  return {
    review: book[reviewSymbol],
    rating: book[ratingSymbol],
    tags: book[tagsSymbol],
  };
}

// Create a "Library" object
const library = {
  books: [], // An array for storing books

  // Implementation of the iterator
  [Symbol.iterator]: function () {
    let index = 0; // The starting index for iteration
    const books = this.books; // A reference to the array of books

    return {
      next: function () {
        // Check if there is a next book
        if (index < books.length) {
          return { value: books[index++], done: false }; // Return the book and continue iteration
        } else {
          return { done: true }; // End the iteration
        }
      },
    };
  },

  // Method for adding a book to the library
  addBook: function (title, author, metadata) {
    const book = { title, author }; // Create a book object
    addMetadata(book, metadata); // Add metadata to the book
    this.books.push(book); // Add a book to the library
  },
};

// Add books to the library
library.addBook("War and Peace", "Leo Tolstoy", {
  review: "This is a magnificent work about life and human destinies.",
  rating: 5,
  tags: ["classic", "novel", "history"],
});

library.addBook("1984", "George Orwell", {
  review: "A prophetic novel about totalitarianism.",
  rating: 4,
  tags: ["dystopia", "novel"],
});

// Iterating over the library and printing books to the console
for (const book of library) {
  const metadata = getMetadata(book); // Get metadata for the book
  console.log(`Book: ${book.title}, Author: ${book.author}`); // Print the title and author of the book
  console.log("Review:", metadata.review); // Print the review
  console.log("Rating:", metadata.rating); // Print the rating
  console.log("Tags:", metadata.tags); // Print the tags
  console.log("-----------------------"); // Separator for ease of reading
}
```

## Task two

Often when working with DOM, we come across collections of elements that are not standard arrays, but look like them. However, such collections do not have array methods, and this is where
Array.from comes to the rescue. In this task, you will learn how to convert collections of DOM elements to arrays and work with them.
Given html code:

```HTML
<div>Element 1</div>
<div data-active="true">Element 2</div>
<div>Element 3</div>
<div data-active="true">Element 4</div>
```

Write a function that collects all the <div> elements on the page, converts them to an array, and filters only those that have the data-active attribute.
Output the result to the console.

## Solution

To solve this problem, we can use the document.querySelectorAll method to get a collection of all <div> elements on the page. We then convert this collection to an array using Array.from and filter out the elements that have the data-active attribute. Finally, we print the result to the console.

```javascript
function filterActiveDivs() {
  // Get a collection of all <div> elements on the page
  const divElements = document.querySelectorAll("div");

  // Convert the collection to an array
  const divArray = Array.from(divElements);

  // Filter elements that have the data-active attribute
  const activeDivs = divArray.filter((div) => div.hasAttribute("data-active"));

  // Output the result to the console
  console.log(activeDivs);
}

// Call the function
filterActiveDivs();
```

## Task three

Imagine a situation: we have a group of students and we want to track which of them attended which lessons and which teachers taught those lessons.

1. Map will be used to store the mapping between a lesson and a teacher.
2. Set will be used to store the unique lessons each student attended.

### Solution

To implement this task, we can use a Map to store the correspondence between lessons and teachers, and a Set to store the unique lessons that each student attended.

Steps for implementation:

- Create a Map where the keys are the names of the lessons, and the values ​​are the names of the teachers.
- Create an object for each student, which will store a Set with the unique lessons that he or she attended.
- Implement functions for adding lessons and teachers, as well as for tracking student attendance.

```javascript
// Create a Map to store the correspondence between lessons and teachers
const lessonsMap = new Map();

// Function to add a lesson and teacher to the Map
function addLesson(lesson, teacher) {
  lessonsMap.set(lesson, teacher);
}

// Add lessons and teachers
addLesson("Mathematics", "Ivanov I.I.");
addLesson("Physics", "Petrov P.P.");
addLesson("Chemistry", "Sidorov S.S.");

// Create an object for students
const students = {
  Alexey: new Set(),
  Maria: new Set(),
  Dmitry: new Set(),
};

// Function to track student attendance
function addAttendance(student, lesson) {
  if (lessonsMap.has(lesson)) {
    students[student].add(lesson); // Add a lesson to the student's Set
  } else {
    console.log(`Lesson "${lesson}" not found.`);
  }
}

// Add attendance
addAttendance("Alexey", "Mathematics");
addAttendance("Alexey", "Physics");
addAttendance("Maria", "Chemistry");
addAttendance("Dmitry", "Mathematics");
addAttendance("Dmitry", "Physics");
addAttendance("Dmitry", "Physics"); // Try to add a duplicate lesson

// Display the results
console.log("Lessons and teachers:");
lessonsMap.forEach((teacher, lesson) => {
  console.log(`Lesson: ${lesson}, Teacher: ${teacher}`);
});

console.log("\nStudent attendance:");
for (const student in students) {
  console.log(
    `${student} attended lessons: ${Array.from(students[student]).join(", ")}`
  );
}
```

We created lessonsMap, which stores the correspondence between lessons and teachers. Each lesson corresponds to one teacher.

We also created a students object, where the keys are the students' names and the values ​​are a Set that stores the unique lessons they attended.

The addAttendance function takes a student name and a lesson name. If the lesson exists in lessonsMap, it is added to the corresponding student's Set. If the lesson does not exist, an error message is displayed.

Add student attendance by calling addAttendance with the student name and lesson title. Note that the Set automatically excludes duplicate lessons for each student.

Print all lessons and their corresponding teachers, then print which lessons each student attended. To convert the Set to an array, we use Array.from.
