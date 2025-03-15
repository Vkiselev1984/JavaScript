# Change the style of an element after a specified time

Implement a function that changes the style of an element with a delay:

## changeStyleDelayed function

**Description:**

- The function takes the element identifier (id) and the delay time in milliseconds (delay).
- After the delay time has elapsed, the function should change the style of the element.

## Solution

```javascript
function changeStyleDelayed(id, delay) {
  // Find an element by ID
  const element = document.getElementById(id);

  // Check if the element exists
  if (!element) {
    console.error(`Element with id '${id}' not found.`);
    return; // If the element is not found, exit the function
  }

  // Set a timer with a specified delay
  setTimeout(() => {
    // Change the element style
    element.style.backgroundColor = "lightblue"; // Example of changing the style
    element.style.color = "white"; // Change the text color
    element.style.padding = "10px"; // Add padding
    element.style.borderRadius = "5px"; // Round the corners
  }, delay);
}

// Example of using the function
changeStyleDelayed("myElement", 2000); // After 2 seconds, changes the style of the element with id 'myElement'
```

1. Finding an element:

- We use document.getElementById(id) to find an element by the passed id.

2. Checking if an element exists:

- If the element is not found, we print an error message to the console and exit the function.

3. Setting a timer:

- We use setTimeout to execute the style change code after the specified number of milliseconds (delay).

4. Changing the style:

- Inside the setTimeout callback, we change the style of the element. In this example, we change the background color, text color, add padding, and round the corners.

To use this function in HTML, you need to create an element with the specified ID. For example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Change Style Example</title>
    <style>
      #myElement {
        width: 200px;
        text-align: center;
        margin: 20px;
        padding: 10px;
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    <div id="myElement">Hello, change my style!</div>
    <script>
      function changeStyleDelayed(id, delay) {
        const element = document.getElementById(id);
        if (!element) {
          console.error(`Element with id '${id}' not found.`);
          return;
        }

        setTimeout(() => {
          element.style.backgroundColor = "lightblue";
          element.style.color = "white";
          element.style.padding = "10px";
          element.style.borderRadius = "5px";
        }, delay);
      }

      // Example of using the function
      changeStyleDelayed("myElement", 2000); // Changes the style after 2 seconds
    </script>
  </body>
</html>
```
