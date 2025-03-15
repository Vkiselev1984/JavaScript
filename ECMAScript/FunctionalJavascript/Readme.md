# Functional Javascript

## Spread, rest operator

With the ES2015 standard, we have access to very useful tools for working with arrays - these are the spread and rest operators, as well as destructuring.

## Spread operator

Spread (from English "expand") is an operator of expansion, or in other words, distribution of data from an array into atomic elements. That is, we can take an array and extract all its elements as separate variables, this is sometimes necessary when we want to pass multiple arguments to a function or want to transfer elements of one array to another, for this it is necessary to put an ellipsis (spread operator) before the array.

Let's look at some examples:

```javascript
const studentsGroup1PracticeTime = [
{
firstName: "Ivanov",
practiceTime: 56
},
{
firstName: "Petrov",
practiceTime: 120
},
{
firstName: "Sidorov",
practiceTime: 148
},
{
firstName: "Belkin",
practiceTime: 20
},
{
firstName: "Avdeev",
practiceTime: 160
}
];
const studentsGroup2PracticeTime = [
{
firstName: "Mankov",
practiceTime: 87
3
},
{
firstName: "Kistin",
practiceTime: 133
},
{
firstName: "Kotlyarov",
practiceTime: 140
},
{
firstName: "Peskov",
practiceTime: 10
},
];
// Let's write a not very convenient, but exponential function that can accept an unlimited number of arguments and find the maximum among them. The function should be called like this:
const maximum = findMax(4, 7, 10);
function findMax() {
const values ​​= arguments; // arguments is a variable available inside each function that contains all the arguments passed to the function. It is a pseudo-array.

let maxValue = -Infinity;

// Since arguments is a pseudo-array, we can't use new array methods like forEach or reduce on it, so we'll iterate the old-fashioned way.

for (let index = 0; index < values.length; index++) {
if (values[index] > maxValue) maxValue = values[index];
}
return maxValue;
};

// We should only be passing numbers to our function, and our arrays should contain objects, so first we'll create arrays with only the students' completed time values.

const group1PracticeTime = studentsGroup1PracticeTime.map((student) => student.practiceTime);

const group2PracticeTime = studentsGroup2PracticeTime.map((student) => student.practiceTime);

// Now we can call our function to find the maximum value. It accepts multiple numeric arguments, and we have only an array, so the spread operator will come in handy here.

const maxTimeFromGroup1 = findMax(...group1PracticeTime); // ...group1PracticeTime - will pull all the elements from the array and pass them to the function as separate variables.
// This is similar to the ugly and inconvenient notation:
// findMax(group1PracticeTime[0], group1PracticeTime[1], group1PracticeTime[2], group1PracticeTime[3], group1PracticeTime[4])

console.log(maxTimeFromGroup1); // 160

const maxTimeFromGroup2 = findMax(...group2PracticeTime);

console.log(maxTimeFromGroup2); // 140

// Let's also find the maximum time worked among the two groups. We can do this by passing the data of both arrays to the function like this:
// findMax(...group1PracticeTime, ...group2PracticeTime);
// Or we can combine two arrays into one - this is a very common operation and the spread operator is very helpful in this.

const bothGroupsTime = [...group1PracticeTime, ...group2PracticeTime];

// To combine two arrays, we need to pull their elements into one common array, so we declare a new array, and as its elements we make the spread of the elements of the first and second arrays. We could also add other elements to it.

const maxTimeBothGroups = findMax(...bothGroupsTime);
console.log(maxTimeBothGroups); // 160
```

## Rest operator

Rest operator (from English rest, remaining) - allows you to collect the remaining arguments of a function into an array. It sounds a little strange, but this operator allows you not to list all the arguments of a function as separate variables, but to get them all in one array. To use it, in a function that takes several arguments, you need to list the necessary arguments, and write all the remaining ones that we want to collect into one array as ... <array name>. Often they write ...rest. Let's rewrite our previous example using the rest operator and thereby get rid of the pseudo-array arguments.

