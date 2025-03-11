## Task 1

Imagine you have a class for managing a library. This class will have a private property to store a list of books, as well as methods to add a book, remove a book, and get information about the presence of a book.

The class should contain a private property #books, which is initialized with an empty array and represents a list of books in the library.

Implement a getter allBooks, which returns the current list of books.

Implement the method addBook(title), which allows you to add a book to the list. If a book with this title already exists in the list, throw an error with an appropriate message.

Implement the method removeBook(title), which allows you to remove a book from the list by title. If a book with this title is not in the list, throw an error with an appropriate message.

Implement the method hasBook(title), which will check the presence of a book in the library and return true or false depending on whether the book is in the list or not.

Implement a constructor that takes an initial list of books (an array) as an argument. Ensure that the supplied array does not contain duplicates; otherwise, throw an error.

### Solution

```javascript
class Library {
  // Class constructor
  constructor(initialBooks = []) {
    // Check that the provided array does not contain duplicates
    const uniqueBooks = [...new Set(initialBooks)];
    if (uniqueBooks.length !== initialBooks.length) {
      throw new Error("The provided array contains duplicates.");
    }
    this.#books = uniqueBooks; // Initialize the private property #books
  }

  // Private property for storing the list of books
  #books;

  // Getter for getting the current list of books
  get allBooks() {
    return this.#books;
  }

  // Method for adding a book to the list
  addBook(title) {
    if (this.hasBook(title)) {
      throw new Error(
        `A book with the title "${title}" already exists in the library.`
      );
    }
    this.#books.push(title); // Add a book to the list
  }

  // Method for removing a book from the list
  removeBook(title) {
    const bookIndex = this.#books.indexOf(title);
    if (bookIndex === -1) {
      throw new Error(
        `Book with the title "${title}" was not found in the library.`
      );
    }
    this.#books.splice(bookIndex, 1); // Remove a book from the list
  }

  // Method for checking if a book is in the library
  hasBook(title) {
    return this.#books.includes(title); // Return true or false
  }
}

// Example of using the Library class
try {
  const library = new Library([
    "1984",
    "War and Peace",
    "To Kill a Mockingbird",
  ]); // Create a new Library object
  console.log("Current list of books:", library.allBooks); // Display the current list of books

  library.addBook("The Master and Margarita"); // Add a new book
  console.log("The list of books after adding:", library.allBooks); // Display the updated list

  library.removeBook("1984"); // Remove a book
  console.log("The list of books after removing:", library.allBooks); // Display the updated list

  console.log(
    "The presence of the book 'War and Peace':",
    library.hasBook("War and Peace")
  ); // Check the presence of the book
  console.log("The presence of the book '1984':", library.hasBook("1984")); // Check the presence of the removed book

  // Try to add a duplicate
  library.addBook("The Master and Margarita"); // This will not cause an error, since the book was added earlier
  library.addBook("1984"); // This will throw an error because the book already exists in the library
} catch (error) {
  console.error(error.message); // Handle errors
}
```

**Class Constructor**

The constructor takes an initial array of books. We use Set to check for duplicates. If the array contains duplicates, an error is thrown.

**Private Property #books:**

This property is used to store the list of books. Private properties are denoted by the # symbol.

**Getter allBooks:**

The getter returns the current list of books from the private property #books.

**Method addBook(title):**

This method adds a book to the list. If a book with the same title already exists, an error is thrown.

**Method removeBook(title):**

This method removes a book from the list by title. If there is no book with the same title, an error is thrown.

**Method hasBook(title):**

This method checks if a book is in the library and returns true or false.

**Example usage:**

We create a new Library object, add and remove books, and check if there are any books. If an error occurs, it is handled and printed to the console.

## Task 2

You are developing a review system for your website. Users can leave reviews, but to prevent messages that are too short or too long, you decide to set some restrictions.

Create an HTML structure with a text field for entering a review, a button for submitting, and a container where the reviews will be displayed.

Write a function that will add a review to the review container. However, if the length of the review entered is less than 50 or more than 500 characters, the function should throw an exception.

When a review is added, it should appear on the page below the previous reviews, not replace them.

```javascript
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: "1",
        text: "Great phone! Battery life is great.",
      },
      {
        id: "2",
        text: "The camera is awesome, the photos look amazing.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: "3",
        text: "Interesting design, but expensive.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: "4",
        text: "I love playing on PS5, the graphics are great.",
      },
    ],
  },
];
```

You can use this initialData array to bootstrap data when your app starts.

### Solution

```javascript
// Function for displaying reviews
function displayReviews() {
  const reviewsContainer = document.getElementById("reviewsContainer");
  reviewsContainer.innerHTML = ""; // Clear the container before adding

  // Loop through all products and their reviews
  initialData.forEach((product) => {
    product.reviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.className = "review";
      reviewElement.textContent = review.text; // Set the review text
      reviewsContainer.appendChild(reviewElement); // Add the review to the container
    });
  });
}

// Function for adding a review
function addReview() {
  const input = document.getElementById("reviewInput").value; // Get the value from the text field
  const errorMessage = document.getElementById("errorMessage"); // Get an element to display the error message

  try {
    // Check the length of the entered review
    if (input.length < 50 || input.length > 500) {
      throw new Error("Review length must be between 50 and 500 characters.");
    }

    // Generate a unique ID for the new review
    const newReviewId = (
      initialData.flatMap((product) => product.reviews).length + 1
    ).toString();

    // Add a new review to the first product (you can change the logic to add to a specific product)
    initialData[0].reviews.push({ id: newReviewId, text: input });

    // Clear the text field and the error message
    document.getElementById("reviewInput").value = "";
    errorMessage.textContent = "";

    // Update the display of reviews
    displayReviews();
  } catch (error) {
    // Display the error message
    errorMessage.textContent = error.message;
  }
}

// Bind the event handler to the button
document
  .getElementById("submitReviewButton")
  .addEventListener("click", addReview);

// Initialize the display of reviews on page load
displayReviews();
```

**HTML structure:**

We create a textarea to enter a review, a button to submit a review, and a container to display the reviews.

A div with the ID errorMessage is used to display error messages.

**JavaScript:**

We use the initialData array to store the initial data about the products and reviews.

**Function displayReviews():**

This function displays all the reviews in a container. It clears the container before adding new reviews and creates div elements for each review.

**Function addReview():**

This function is called when the "Submit Review" button is clicked.

It checks the length of the entered text. If the length is less than 50 or more than 500 characters, an error is thrown.

If everything is OK, the new review is added to the array and the review display is updated.

A unique ID for the new review is generated based on the current number of reviews.

**Event handler:**

We bind an event handler to the button that calls the addReview() function when clicked.
Initialization:

When the page loads, the displayReviews() function is called to display the initial reviews.
