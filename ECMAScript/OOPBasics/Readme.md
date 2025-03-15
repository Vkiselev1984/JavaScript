# OOP Basics. This context

## Objects and their methods

Programmers have long understood that the easiest way to create algorithms is to operate with objects that represent the real world. So, almost any entity of the real world can be represented as an object with some properties and methods.

Let's take a robot vacuum cleaner for example, it can have different characteristics, such as
motor power, battery capacity, operating time without recharging, the volume of the garbage container, it also has different sensors that can be represented by Boolean variables, for example, whether the garbage container is full, or an obstacle sensor. And the robot vacuum cleaner has methods that make it not just a set of properties, but also add functionality: the most
important one is cleaning the room, and additional ones, to go to recharge when the
charge is running low, or to activate disinfection with an ultraviolet lamp.

All of this can easily be programmed as an object, let's write such an object:

```Js
// Robot vacuum cleaner object.
const Roomba = { // There is an unspoken rule to name objects in algorithms with a capital letter.
// Usually, the object's properties are declared first.
model: "Romba-1",
power: 200,
batterySize: 2100,
boxSize: 0.5,
workTime: 45,
counterOfStarts: 0,
isFull: false,
isObstacle: false,
isUVLampOn: false,
// After the properties, its methods are declared.
startCleaning: function () {
this.counterOfStarts++;
console.log('I am cleaning... I have been started: ',
this.counterOfStarts, 'times.');
},
goCharge: function () {
console.log('I am going to charge...');
},
switchUVLamp: function () {
this.isUVLampOn = !this.isUVLampOn;
console.log(`UV lamp is ${this.isUVLampOn ? 'working' :
'not working'}.`);
}
};
```

In this lesson we will take a detailed look at how to interact with object methods, and we will talk about the objects themselves and object-oriented programming in the next lesson.

Our object has three methods - these are:

- startCleaning - when this method is called, the object increases the start counter by one and a message is displayed in the console that the vacuum cleaner has started cleaning and how many times it has already been started.
- goCharge - go to charge, when it is called, a message is displayed in the console that the vacuum cleaner has gone to charge.
- switchUVLamp - switch the state of the ultraviolet lamp. Standard toggle switch (on/off) and a message in the console about the lamp operation.

