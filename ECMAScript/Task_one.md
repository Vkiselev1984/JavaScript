# Finding the Minimum Number in an Array

Given an array const arr = [1, 5, 7, 9]. Using the Math.min method and the spread operator, find the minimum number in the array. The solution should be written on one line.

Hint: Use the Spread operator (...) to convert the array into arguments for the Math.min function. This allows you to find the minimum value in the array on one line.

## Solution

The Math.min() method returns the smallest of the numbers passed to it. If you pass it multiple numbers as arguments, it will return the minimum value among them. For example:

### Math.min

```javascript
Math.min(1, 5, 7, 9); // returns 1
```

### Using the Spread Operator

The spread operator (...) allows us to expand an array into its individual elements. This means that we can transform the array into a list of arguments for a function.

```javascript
const arr = [1, 5, 7, 9];
const minValue = Math.min(...arr); // Use the spread operator to pass array elements as arguments
```

We output the result:

```javascript
const arr = [1, 5, 7, 9];
const minValue = Math.min(...arr);
console.log(minValue); // Output: 1
```