```javascript
const studentsGroup1PracticeTime = [
{
firstName: "Ivanov",
practiceTime: 56
},
{
firstName: "Petrov",
practiceTime: 120
},
{
firstName: "Sidorov",
practiceTime: 148
},
{
firstName: "Belkin",
practiceTime: 20
},
{
firstName: "Avdeev",
practiceTime: 160
}
];
const studentsGroup2PracticeTime = [
{
firstName: "Mankov",
practiceTime: 87
},
{
firstName: "Kistin",
practiceTime: 133
},
{
firstName: "Kotlyarov",
practiceTime: 140
},
{
firstName: "Peskov",
practiceTime: 10
},
];

// Let's write a not very convenient, but exponential function that can accept an unlimited number of arguments and find the maximum among them. The function should be called like this:

const maximum = findMax(4, 7, 10);
function findMax(...values) { // here we accept all the passed
arguments and use the rest operator to pack them into the array
values.

// This time, values ​​is already a real array and we can
use reduce to iterate over it and find the
maximum number.

return values.reduce((acc, value) => {
if (value > acc) return value;
return acc;
}, -Infinity);
};

// Let's create arrays with only the values ​​of time worked by students.

const group1PracticeTime = studentsGroup1PracticeTime.map((student) => student.practiceTime);
const group2PracticeTime = studentsGroup2PracticeTime.map((student) => student.practiceTime);

// Call our max function using the spread operator.

const maxTimeFromGroup1 = findMax(...group1PracticeTime);
console.log(maxTimeFromGroup1); // 160
const maxTimeFromGroup2 = findMax(...group2PracticeTime);
console.log(maxTimeFromGroup2); // 140

// Let's also find the maximum time worked between the two groups.

const bothGroupsTime = [...group1PracticeTime, ...group2PracticeTime];
const maxTimeBothGroups = findMax(...bothGroupsTime);
console.log(maxTimeBothGroups); // 160
```

Let's look at another example:

```javascript
const saveFullNameInDB = (firstName, lastName, ...additionals) => {
  saveFirstName(firstName);
  saveLastName(lastName);
  saveAdditionals(additionals); // Thanks to the rest operator, we were able to collect all the additional data that was passed to be saved in the database, and we can pass it as one array to the function for saving additional data.
};
```

## Pure functions, immutability

Pure functions and immutability are concepts from functional programming. They allow you to write more understandable and reliable code.

### Pure functions

Pure functions are functions that, when called with the same parameters, always return the same value, while such functions operate only with data from the arguments received and do not interact with global variables for them. Pure functions allow you to write well-tested code, since they do not depend on global variables and always return the same value, we only need to write one test for them, and we can be sure that they work stably and correctly. Also, pure functions can be easily reused in other code, so such functions are often taken out as sets of utilities that are used by the entire project.

Let's look at a few examples:

```javascript
const student = {
firstName: "Ivan",
age: 21,
};
// Function to calculate the year of birth. Takes the current year, and
calculates the student's year of birth using global data. This is a function with side effects. It depends heavily on the global variable student.

const getYearOfBith = (currentYear) => {
return currentYear - student.age;
}
console.log(getYearOfBith(2021)); // 2000
student.age = 25;
console.log(getYearOfBith(2021));

// 1996 - We called the function twice with the same parameter, but got different results. This means that we cannot know exactly what the function will return at any given point in the program, and we cannot guarantee that the code will execute correctly.

// Pure version of the function. Takes data only from its arguments.

const getYearOfBithPureVersion = (age, currentYear) => {
return age - currentYear;
}

// A more complex example with mutation (side effects), but
more common in practice.

// Function for adding a new key to an object. Accepts the original object, the key name, and the value to add.

const addField = (object, key, value) => {
object[key] = value;
return object;
};
const updatedStudent = addField(student, 'lastName', 'Belkin');
console.log(student);

// {firstName: "Ivan", age: 25, lastName: "Belkin"} - by calling our function to add a field, we changed the initial object, which can lead to undesirable consequences in the rest of the code, which are sometimes very difficult to detect. For example,
further in the code, the student object can be iterated and only the initial fields can be displayed, but we added a third field to it, which will also be iterated.

console.log(updatedStudent); // {firstName: "Ivan", age: 25,
lastName: "Belkin"}

// Pure version of the function - we need to create a new object inside the function to change and return.

const addFieldPureVersion = (object, key, value) => {
return { // return a new object. ...object,

// Use the spread operator to get a copy of the properties of the original object.

[key]: value

// Add a new property.
}
};
const updatedStudentPure = addFieldPureVersion(student,
'practiceTime', 148);
console.log(student);

// {firstName: "Ivan", age: 25, lastName: "Belkin"} - this time the original object was not changed.

console.log(updatedStudentPure);

// {firstName: "Ivan", age: 25, lastName: "Belkin", practiceTime: 148}
```

