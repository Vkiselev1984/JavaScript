# Collections Iterators Modules

## Garbage collection

When executing a script, the JS engine uses a lot of memory.

Functions are called, loops are executed, objects are rebuilt, and for all these operations, the interpreter must allocate entire memory areas to store data.

But what happens when some variable is no longer needed? The function has done its job, the declared variables inside the closure are no longer available for any operation, and storing them in memory does not make any sense. And if the JS engine does not free up the memory, it may soon run out, and this will lead to the crash of our program.

The main principle of memory management in JS is its reachability. There are many reachable default values. These values ​​are called root. They cannot be deleted.

Among them:

- Global variables
- The current function that is being executed
- Other functions in the current call chain, their parameters and local variables

Then other reachable values ​​are calculated. They are calculated by links from the root, then by links from the reachable, and so on. As a result, the list of reachable values ​​resembles a branched tree, in which you can go from the root values ​​by links to any value you need.

In JavaScript, as in any other programming language, there is a background process that manages the removal of unnecessary objects in memory. It is called the garbage collector. It tracks all objects that are not accessible by links and removes them.

In previous lessons we learned that objects are written to variables by reference.

For example, if in an object:

```
let obj = {
  name: 'John'
}
```

Overwrite the obj variable with another value:

```
obj = null;
```

There will be no more references to our object, and it will become unreachable. Eventually, it will fall victim to the garbage collector, which will free up the memory it occupied.

If we create several references to an object by writing them to different variables, then the object will be deleted only when all references to the object are deleted.

A situation may arise when several objects have references to each other, but references to the root objects are deleted. Then all these objects are also deleted.

### Garbage collector operation algorithms

The garbage collector's algorithm works on the principle of marking. According to this algorithm, root objects are marked first, then the algorithm follows the links from them, then - the links from these links.

Of course, this is recursion. To go through all the objects and not forget anything, you need to remember everything you've gone through and follow all the links, and then follow the links of links to the very end.

In the C language, there is a special data type - links, on the basis of which you can build similar data structures and consider ways to bypass them, which resemble the work of our garbage collector. There, such data structures are called trees. Indeed, such a structure resembles trees, the root objects are the trunk at the base of the root. And while the data is reachable, they "grow" on our tree.

As a result, we will have some objects that this algorithm did not mark, since they are not accessible via links from the roots. They will be deleted.

Naturally, such work with large amounts of data can significantly affect the performance of our program. Therefore, there are some optimizations of the garbage collector:

The garbage collector is performed, if possible, during script downtime.

When there are many objects, the garbage collector tries to divide them into parts. As in the tree analogy, the collector divides large branches of the tree and goes through them at different times. As a result, instead of one large traversal, we get many small traversals. And instead of one large loss of performance, many small ones.

Objects are divided into generations - new and old. Often, objects do not live long - the function is called, created objects, processed them, returned some value and ended. Therefore, it makes sense to check only new objects more often. Old ones are checked less often.

## Symbol. Details

The latest EcmaScript specifications introduced a new data type Symbol that acts as a unique identifier.

Previously, only strings could be used in object property keys, but with the introduction of the Symbol type, it became possible to use it as well.

Many libraries, in particular, the Redux state management library, use it fully under the hood. Let's figure out what this data type is.

A symbol is declared using the Symbol() function:

```JS
let id = Symbol();
```

If desired, we can provide a description of the identifier, which we can later use to understand for which key this identifier was created:

```JS
let id = Symbol('id');
```

Each time we create a symbol, its value is unique, even if we create multiple symbols with the same description:

```JS
let id1 = Symbol('id');
let id2 = Symbol('id');
console.log(id1 === id2); // false
```

The contents of the variable in which the symbol is written cannot be viewed. This is done for protection at the language level, to emphasize the difference between symbols and strings. Implicit type conversion will also not work:

```JS
let id = Symbol('id');
console.log(id + 1); // TypeError: Cannot convert a Symbol value to a string
```

Symbols, unlike other data types, cannot be implicitly converted to other types. Symbols have a toString() method, but it converts to a string.

If we want to see only the description, we can access the description property:

```JS
let id = Symbol('id');
console.log(id.description); // id
```

