# Creating a counter

Write a createCounter function that creates a counter and returns an object with three methods: increment, decrement, and getValue. The increment method should increment the counter by 1, the decrement method should decrement the counter by 1, and the getValue method should return the current counter value. The counter value should only be accessible through the object's methods, not directly.

The createCounter function returns an object with methods to increment and decrement the counter. The private count variable is only accessible through the object's methods, which ensures data encapsulation.

## Solution

To create a createCounter function that returns an object with a counter and methods to manage it, we can use closures. Closures allow us to create private variables that are not accessible from the outside, but are accessible to the object's methods.

### Implementation of the createCounter function

```javascript
function createCounter() {
  let count = 0; // Private variable to store the counter value

  return {
    increment: function () {
      count += 1; // Increment the counter value by 1
    },
    decrement: function () {
      count -= 1; // Decrement the counter value by 1
    },
    getValue: function () {
      return count; // Return the current counter value
    },
  };
}
```

1. We declare a function createCounter that takes no arguments.

2. Inside the function, we create a variable called count, which is initialized to 0. This variable is not accessible from the outside, which ensures encapsulation.

3. The function returns an object with three methods: increment, decrement and getValue.

- increment method: Increments the value of count by 1.
- decrement method: Decreases the value of count by 1.
- getValue method: Returns the current value of count.

4. Now let's create an instance of the counter and test it:

```javascript
function createCounter() {
  let count = 0;

  return {
    increment: function () {
      count += 1;
    },
    decrement: function () {
      count -= 1;
    },
    getValue: function () {
      return count;
    },
  };
}

// Create a counter instance
const counter = createCounter();

// Check the initial value of the counter
console.log(counter.getValue()); // Expected: 0

// Increment the counter
counter.increment();
counter.increment();
console.log(counter.getValue()); // Expected: 2

// Decrement the counter
counter.decrement();
console.log(counter.getValue()); // Expected: 1

// Decrement the counter again
counter.decrement();
console.log(counter.getValue()); // Expected: 0

// Increment the counter again
counter.increment();
console.log(counter.getValue()); // Expected: 1
```