It is not always possible to write only pure functions. Often we need to get data from the database, or make a request to the server, as well as write something to the file system, output data to the console - all this is called side effects, which are very necessary, but greatly complicate the testing of the code and its predictability. It is recommended to split the code into small parts, and write most of it as pure functions, and only leave small pieces with side effects.

It is also important to ensure that the arguments of the function are not changed. Make it a rule that the arguments of the function should be used only for reading and be extremely careful when working with objects that come as arguments to the function. Since objects are passed to the function by reference, not by value, it is very easy to assign this reference to a new object inside the function and change the original object later. Bugs associated with such mutation of the object are sometimes very difficult to detect. To enforce these rules, there are useful developer tools, such as ESLint, which can be configured to highlight attempts to modify function arguments, and special libraries for blocking the ability to edit the original object or other data, such as Immutable.

## Closures

Let's imagine that we want to create a button click counter on the site (for example, we want to track how many times a user clicks on a button).

To do this, we can create a numeric variable in the code and increase its value by one each time the button is clicked. But the variable name may match the name of another variable in another
script connected to the page, and this other script may change the data in our variable, which we would not want. So we need a protected variable so that only our algorithm has access to it, and we may have more than one button, in which case we need several such protected variables.

The best solution for this problem is to hide this variable inside a function - this is called a closure.

A closure is a term for a data saving mechanism. We close the data inside a function in such a way that this data can be accessed and changed inside this function, but at the same time it is not accessible from the outside.