When creating an object where we use a symbol as a key, we need to use square brackets. The same thing when accessing an object field whose name uses a symbol. This is because we need to use the value of the id variable as a key, not the string "id":

```JS
let id = Symbol('id');
let user = {
  [id]: 'John'
};
console.log(user[id]); // John
```

### Creating "hidden" properties of objects

Using an identifier created with Symbol, you can create so-called "hidden" properties of an object. These properties cannot be accidentally overwritten by accessing them from different parts of the program.

Let's figure out why it is better to use Symbol('id') rather than the string 'id'? If the buddy object is part of third-party code, it is unsafe to add new fields to it.

Iterators working with this code can process it and errors can occur there. If we use symbols, it is more difficult to access them accidentally. Third-party code is unlikely to see them, much less process them, which will help avoid errors.

There is a possibility that another script, unrelated to ours, will want to write its id to our buddy object.

Third-party code can create its own Symbol(‘id’) for this:

```JS
let id = Symbol('id');
```

Then we can write to it:

```JS
let buddy = {};
buddy[id] = 'John';
```

And read it:

```JS
console.log(buddy[id]); // John
```

Identifiers created with Symbol are always created unique, regardless of the symbolic name value passed to them. However, using the string "id" instead of an identifier will result in a conflict.

Properties with symbolic keys are ignored in the for(… in …) object iterator and by the Object.keys(buddy) structure. This is part of the general principle of hiding properties with symbolic keys. If some third-party library iterates over the properties, it will not get them either. Object.assign copies all properties, including symbolic ones.

### Global Symbol Registry

Repeated calls to the Symbol() function always result in the creation of unique identifiers, even if we pass the same description to it.

But what if we want each description to correspond to only one unique identifier in a task? A global symbol registry is created for this purpose.

We create symbols in it, then access it by this name. And with this access, we are guaranteed to be given a specific symbol corresponding to this description.

A special Symbol.for(key) method is used for this. It reads the required symbol, and if it is not available, it will create it.

```JS
let id = Symbol.for('id');
let id2 = Symbol.for('id');
console.log(id === id2); // true
```

These symbols are created in the global scope, so they are available globally.

There is also a Symbol.keyFor (identifier) ​​method that returns a description of a symbol by identifier. The only thing is that this method works for global symbols, and when trying to search for regular ones, it will return undefined.

```JS
let id = Symbol.for('id');
let id2 = Symbol('id');
console.log(Symbol.keyFor(id)); // id
console.log(Symbol.keyFor(id2)); // undefined
```

But we can always use the description property, which is available to everyone:

```JS
let id = Symbol.for('id');
let id2 = Symbol('id');
console.log(id.description); // id
console.log(id2.description); // id
```

### System symbols

There are special symbols that we can customize. They are contained within JavaScript and are called system symbols.

Here are some of them:

- Symbol.hasInstance
- Symbol.isConcatSpreadable
- Symbol.iterator
- Symbol.toPrimitive

### Summary

The Symbol data type is a unique identifier. It is always unique, even when using one description. If we need one identifier for one description, we use global symbols.

Symbols are hidden for iterators and are unlikely to violate the integrity of the reusable code. But Object.assign() will copy the object with symbols.

## Iterable objects

Iterables are a generalization of arrays. The concept allows any object to be used in a for(… of …) loop. Of course, arrays themselves are iterable. But there are a lot of other built-in objects that are iterable. For example, strings.

In fact, even though a string is a primitive data type in JavaScript, we can easily represent it as an array of characters:

```JS
let str = 'Hello';
console.log(str[0]); // H
console.log(str[1]); // e
```

This is possible because strings are iterable. The for(… of …) loop iterates over the characters of the string.

### Symbol.iterator

An object is an iterator if it can access the elements of a collection one at a time, while keeping track of its current position within that sequence.

In JavaScript, an iterator is an object that provides a next() method that returns the next element in a sequence. This method returns an object with two properties: done and value.

If the object is not an array, but is a collection of some elements, then it is quite suitable for a for(… of …) loop.

For example, we have an object with a range of numbers:

```JS
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};
```

We can use it in a for(… of …) loop:

```JS
for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}
```