Let's see how we can interact with objects.

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Calling object methods.
Roomba.startCleaning(); // 'I am cleaning... I have been started: 1 times.'
// Let's set the isUVLampOn object property to true to demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
// The result of calling the next method depends on the value stored in the object property, as well as on how this method was called (we'll talk about this below).
Roomba.switchUVLamp(); // 'UV lamp is not working.'
Roomba.goCharge(); // 'I am going to charge...'
```

Everything is quite simple and trivial, we access the properties of an object through a dot, and we can also call its methods through a dot. In the startCleaning and switchUVLamp methods, you can see access to the properties of objects through the this keyword. Since an object is not a function, the properties and methods declared in it cannot be accessed from the methods of this object as global variables. So we have come to one of the most frequently asked questions at interviews, of course, the context (this). Let's take a closer look at it.

## Context (this)

this is a keyword in JavaScript that allows you to access the properties and methods of an object inside its methods. Also, the keyword this is available in any function, and either takes the value of the object that was the context when the function was called, or undefined.

Let's take a closer look at what the context is inside a function, where it comes from, and how to understand what context will be in our function, and how to override it. First, let's try to declare a simple function and see what it has in this, if it is not declared in the object.

```Js
// Working with this
const checkThis = function() {
console.log(this);
}
checkThis(); // Window {0: global, window: Window, self: Window, document: document, name: "", location: Location, …}
```

As we can see, if we declare a function outside an object, its this is the global Window object (if you run it in a browser, if it is node.js, then it will be the global object). A function declared outside of any user object is a method of the global object, so its this points to the global object. Now let's try to create such a function inside a user object:

```Js
const checkThisInObject = {
testProperty: true,
checkThis: function () {
console.log(this);
},
};
checkThisInObject.checkThis(); // {testProperty: true, checkThis:ƒ}
```

This time, we got our object as this in the function. It seems simple, if we want to access the properties and methods of our object, we just need to use this as a reference to it, and everything will be available to us. But there are some subtleties with this this, which we will now consider.

## Borrowing a method

What if we want to borrow a method from one object and use it in another object. To do this, let's create another robot vacuum cleaner object that will have improved characteristics, but will have the same functionality as the first model:

```Js
// Object robot vacuum cleaner model Tango.
const Tango = { // There is an unspoken rule to name objects in algorithms with a capital letter.
// Usually, the properties of the object are declared first.
model: "Tango-1",
power: 300,
batterySize: 3200,
boxSize: 0.7,
workTime: 60,
counterOfStarts: 0,
isFull: false,
isObstacle: false,
isUVLampOn: false,
// After the properties, its methods are declared. And since the methods of the new model are the same as the old one, let's borrow them from the Roomba object.
startCleaning: Roomba.startCleaning,
goCharge: Roomba.goCharge,
switchUVLamp: Roomba.switchUVLamp,
};
```

Here we used a technique called method borrowing, we simply copied the methods of the first object to the second object. Let's try calling them and see what happens:

```Js
// Accessing the properties of the Tango object.
console.log(Tango.model); // "Tango-1"
console.log(Tango.isFull); // false
// Calling object methods.
Tango.startCleaning(); // 'I am cleaning... I have been started: 1 times.'
// Set the isUVLampOn object properties to true to demonstrate the result of the switchUVLamp method.
Tango.isUVLampOn = true;
// The result of calling the next method depends on the value stored in the object property, as well as on how this method was called (we'll talk about this below).
Tango.switchUVLamp(); // 'UV lamp is not working.'
Tango.goCharge(); // 'I am going to charge...'
```

Everything works, great. Let's create a third robot, again differing only in properties, but the functionality will be the same.

```Js
// Samba model robot vacuum cleaner object.
const Samba = {
model: "Samba-1",
power: 250,
batterySize: 2500,
boxSize: 0.5,
workTime: 50,
counterOfStarts: 0,
isFull: false,
isObstacle: false,
isUVLampOn: false,
// This time we will not create methods in the object, we will try to borrow them just before using.
};
```

We did not declare methods for this object, and we will try to add them to the object immediately before the call:

```Js
// Accessing the Samba object properties.
console.log(Samba.model); // "Samba-1"
console.log(Samba.isFull); // false
// Let's borrow methods from the Roomba object.
Samba.startCleaning = Roomba.startCleaning;
Samba.switchUVLamp = Roomba.switchUVLamp;
Samba.goCharge = Roomba.goCharge;
// Calling object methods.
Samba.startCleaning(); // 'I am cleaning... I have been started: 1 times.'
// Set the isUVLampOn object property to true to demonstrate the result of the switchUVLamp method.
Samba.isUVLampOn = true;
// The result of calling the next method depends on the value stored in the object property, as well as on how this method was called (we'll talk about this below).
Samba.switchUVLamp(); // 'UV lamp is not working.'
Samba.goCharge(); // 'I am going to charge...'
```

## Context binding

Let's continue working with our robots and try to write a small program for testing the vacuum cleaner. We will give the vacuum cleaner commands at short intervals and see how they work:

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Calling object methods.
setTimeout(Roomba.startCleaning, 1000);
// Let's set the isUVLampOn object property to true to demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
// The result of calling the next method depends on the value stored in the object property, as well as on how this method was called (we'll talk about this below).
setTimeout(Roomba.switchUVLamp, 2000);
setTimeout(Roomba.goCharge, 3000);
// I am cleaning... I have started: NaN times.
// UV lamp is working.
// I am going to charge...
```

We got a slightly strange result. The number of vacuum cleaner starts became NaN, and the UV lamp did not turn off. Let's figure out why this happened.

When we called the object methods directly, after its creation, the function was called with the ability to access the object, but when the function is called inside the setTimeout method, then this function loses access to its object, and the this keyword in such a function gets the value undefined. This is where the function call context comes into play.

Each function is called in the context of a certain object, if this function is defined outside some user object, then its context will be the global object (for example, window in the browser), and if it is defined in a user object and called in it, then the context for it will be this user object.

