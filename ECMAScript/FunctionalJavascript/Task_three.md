# Recursive Finding of an Element by Class

Write a recursive function findElementByClass that takes the root element of a DOM tree and a class name as arguments and returns the first element found with the specified class in that tree.

The findElementByClass function recursively traverses the DOM tree, starting from the root element. It checks each element for the specified class and returns it if it finds a match. If no element with the specified class is found, the function returns null.

## Solution

To implement a recursive search for an element by class in the DOM tree, we can write a function findElementByClass that will take the root element and the class name. The function will traverse all child elements, checking for the presence of the specified class. If an element with the required class is found, it will be returned; if not, null will be returned.

Here's the implementation of the findElementByClass function:

```javascript
function findElementByClass(rootElement, className) {
  // Check if the current element is an element with the desired class
  if (rootElement.classList && rootElement.classList.contains(className)) {
    return rootElement; // Return the element if it matches
  }

  // Loop through all child elements
  for (let i = 0; i < rootElement.children.length; i++) {
    const result = findElementByClass(rootElement.children[i], className); // Recursively call for each child
    if (result) {
      return result; // If the element was found, return it
    }
  }

  return null; // If the element was not found, return null
}
```

1. Checking the current element:

First we check if the current element (rootElement) contains the class we are looking for using classList.contains(className). If so, we return that element.

2. Recursively iterating over child elements:

- If the current element does not contain the desired class, we iterate over all its children using a for loop.
- For each child, we call findElementByClass recursively.

3. Returning the result:

- If the recursive call returns an element (not null), we return it.
- If after traversing all child elements, an element with the required class is not found, we return null.

Let's assume we have the following HTML structure:

```html
<div id="root">
  <div class="container">
    <div class="item">Item 1</div>
    <div class="item target">Item 2</div>
  </div>
  <div class="footer">
    <div class="item">Item 3</div>
  </div>
</div>
```

You can use the findElementByClass function as follows:

```javascript
const root = document.getElementById("root");
const foundElement = findElementByClass(root, "target");

if (foundElement) {
  console.log("Element found:", foundElement);
} else {
  console.log("Element not found");
}
```
