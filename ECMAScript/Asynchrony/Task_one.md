# Getting user data

Implement an asynchronous function to get user data from a remote server:

## getUserData function

**Description:**

1. The function takes a user ID as an argument and uses fetch to get data from the remote
   server.
2. The function returns a promise that resolves with the user data object if the request was successful.
3. If the user with the specified ID is not found, the promise should be
   rejected with an appropriate error message.

**Sequence of actions:**

1. Call fetch, passing the URL with the desired user ID.
2. If the response is successful (code 200), retrieve the data using
   response.json().
3. Return the user data object.
4. If the response is not successful, reject the promise with an error message.

## Solution

```javascript
async function getUserData(userId) {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`; // Example URL for getting user data

  try {
    const response = await fetch(url); // Make a request to the server

    if (!response.ok) {
      // If the response is not successful (e.g. 404)
      throw new Error(`User with ID ${userId} not found`); // Throw an error
    }

    const userData = await response.json(); // Extract data from the response
    return userData; // Return an object with user data
  } catch (error) {
    // Handle any errors that may occur
    return Promise.reject(error.message); // Reject the promise with an error message
  }
}

// Example of using the function
getUserData(1)
  .then((user) => {
    console.log("User data:", user); // Display user data
  })
  .catch((error) => {
    console.error("Error:", error); // Handle errors
  });

getUserData(999) // Example with a non-existent ID
  .then((user) => {
    console.log("User data:", user);
  })
  .catch((error) => {
    console.error("Error:", error); // Expect the error "User with ID 999 not found"
  });
```

1. Asynchronous function:

- The getUserData function is declared as asynchronous using the async keyword, which allows us to use await inside the function.

2. URL generation:

- We create a URL for the request using the user ID.

3. Request using fetch:

- We call fetch(url) to make an HTTP request to the server.

4. Checking the response:

- If response.ok returns false, it means that an error occurred (e.g. 404). In this case, we throw an error with an appropriate message.

5. Fetching data:

- If the response is successful, we fetch the data using response.json() and return it.

6. Error handling:

- In the catch block, we handle any errors that may occur and reject the promise with an error message.

7. Usage example

- We call getUserData with the ID 1 and print the user data if the request is successful.
- We also call getUserData with a non-existent ID of 999 to demonstrate error handling.