When we call a function separately from its object, as happens when calling it from setTimeout, then its context becomes undefined.

This happens because we borrow a method from an object, and the setTimeout function copies our function in order to call it later, but when it is called, the object is no longer accessible.

How can we fix this? One option is to wrap the method in an anonymous function, and call it in it, then this anonymous function will save a reference to the object from which our method will be called in its lexical environment:

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Calling object methods.
setTimeout(function () {
Roomba.startCleaning();
}, 1000);
// Let's set the isUVLampOn object property to true to
demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
// The result of calling the next method depends on the value stored in the object property, as well as on how this method was called (we'll talk about this below).
setTimeout(function () {
Roomba.switchUVLamp();
}, 2000);
setTimeout(function () {
Roomba.goCharge();
}, 3000);
// I am cleaning... I have started: 1 times.
// UV lamp is not working.
// I am going to charge...
```

It worked, but wrapping the method in an anonymous function every time is not very convenient, there are better ways.

All of them are related to binding the context (the object we need) during the function call.

This is the call method we are already familiar with, as well as two more methods apply and bind.

The call method allows you to call a function and explicitly specify with which context object to execute it (pass as the first argument an object that will be available in the function via the this keyword).

Let's look at an example with a vacuum cleaner:

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Calling object methods.
// Calling an object method via call with an explicit transfer of the robot vacuum cleaner object as a context.
Roomba.startCleaning.call(Roomba); // I am cleaning... I have
started: 1 times.
// This example is not very indicative here, because We already had access to the object, and inside setTimeout it is possible to use call only by wrapping all this in an anonymous function, but this is also pointless, because then we again have access to the object, as we saw in the previous example. But we can pass another object to call and see that the function is called in the context of another object:
// Let's create a dummy robot object that contains only one property required for the function to work and immediately set it to an initial value different from the one set for the robot, for clarity.
const notARobot = {
counterOfStarts: 10,
};
Roomba.startCleaning.call(notARobot); // I am cleaning... I have
been started: 11 times.
```

As we can see, the call method allowed us to call a method of a custom object, but specify a completely different object as the context, and it worked.

In this way, we can use the call method to call any function with the context we need. If the called function takes arguments, they can be specified after the context object, the second and all subsequent arguments of the call method will be passed as arguments to the called function.

Like the call method, you can use the apply method, which also allows you to call a function and pass the necessary context, the only difference from call is that the apply method takes arguments that must be passed to the called function not as a comma-separated list, but as an array, which is sometimes more convenient.

In our example, the methods do not take arguments, but if they did, it could look like this:

```Js
const notARobot = {
counterOfStarts: 10,
};
// Example of using the apply method to call a function with the notARobot object as the context and passing the arg1, arg2, arg3 arguments to it.
Roomba.startCleaning.apply(notARobot, [arg1, arg2, arg3]);
// I am cleaning... I have been started: 11 times.
```

And the last method for binding the context is bind (from the English bind - to bind) - this is the most frequently used method, because it allows you to bind the context to the function once and for all, and in the future we can simply call the function and be sure that it will be called in the context of the object we need.