This mechanism is used for caching function calculations (we will analyze the example below), hiding variables in modules (when several scripts connected to one page can have the same variables and interfere with each other's work), creating data storage protected from access from external code.

Let's see how closure is organized using the example of creating a counter. In algorithms, there is often a need to count some actions, for this a counter variable is created, with an initial value of 0, and when the necessary actions are performed, the value of this counter is increased by one. This can be, for example, the number of views of an article, or the number of clicks on a certain button on a site, for example, the thank you button. Here is an option for creating a counter through closure:

```javascript
const createCounter = () => {
  const counter = 0;
  return () => {
    return ++counter;
  };
};
// Create a counter.
const counter1 = createCounter();
counter1(); // 1
counter1(); // 2
// Let's create another counter. Each will work independently.
const counter2 = createCounter();
counter2(); // 1
counter1(); // 3
```

The function for creating a counter closes the counter value inside itself. When called, it returns a new function that can access this value, increasing it by one each time. By creating a lexical environment for each function call, we can create two or more counters, and they will all be independent.

Let's look at another example - creating a function with caching of calculation results. There are functions that make complex and long calculations, so it makes sense to save the result of such a calculation with a binding to the arguments with which the function was called, so that if the function is called again with such arguments, you can take the ready result, and not calculate it again. For example, let's take a simple function that calculates the square of a number:

```javascript
const closureFunction = () => {
  const cache = {};
  return (x) => {
    if (cache[x]) return cache[x];
    const result = x * x;
    cache[x] = result;
    return result;
  };
};
const chachedPow = closureFunction();
chachedPow(2); // 4
chachedPow(8); // 64
chachedPow(2); // 4 — here the function will take the value from the cache and will not calculate it again. This works especially effectively when we are dealing with complex and heavy calculations or, for example, requests for some resources from a database or external sources. Here we must not forget about cache validation. It may become irrelevant if we are dealing with a database or external data sources.
```

This example implements a simple closure for storing calculation results in the cache. If the result is already in the cache, we return it. If not, we calculate and add it to the cache.

You cannot access the cache variable from outside the function: it is protected (closed) inside the closureFunction function.

The basic approach to creating closures:

- create a function;
- declare variables inside it that we want to close in it:
- hide, save and use later;
- return another function from it that already performs some specific action and can use closed (hidden) data.

In fact, any function in JavaScript is a closure. Inside it there are closed variables that are not accessible from the outside. To effectively use this mechanism, it is convenient to create a function that returns another function that allows you to interact with the data.

Another example of using a closure is hiding variables inside plug-ins. We can connect many external scripts to a page, and each such script will define its own variables, which at some point may coincide with variables from another script, and everything will break. That is why we came up with the idea of ​​hiding the variables needed by the script inside the module (closures). This is what one of the options looks like:

```javascript
(function () {
  const sliderTexts = ["Promo", "Brands", "Best"];
  function showSlider(texts) {
    console.log(texts[0]);
    console.log(texts[1]);
    console.log(texts[2]);
  }
  showSlider(sliderTexts);
})();
```

We create a function that is immediately called and executes the code. The sliderTexts variable is hidden from other scripts and cannot be redefined.

🔥 Warning! Closures can lead to the creation of a huge number of lexical contexts, and such code may require more memory.

### Disadvantages of closures

Since all functions are closures, when a function is called, a lexical environment is created that takes up space in the computer's memory. There are often moments in the code when a function starts to be called too many times. Most often, this happens when working with rendering elements and updating them. An excessive number of lexical environments are created for the function, which quickly start to eat up memory - this is called a memory leak during program execution.

You should analyze where the function is used, whether it can be called in a loop. If the page slows down, use its profiling for memory consumption.

### Lexical context

Closures work thanks to a mechanism called the lexical environment.

It is the lexical environment (or lexical context) that allows all this closed data to be stored and accessed when the function is called, and also allows the function to have access to external data.

The lexical context or lexical environment is a mechanism in JavaScript that allows a function to access variables, constants, and anything else it needs when it is called. Each time a function is called, a dictionary-like object is created that records all the values ​​of the variables and constants inside the function, as well as those variables and constants outside the function that it accesses. Let's look at some examples:

```javascript
const lastName = "Petrov";

// lexical environment: { lastName: "Petrov" }

const getFullName = (firstName) => {

// lexical environment: { lastName: "Petrov", firstName: <defined at the time of the function call> }

const fullName = firstName + ' ' + lastName;

// lexical environment: { lastName: "Petrov", firstName: <defined at the time of the function call>, fullName: <calculated at the time of the function call> }

console.log(fullName);
return energy;
};
getFullName("Ivan");

// Ivan Petrov

// lexical environment at the time of the function call becomes:

{ lastName: "Petrov", firstName: "Ivan", fullName: "Ivan Petrov"
}
```

When a function is first created in the code, many variables are not yet defined in its lexical context, but a reserve is left for them. At the moment of the function call, they will be defined and filled. In this example, the speed of light is defined as a global constant and will be available in the function. If there was a variable in its place, it would only get into the lexical context at the moment of the function call, and the value that will be used is the one that is in this variable at the moment of the function call. This is a very important point, which allows us to understand why when calling a function, we often do not get the result that we would like. The remaining variables, arguments, and variables and constants declared in the function itself do not have values ​​before it is called. At the moment of its call, they will be written and used.

All this is done specifically so that each function call is executed in its own separate world, but can interact with the outside world by passing values ​​to the lexical context. It is from there that the function receives
values ​​and can use them.

Let's look at an example of how the lexical environment works to better understand its importance and the problems of its incorrect use:

Let's write a function that will build houses: create an array of functions, when the function is called, the house number should be displayed from each element of the array

```javascript
const houses = [];
let i = 0;
while (i < 10) {
  let house = function () {
    // "house" function
    console.log(i); // prints house number
  };
  houses.push(house);
  i++;
}
houses[0](); // 10 — house number 10
houses[7](); // 10 — and house number 7
```

As we can see, all our houses have the number 10, although in the loop we gave them numbers in order and they should be correct.

This happens because of the lexical context that is created at the moment of calling the function.

The function that should display the house number is called after the loop is executed.

Since the variable i is declared as a variable, its value at the moment of calling the function becomes equal to 10, this is the result of executing the loop.

Accordingly, when calling the function, the house number 10 is displayed.

This is what the lexical environment looks like at the moment of executing the house function:

```javascript
let house = function () {
  // function "house"
  // lexical environment: { i: 10 }
  console.log(i); // outputs the house number
};
```

To fix this situation, you need to store the house number inside the loop block using let:

```javascript
const houses = [];
let i = 0;
while (i < 10) {
let houseNumber = i; // Here we create a block variable,
which will store the value of i for a specific iteration of the loop, and
its value will be in the lexical environment of the house function.
let house = function () { // the "house" function
console.log(houseNumber); // prints the house number
};
houses.push(house);
i++;
}
houses[0](); // 0 — house number 0
houses[7](); // 7 — and house number 7
```

Or inside the house function:

```javascript
const houses = [];
let i = 0;
while (i < 10) {
let house = function () { // the "house" function
let houseNumber = i; // Here we create a block
variable that will store the value of i, and it is this value that will
enter the lexical environment of the house function.
console.log(houseNumber); // prints the house number
};
houses.push(house);
i++;
}
houses[0](); // 0 — house number 0
houses[7](); // 7 — and house number 7
```

## Recursion

In simple words: recursion is an object of a certain structure, which can contain another object of the same structure, which in turn can also contain an object of the same structure, and so on.

In programming, recursion is a function calling itself. Recursion is very often needed where there are some nested structures and they need to be processed.

For example, to create or display some data or elements based on them, calculate some value based on all this data. Most often, these are nested directories or other data structures. Such structures cannot be processed with a regular loop, since in this case we can only go through the first level of nesting, and the deeper levels will remain unprocessed. Recursion can also be used in mathematical calculations, when a complex calculation can be broken down into the following type:
complex calculation = simple operation applied to a simpler calculation.

```javascript
const exponentiation = (base, exponent) => {
// Always check the data that comes to you.
if (typeof base !== 'number' || typeof exponent !== 'number')
return NaN;
// If our power is greater than zero, we call recursion, that is,
we take the base and multiply it by our function, only with
the power argument reduced by one.
if (exponent > 0) return base * exponentiation(base, exponent
- 1);
// Otherwise, we exit the recursion, simply
returning the bases, since any number to the zero power is equal to
one.
return 1;
}
const result = exponentiation(4, 4); // 1024
```

Of course, it is easier to raise to a power using a regular loop. Then the execution of the algorithm will take less resources.

The second example with a tree structure of form fields:

```javascript
// Field types in the form. Very useful for storing repeating
data in reference books.
const fieldTypes = {
text: 'textField',
fieldSet: 'fieldSet',
};
// Test object of form fields, which can be obtained from the
server (Backend).
const formData = [
{
fieldName: "First name",
required: true,
type: fieldTypes.text,
},
{
fieldName: "Last name",
required: false,
type: fieldTypes.text,
},
{
fieldName: "Address",
required: true,
type: fieldTypes.fieldSet,
fields: [
{
fieldName: "State - Province",
required: true,
type: fieldTypes.text,
},
{
fieldName: "Street",
required: true,
type: fieldTypes.text,
},
{
fieldName: "House",
required: true,
type: fieldTypes.text,
},
]
},
];
// Our function, which should build based on this data
HTML form.
const getForm = (formStructure) => {
// Always check the data that comes to you.
if (!Array.isArray(formStructure)) return 'Wrong form structure';
let form = ''; // This is a very crude example. We will create
the form simply as text, but in reality this variable should contain DOM nodes or framework components (e.g. React.js).
formStructure.forEach((element, index) => {
// If the field is text, we will process it right away.
if (element.type === fieldTypes.text) {
form = form +
`<div class="field-wrapper">
<label>${element.fieldName}</label>${element.required ?
'<span class="required">*</span>' : ""}
<input type="text">
</div>`;
}
// If it is a fieldset, we will call our function
recursively on the nested fieldset.
if (element.type === fieldTypes.fieldSet) {
form = form + `<div
class="fieldset">${getForm(element.fields)}</div>`;
}
});
return form;
}
const result = getForm(formData);
console.log(result);
```

When using recursion, the main thing is to set the stopping conditions, otherwise you can get an infinite loop of function calls. When we write the recursion exit condition incorrectly, it can loop indefinitely, and it is better not to allow this, since the executed script will stop with an error, because the JavaScript engine protects us from excessive recursion nesting. There are also times when we have a lot of data to process and the nesting of the recursion exceeds the limit set in the JavaScript engine, then we cannot use recursion, and we can try to rewrite it to an algorithm using cycles.

Here is an example of unlimited recursion and its result:

```javascript
const exponentiation = (base, exponent) => {
  if (typeof base !== "number" || typeof exponent !== "number") return NaN;
  return base * exponentiation(base, exponent - 1);
};
const result = exponentiation(4, 4); // Uncaught RangeError: Maximum call stack size exceeded
```