When the for(… of …) loop starts, it calls Symbol.iterator once (or throws an error if the method is not found). This method must return an iterator — an object with a next method. The loop then works only with the returned object from Symbol.iterator. To get the next value, the loop runs the next() method, which must return data in the object format {done: boolean, value: any}.

The object format is shown in the Typescript interface types, so it is clearer what exactly we should see. The Any type means that our type can be in the form of any of the eight JavaScript types, including in the object.

Let's pay attention to the key feature of iterators — separation of responsibilities. The range object does not have a next method, this method is found in another object — the iterator, and it is its next that generates values. As a result, the iterator object itself is separated from the iterated object. This allows you to remove the restrictions associated with the simultaneous execution of several iterators, even asynchronous ones.

Let's try to combine an iterator and an iterable object and see what happens:

```JS
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

let rangeIterator = range[Symbol.iterator]();

console.log(rangeIterator.next()); // {value: 1, done: false}
console.log(rangeIterator.next()); // {value: 2, done: false}
console.log(rangeIterator.next()); // {value: 3, done: false}
console.log(rangeIterator.next()); // {value: 4, done: false}
console.log(rangeIterator.next()); // {value: 5, done: false}
console.log(rangeIterator.next()); // {value: undefined, done: true}
```

### Array.from

Let's introduce the definition of a pseudo-array. A pseudo-array is an object that has indices and a length property. As we saw above, strings can be represented as a pseudo-array, although they are not objects. But such an object is a pseudo-array, but, unlike strings, it cannot be iterated:

```JS
let range = {
  0: 'first',
  1: 'second',
  length: 2
};
```

The Array.from method will help you create an array from such a pseudo-array or iterable object.

```JS
let range = {
  0: 'first',
  1: 'second',
  length: 2
};

let arr = Array.from(range);
console.log(arr); // ['first', 'second']
```

And the same with the string:

```JS
let range = '12345';
let arr = Array.from(range);
console.log(arr); // ['1', '2', '3', '4', '5']
```

## Map and Set. WeakMap and WeakSet

### Map

Map is a key/value collection, like Object. But the main difference is that Map allows you to use keys of any type.

Methods and properties:

- new Map() — creates a collection
- map.set(key, value) — writes the value by key
- map.get(key) — returns the value by key or undefined if key is missing
- map.has(key) — returns true if key is present in the collection, otherwise false
- map.delete(key) — deletes an element (key/value pair) by key
- map.clear() — clears the collection of all elements
- map.size — returns the current number of elements

For example:

```JS
let map = new Map();

map.set('1', 'str1'); // a string key
map.set(1, 'num1'); // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the insertion order
console.log(map.get(1)); // num1
console.log(map.get('1')); // str1
console.log(map.size); // 3
```

We see that our keys can take any type. Therefore, in terms of using collections, it is incorrect to access them via map[key]. Although this will work.

The correct way to access them is via a getter and setter — get and set.
Map, unlike regular objects, can use objects instead of keys.

Map.set returns a Map object when called, so we can use a chain of set methods to set values:

```JS
let map = new Map();

map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');

console.log(map.get(1)); // num1
console.log(map.get('1')); // str1
console.log(map.size); // 3
```

### Iterating over a Map collection

In the map collection, iteration occurs in the same order in which the elements were added.

There are 4 methods for iterating over the Map collection:

- map.keys() — returns an iterable object by keys
- map.values() — returns an iterable object by values
- map.entries() — returns an iterable object by pairs of the form [key, value], this option is used by default in for(..of..)
- map.forEach() — an iterator that works the same way as with an array

```JS
let map = new Map();

map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');

for (let key of map.keys()) {
  console.log(key); // 1, then true
}

for (let value of map.values()) {
  console.log(value); // str1, then num1
}

for (let item of map.entries()) {
  console.log(item); // [1, 'num1'], then [true, 'bool1']
}

for (let [key, value] of map.entries()) {
  console.log(key + ': ' + value); // 1: num1, then true: bool1
}
```

### Working with objects

We can create Maps from objects and vice versa, objects from Maps.

Object.entries will help to create a Map:

```JS
let obj = {
  name: 'John',
  age: 30
};

let map = new Map(Object.entries(obj));
console.log(map.get('name')); // John
```

Map.from will help to create an object from a Map:

```JS
let map = new Map();

map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');

let obj = Object.fromEntries(map.entries());
console.log(obj); // { '1': 'str1', '1': 'num1', 'true': 'bool1' }
```

## Set

A Set object is a special kind of collection: a "set" of values ​​(without keys), where each value can appear only once.

Its main methods are:

- new Set(iterable) — creates a Set, and if an iterable (usually an array) was provided as an argument, copies its values ​​to the new Set
- set.add(value) — adds a value (if it already exists, does nothing), returns the same set object
- set.delete(value) — deletes a value, returns true if the value was in the set at the time of the call, otherwise false
- set.has(value) — returns true if the value is present in the set, otherwise false
- set.clear() — deletes all existing values
- set.size — returns the number of elements in the set

The main "highlight" is that when you call set.add() repeatedly with the same value, nothing happens, which is how each value appears only once. Creating a Set from an array with repeating elements
will also remove the repeating elements, making a collection of unique elements. This is the most common use of the Set collection.

Let's check this in practice. Let's say we are looking at which dogs ran up to us to take a bone. But some dogs are cunning and ran up several times.

Let's find out who exactly ran up to us:

```JS
let dogs = new Set();
dogs.add('Labrador');
dogs.add('Poodle');
dogs.add('Poodle');
dogs.add('Golden Retriever');

console.log(dogs.size); // 3
```

### WeakMap and WeakSet

WeakMap is a Map-like collection that allows only objects to be used as keys, and automatically deletes them along with their values ​​as soon as they are otherwise unreachable.

WeakSet is a Set-like collection that stores only objects and deletes them as soon as they are otherwise unreachable.

Objects are deleted automatically by the garbage collector. The collections in question do not create special references to these objects and do not prevent them from being deleted.

Both of these data structures do not support methods and properties that operate on the entire contents at once or return information about the size of the collection.

Only operations on a single element of the collection are possible.

WeakMap and WeakSet are used as auxiliary data structures in addition to the "main" storage location of the object. If an object is removed from the main storage and is not used anywhere except as a key in a WeakMap or WeakSet, it will be removed automatically.

## Modules

Previously, it was only possible to add another JS file via the html script tag:

```JS
<script src="script.js"></script>
```

We added libraries, such as jQuery, to make it easier to write the capabilities that were already in the language. But JavaScript does not stand still, and the concept of connecting modules continued to evolve.

Scripts grew, became more complex, and over time it became more difficult to navigate them. It became inconvenient to add code to the global area, as the script tag does, so script bundlers like Webpack appeared, and then full-fledged environments with their own ecosystem appeared. They were the first to learn how to assemble JavaScript modules, and with the new ECMAScript standards, the language itself learned to do this.

### Export

To access module objects, we need to export them. In plug-ins, we can mark which elements we want to make available for export. To do this, we need to place the export keyword before them:

```JS
export let name = 'John';
export let age = 30;
export function sayHi() {
  console.log('Hi');
}
```

We can export objects only at the top visibility level, this cannot be done inside blocks. We can export variables, functions and classes. We can specify all exported objects at the beginning of the module for convenience:

```JS
export { name, age, sayHi };
```

### Import

Once we have marked the objects in the plugins as exportable, we need to somehow include them where we want to use them. We can do this with the import … from ‘…’ construct:

```JS
import { name, age, sayHi } from './person.js';
```

After the import keyword, we list the names of the imported objects in the destructured object. If we want to import everything that can be imported, we can simply specify an asterisk. But for it, it is better to specify the name that we will call to access this object using the as operator:

```JS
import * as person from './person.js';
```

After the from keyword, we specify the relative path to the file containing the imported module.

We can use the dot at the beginning of the path to indicate the current directory.

Two dots - the directory above. Thus, we shorten the length of the written path.

For example:

```JS
/js-examples/js-modules/person.js
```

Becomes:

```JS
.js-modules/person.js
```

Next, we need to include the main.js module in our HTML page. This is very similar to how we include a regular script in a page, with a few notable differences.

First, you need to add type="module" to the <script> element to declare that the script is a module. To include the main.js module, you would write the following:

```JS
<script type="module" src="main.js"></script>
```

The script where we import the module functionality basically acts as a top-level module.

We can only use import and export statements inside modules, they won't work inside regular scripts. Module plug-ins are read-only.