It is this that will help us to fix our robot testing algorithm using setTimeout. The method works very simply, you need to call it for the function we need and pass it a single argument - the object in the context of which we want to call our function in the future, and our function will be bound to this context forever.

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Calling object methods.
// In setTimeout we pass not just our method, but a function that is bound to our object. The bind method returns a new function, with an already bound context, it is the one that is called after the time has elapsed.
setTimeout(Roomba.startCleaning.bind(Roomba), 1000);
// Let's set the isUVLampOn object property to true
to demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
// The result of calling the next method depends on the value stored in the object property, as well as on how this method was called (we'll talk about this below).
setTimeout(Roomba.switchUVLamp.bind(Roomba), 2000);
setTimeout(Roomba.goCharge.bind(Roomba), 3000);
// I am cleaning... I have been started: 1 times.
// UV lamp is not working.
// I am going to charge...
```

If you noticed, all the examples were given with functions defined via the function keyword, and nowhere was the fat arrow from ES2015 used, let's try to create an object whose methods will be defined in this way, and see what happens:

```Js
const Roomba = {
model: "Romba-1",
power: 200,
batterySize: 2100,
boxSize: 0.5,
workTime: 45,
counterOfStarts: 0,
isFull: false,
isObstacle: false,
isUVLampOn: false,
// After the properties, its methods are declared.
startCleaning: () => {
this.counterOfStarts++;
console.log('I am cleaning... I have started: ',
this.counterOfStarts, 'times.');
},
goCharge: () => {
console.log('I am going to charge...');
},
switchUVLamp: () => {
this.isUVLampOn = !this.isUVLampOn;
console.log(`UV lamp is ${this.isUVLampOn ? 'working' :
'not working'}.`);
}
};
```

And let's try to call our methods in different ways:

```Js
// Call object methods.
Roomba.startCleaning(); // I am cleaning... I have started: NaN times.
Roomba.startCleaning.call(Roomba); // I am cleaning... I have started: NaN times.
Roomba.startCleaning.apply(Roomba); // I am cleaning... I have started: NaN times.
const boundMethod = Roomba.startCleaning.bind(Roomba);
boundMethod(); // I am cleaning... I have been started: NaN times.
setTimeout(Roomba.startCleaning.bind(Roomba), 1000); // I am cleaning... I have started: NaN times.
```

As we can see, none of the methods worked, we got NaN everywhere, why is that? The answer to this question is hidden in the ES2015 specification, which says that arrow functions do not have their own context, in them this refers to the same object, which is the context for the function above, in which this function is declared.

It turns out that in our case this inside the methods will refer to the global object, and the call, apply and bind methods will not help us redefine this context.

It would seem inconvenient, but in fact, arrow functions are very convenient when used as anonymous functions inside methods, because we can use this from the method itself. Let's look at an example:

```Js
const Stand = {
model: "Stand-1",
robots: ['Roomba-1', 'Tango-1', 'Samba-1', 'Roomba-2'],
// Method using an arrow function as a
callback function.
startTestingArrow: function() {
console.log('Start testing...');
this.robots.forEach((value) => {
console.log('stand: ', this.model, 'is testing robot: ',
value);
})
},
// Method using a classic function as a
callback function.
startTestingClassic: function() {
console.log('Start testing...');
this.robots.forEach(function(value) {
console.log('stand: ', this.model, 'is testing robot: ',
value);
})
},
};
Stand.startTestingArrow();
//Start testing...
// stand: Stand-1 is testing robot: Roomba-1
// stand: Stand-1 is testing robot: Tango-1
// stand: Stand-1 is testing robot: Samba-1
// stand: Stand-1 is testing robot: Roomba-2
Stand.startTestingClassic();
//Start testing...
// stand: undefined is testing robot: Roomba-1
// stand: undefined is testing robot: Tango-1
// stand: undefined is testing robot: Samba-1
// stand: undefined is testing robot: Roomba-2
```

As we can see, the first method, in which the callback function was declared via an arrow function, worked perfectly, because not having its own this, the callback function used this from the object method, and therefore got access to the model property. But the second method, in which the callback function was declared in the classic way, could not get access to the object method, because it has its own this, which was not defined at the time this function was called.

## Object via class

Let's look at the option of creating an object using the class keyword and how context binding to methods is performed in this case. Let's start with an example of creating our robot vacuum cleaner, without context bindings yet:

```Js
// Robot vacuum cleaner class.
class RobotVacuumCleaner {
// Class properties.
model = "Romba-1";
power = 200;
batterySize = 2100;
boxSize = 0.5;
workTime = 45;
counterOfStarts = 0;
isFull = false;
isObstacle = false;
isUVLampOn = false;
// Class constructor, we will study it in more detail in the next
lesson.
constructor() {
}
// Class methods.
startCleaning() {
this.counterOfStarts++;
console.log('I am cleaning... I have been started: ',
this.counterOfStarts, 'times.');
}
goCharge() {
console.log('I am going to charge...');
}
switchUVLamp() {
this.isUVLampOn = !this.isUVLampOn;
console.log(`UV lamp is ${this.isUVLampOn ? 'working' :
'not working'}.`);
}
}
// Create an instance of the class.
const Roomba = new RobotVacuumCleaner();
```

Everything is very similar to a regular object - the same properties and methods, only a class constructor has been added (we will look at it in the next lesson) and to create the robot itself we need to call our class using the new keyword. Let's try to access the properties and methods of the robot using setTimeout:

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Delayed invocation of object methods.
setTimeout(Roomba.startCleaning, 1000);
// Let's set the object's isUVLampOn properties to true to demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
setTimeout(Roomba.switchUVLamp, 2000);
setTimeout(Roomba.goCharge, 3000);
// I am cleaning... I have started: NaN times.
// UV lamp is working.
// I am going to charge...
```

