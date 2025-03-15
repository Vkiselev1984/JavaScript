# Sending data to the server

Implement a function to send user data to the server:

Function saveUserData

**Description:**

- The function takes an object with user data and uses fetch to send the data to the remote server.
- The function returns a promise that resolves if the data is successfully sent.
- If the request is unsuccessful, the promise should be rejected with an appropriate error message.

**Hint:**

- Use the POST method and set the Content-Type header to application/json.
- The object with user data should be serialized into a JSON string using JSON.stringify().

## Solution:

```javascript
async function saveUserData(userData) {
  const url = "https://jsonplaceholder.typicode.com/users"; // Example URL for sending user data

  try {
    const response = await fetch(url, {
      method: "POST", // Specify the POST method
      headers: {
        "Content-Type": "application/json", // Specify the Content-Type header
      },
      body: JSON.stringify(userData), // Serialize the object to a JSON string
    });

    if (!response.ok) {
      // If the response is not successful (e.g. 400, 404)
      throw new Error(`Error saving user data: ${response.statusText}`);
    }

    const result = await response.json(); // Extract the result from the response
    return result; // Return the result
  } catch (error) {
    // Handle any errors that may occur
    return Promise.reject(error.message); // Reject the promise with an error message
  }
}

// Example of using the function
const userData = {
  name: "John Doe",
  age: 30,
  email: "johndoe@example.com",
};

saveUserData(userData)
  .then((result) => {
    console.log("User data saved successfully:", result); // Print the result
  })
  .catch((error) => {
    console.error("Error:", error); // Handle errors
  });
```

1. Asynchronous function:

- The saveUserData function is declared as asynchronous using the async keyword, which allows us to use await inside the function.

2. URL generation:

- We create a URL to send the data to. In this case, the URL is https://jsonplaceholder.typicode.com/users, which is a fake API for testing.

3. Request with fetch:

- We call fetch(url, { ... }), passing in an object with the request settings.
- We specify the POST method, the Content-Type header as application/json, and serialize the user data object using JSON.stringify(userData).

4. Checking the response:

- If response.ok returns false, it means that an error occurred (e.g. 400 or 404). In this case, we throw an error with an appropriate message.

5. Retrieving the result:

- If the response is successful, we retrieve the result using response.json() and return it.

6. Error handling:

- In the catch block, we handle any errors that may occur and reject the promise with an error message.

7. Usage example

- We create a userData object with user data and call saveUserData passing this object.
- If the data is successfully saved, we print the result to the console. If an error occurred, we print the error message.
