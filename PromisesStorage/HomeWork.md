## Task

Create an interactive web page for leaving and viewing product reviews. Users can add reviews for various products and view the reviews they've added.

Add Review Page:

- A field for entering the product name.
- A text field for the review itself.
- The "Add Review" button, which saves the product review to LocalStorage.

View Reviews Page:

- Shows a list of all products that have been reviewed.
- Clicking on a product name displays a list of all reviews for that product.
- Ability to delete a review (clicking on the "Delete" button next to a review removes that review from LocalStorage).

### Solution

[reviews.html](./reviews.html)

```javascript
// Function for loading reviews from localStorage
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem("productReviews")) || {};
  const productList = document.getElementById("productList");
  productList.innerHTML = ""; // Clear the list before loading

  for (const product in reviews) {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `<strong>${product}</strong>
 <button onclick="deleteProduct('${product}')">Delete product</button>`;

    reviews[product].forEach((review, index) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "review";
      reviewDiv.innerHTML = `${review}
 <button onclick="deleteReview('${product}', ${index})">Delete</button>`;
      productDiv.appendChild(reviewDiv);
    });
    productList.appendChild(productDiv);
  }
}

// Function for adding a review
document.getElementById("addReviewButton").addEventListener("click", () => {
  const productName = document.getElementById("productName").value;
  const reviewText = document.getElementById("reviewText").value;
  const errorMessage = document.getElementById("errorMessage");

  if (!productName || !reviewText) {
    errorMessage.textContent = "Please fill in all fields.";
    return;
  }

  errorMessage.textContent = ""; // Clear the error message

  const reviews = JSON.parse(localStorage.getItem("productReviews")) || {};
  if (!reviews[productName]) {
    reviews[productName] = [];
  }
  reviews[productName].push(reviewText); // Add a new review

  localStorage.setItem("productReviews", JSON.stringify(reviews)); // Save to localStorage
  document.getElementById("productName").value = ""; // Clear the input field
  document.getElementById("reviewText").value = ""; // Clear the review text
  loadReviews(); // Update the list of reviews
});

// Function for deleting a review
function deleteReview(product, index) {
  const reviews = JSON.parse(localStorage.getItem("productReviews"));
  reviews[product].splice(index, 1); // Delete a review by index

  if (reviews[product].length === 0) {
    delete reviews[product]; // Delete the product if it has no reviews
  }

  localStorage.setItem("productReviews", JSON.stringify(reviews)); // Save to localStorage
  loadReviews(); // Update the list of reviews
}

// Function to delete a product
function deleteProduct(product) {
  const reviews = JSON.parse(localStorage.getItem("productReviews"));
  delete reviews[product]; // Delete the product

  localStorage.setItem("productReviews", JSON.stringify(reviews)); // Save to localStorage
  loadReviews(); // Update the list of reviews
}

// Load reviews on page load
loadReviews();
```

**Function loadReviews():**

Loads reviews from localStorage and displays them on the page, creating elements for each product and its reviews.

**Handler for the "Add Review" button:**

When the button is clicked, it checks if all the fields are filled in. If everything is OK, it adds a new review to localStorage and updates the list of reviews.

**Function deleteReview(product, index):**

Deletes a review at an index from the array of reviews for a given product. If a product has no more reviews, it is also deleted from localStorage.

**Function deleteProduct(product):**

Deletes all reviews for a given product from localStorage.

**Loading Reviews:**

When the page loads, the loadReviews() function is called to automatically load and display previously saved reviews.