We got the same thing that we got when working with a simple object.

Calling class methods that were passed as callback functions to the setTimeout method lose their context, and this in them begins to refer to the global object.

But to solve this problem, when using classes, we can simply bind the context to the methods at the stage of class creation, in the constructor, using the bind method.

```Js
// Robot vacuum cleaner class.
class RobotVacuumCleaner {
// Class properties.
model = "Romba-1";
power = 200;
batterySize = 2100;
boxSize = 0.5;
workTime = 45;
counterOfStarts = 0;
isFull = false;
isObstacle = false;
isUVLampOn = false;
// We use it to bind all class methods to the
context - the current object (this).
constructor() {
this.startCleaning = this.startCleaning.bind(this);
this.goCharge = this.goCharge.bind(this);
this.switchUVLamp = this.switchUVLamp.bind(this);
}
// Class methods.
startCleaning() {
this.counterOfStarts++;
console.log('I am cleaning... I have been started: ',
this.counterOfStarts, 'times.');
}
goCharge() {
console.log('I am going to charge...');
}
switchUVLamp() {
this.isUVLampOn = !this.isUVLampOn;
console.log(`UV lamp is ${this.isUVLampOn ? 'working' :
'not working'}.`);
}
}
// Create an instance of the class.
const Roomba = new RobotVacuumCleaner();
```

Simple, isn't it? It's enough to rewrite references to class methods to their context-bound version. The construction looks like this:

this.<class method> = this.<class method>.bind(this).

Now we can call our methods again using setTimeout:

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Delayed invocation of object methods.
setTimeout(Roomba.startCleaning, 1000);
// Let's set the isUVLampOn object property to true to
demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
setTimeout(Roomba.switchUVLamp, 2000);
setTimeout(Roomba.goCharge, 3000);
// I am cleaning... I have started: 1 times.
// UV lamp is not working.
// I am going to charge...
```

And there is an even simpler way: declare our methods through an arrow function, as we remember, an arrow function does not have its own context, so it will use the context of the function inside which the arrow function is declared, and since we use a class to create an object, it will be a context inside the arrow function:

```Js
// Robot vacuum cleaner class.
class RobotVacuumCleaner {
// Class properties.
model = "Romba-1";
power = 200;
batterySize = 2100;
boxSize = 0.5;
workTime = 45;
counterOfStarts = 0;
isFull = false;
isObstacle = false;
isUVLampOn = false;
// Class constructor, we will study it in more detail in the next lesson.
constructor() {
}
// Class methods.
startCleaning = () => {
this.counterOfStarts++;
console.log('I am cleaning... I have been started: ',
this.counterOfStarts, 'times.');
}
goCharge = () => {
console.log('I am going to charge...');
}
switchUVLamp = () => {
this.isUVLampOn = !this.isUVLampOn;
console.log(`UV lamp is ${this.isUVLampOn ? 'working' :
'not working'}.`);
}
}
// Create an instance of the class.
const Roomba = new RobotVacuumCleaner();
```

Let's try to call our methods:

```Js
// Accessing object properties.
console.log(Roomba.model); // "Romba-1"
console.log(Roomba.isFull); // false
// Delayed invocation of object methods.
setTimeout(Roomba.startCleaning, 1000);
// Let's set the isUVLampOn object property to true to demonstrate the result of the switchUVLamp method.
Roomba.isUVLampOn = true;
setTimeout(Roomba.switchUVLamp, 2000);
setTimeout(Roomba.goCharge, 3000);
// I am cleaning... I have started: 1 times.
// UV lamp is not working.
// I am going to charge...
```
