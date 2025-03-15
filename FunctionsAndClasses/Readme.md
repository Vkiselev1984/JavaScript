# Advanced work with functions and classes. Error handling

## Global object. Function object.

### Global object

Global object — stores functions and variables that can be accessed in any part of the program.

By default, these are built-in objects. For example, in a browser, this is the window object, and in Node.js, this is the global object. You can access the window object either directly or using its self and frames properties:

```js
window.alert("Hello"); // alert is a function in the window object
window.frames[0].alert("Hello"); // alert is a function in the first frame
```

The latest standards introduce a new global object, globalThis, to standardize the way global objects are accessed. In a browser, it will return the window object.

The legacy var variable declaration statement created variables in the global object. Functions declared with the function keyword are also created with a window binding.

```js
var x = 1; // x is a property of the window object
function foo(x) {
  // foo is a property of the window object
  return 2;
}

console.log(window.x); // 1
console.log(foo(1)); // 2
```

### Function object

> 💡 The Object type includes not only functions, but also other non-primitive objects of the language. For example, arrays, classes, promises, events, and others.

Functions have operations that can be performed on objects: passing by reference, adding properties, methods, and so on.

Functions have two special properties: name, with which we can get the name of the function, and length, which allows us to get the number of arguments described during the declaration without taking into account the rest of the arguments. In addition, we can define our own properties.

#### name property

The name property can be used to identify the function in debugging tools or error messages. It is read-only and cannot be changed by the assignment operator:

```js
function foo() {}
console.log(foo.name); // foo
```

If you assign an anonymous function to a variable, the name of that variable is used as the name property.

Anonymous function expressions created using the function keyword or arrow functions will have "" (empty string) as the name.

```js
function() {} // name: ""
var foo = function() {}; // name: "foo"
var foo = () => {}; // name: ""
```

#### length Property

The length property indicates how many arguments the function expects, i.e. the number of
formal parameters. This number does not include rest parameters and includes only the parameters before the first parameter with a default value.

In contrast, arguments.length is local to the function and indicates the number of arguments actually passed to the function.

> 💡 The arguments array is a local array available in all functions except arrow functions. It contains every argument the function was called with, starting from 0.

```js
function foo(x, y, z) {
  console.log(arguments.length); // 3
  console.log(foo.length); // 3
}

foo(1, 2, 3); // 3
```

### Features of arrow functions

Many people think of arrow functions as syntactic sugar for writing anonymous function expressions. In most cases, this is true, but there are three features of arrow functions that make them special.

- Arrow functions do not have their own this
- Arrow functions do not have an arguments array
- For single-line arrow functions without expressions in curly braces, return is automatically substituted for the expression

Let's look at an example:

```js
const sum = (a, b) => a + b;

console.log(sum(sum.lenght);

sum(1,2);
```

Here we have written a simple arrow function and its call. The expression after the arrow has automatically become a return expression. If we had written this expression in curly brackets, we would have had to add return before the expression to get the value.

From the previous chapter, we know that the arguments array is not available to us. But we can use the length property to get the number of arguments, it will work great.

Arrow functions do not have their own execution context, and when using this inside an arrow function, undefined will be returned. When trying to bind the context of an arrow function via the bind(this) method, the context above will be taken, which will inevitably lead to errors. Arrow functions also cannot be called as constructors with the new operator.
