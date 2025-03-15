# Promise

Let's imagine that you order something in an online store. You ordered, the parcel takes some time to get to you, then you receive it and use it.

While waiting for delivery, you can also order more goods in new parcels or prepare to receive those you have already ordered - buy or make packaging if it is a gift for someone, clear a place for installation if the parcel is large, and so on.

Waiting for the parcel does not block you, the seller can also send you or someone else other parcels. This sending is called asynchronous.

A Promise is a promise that we will now start an operation and it will be executed sometime in the future. As in the example above, the store sent a parcel, it is like a promise that we will someday receive the thing we need.

When we receive it, then we will be able to use it, but in the meantime we can do other equally important things.

Of course, the work of the Promise object in JavaScript is somewhat more complicated, but the example given allows us to understand the general idea.

The format for creating a Promise instance:

```Js
const promise = new Promise(function(resolve, reject) => {
  // some code
});
```

The function passed to the promise constructor is the executor function. It is itself a callback and should be called when the promise is created. In our example, it is the seller who sent the parcel.

The callback arguments inside the promise — resolve and reject — are also, in turn, callbacks and should be called when some result is achieved:

- Resolve is called upon successful completion, in our example — when the parcel has arrived. Upon successful completion, we will have the value result.
- Reject is called when an error occurs, in our example — when the parcel is lost or damaged. The error will return the error result.

The promise object returned by the new Promise constructor has internal properties:

- state — initially “pending”, then changes to “fulfilled” upon successful completion (resolve executed) or to “rejected” when errors occur (reject executed).
- result - while waiting it is undefined, then it will change to value if successful, or to error if errors occur.

Let's try to create a promise using the timeout function:

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});
```

## Using Promises: then()

You won't create new promises very often in your practice.

It's much more important to learn how to use ready-made promises. For example, using the existing fetch() promise, you will most likely request data from a pluggable backend server. We will study it later in this course.

And now we need to learn how to use promises in general. And the most frequently used method in promises is the then() method.

Its syntax is as follows:

```Js
promise.then(onFulfilled, onRejected);
```

Where onfulfilled and onrejected are almost always callback handlers. Both parameters are optional, but then is most often used with one onfulfilled parameter:

```Js
promise.then(onFulfilled);
```

> 🔥 When a promise is fulfilled, only one corresponding parameter will be called. The second parameter will be ignored. If only one onfulfilled parameter was called, it will only be executed upon successful fulfillment.

Оnfulfilled will be executed when the promise execution was successful.

Onrejected will be executed only if there was an error.

Why are callbacks used as parameters? Everything is simple here. We need some action based on the results of the promise execution. It will not be available to us synchronously, so the code:

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

promise.then(function(result) {
  console.log(result); // done
});
```

All handlers must be callbacks and can be placed directly into the body of the then() method. In fact, this is often what is done:

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

promise.then(
  result => console.log(result), // done
  error => console.log(error) // ignored
);
```

If there is only one variable in the parameter, we can call the callback without parentheses at the beginning. If there are several parameters or they are complex, then parentheses are required:

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

promise.then(
  result => console.log(result), // done
  error => console.log(error) // ignored
);
```

## Error Handling Methods

### The catch() Method

To handle errors in promises, the catch() and finally() methods are used. And... where have we seen them before? That's right. In the previous lesson, in the try...catch...finally construct. Moreover, they work in a similar way.
🔥 Let us remind you that the try...catch...finally construct only works in synchronous code and there is no point in using it when working with promises.

As you saw, in the previous examples, I almost never used the second parameter of the then() method. This is because its operation is similar to the catch() method. So why do we use two constructs with a similar principle of operation? The thing is
that at first, promises only had the then() method and errors could only be handled in one way. Then they decided to introduce error handling in the new standards, similar in syntax and functionality to the existing try...catch...finally construct, and left the old usage for compatibility. But no one forbids using the then() method in the old way.

Calling catch(onrejected) is similar to calling then(null, onrejected). If we don't need to process the data that comes with a successful promise, we don't have to call the then() method at all.

In catch methods, we can throw errors for proper further processing and thus handle several types of errors. This is done using the throw operator that we already know. And if we handle all errors in catch(), we can continue working further and control will pass to the next then() method:

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
});

promise.then(result => console.log(result)).catch(error => console.log(error)); // Error: Whoops!
```

### The finally() Method

The finally() method is used to execute code after the promise is resolved or rejected. It is called regardless of the result of the promise.

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.log(error))
  .finally(() => console.log("finally")); // Error: Whoops! finally
```

## Promise Chaining

The then() method returns a new promise, so we can call the then() method again on the result of the previous promise. This is called promise chaining.

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

promise.then(result => {
  console.log(result); // done
  return result;
});
```

### Promise Chaining with then()

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

promise
  .then(result => {
    console.log(result); // done
    return result;
  })
  .then(result => {
    console.log(result); // done
    return result;
  });
```

### Promise Chaining with catch()

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

promise
  .then(result => {
    console.log(result); // done
    return result;
  })
  .catch(error => {
    console.log(error); // Error: Whoops!
    return "error";
  })
  .then
  (result => {
    console.log(result); // error
    return result;
  });
```

### Promise Chaining with finally()

```Js
const promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("done"), 1000);
});

promise
  .then(result => {
    console.log(result); // done
    return result;
  })
  .catch(error => {
    console.log(error); // Error: Whoops!
    return "error";
  })
  .finally
  (() => {
    console.log("finally"); // finally
    return "finally";
  })
  .then(result => {
    console.log(result); // error
    return result;
  });
```

### Promise Chaining with all()

```Js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([promise1, promise2, promise3]).then(values => {
  console.log(values); // [3, 42, "foo"]
});
```

### Promise Chaining with race()

```Js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(value => {
  console.log(value); // "two" (resolved faster)
});
```

### Promise Chaining with allSettled()

```Js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "error");
});
const promise3 = Promise.resolve(4);

Promise.allSettled([promise1, promise2, promise3]).then(values => {
  console.log(values); // [{status: "fulfilled", value: 3}, {status: "rejected", reason: "error"}, {
  status: "fulfilled", value: 4}]
});
```

### Promise Chaining with any()

```Js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "error");
});
const promise3 = Promise.resolve(4);

Promise.any([promise1, promise2, promise3]).then(value => {
  console.log(value); // 3 (fulfilled first)
});
```

### Promise Chaining with resolve()

```Js
const promise = Promise.resolve("foo");

promise.then(result => {
  console.log(result); // foo
});
```

### Promise Chaining with reject()

```Js
const promise = Promise.reject(new Error("Whoops!"));

promise.catch(error => {
  console.log(error); // Error: Whoops!
});
```

### Promise Chaining with then() and catch()

```Js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve("done"), 1000);
});

promise.then(result => {
  console.log(result); // done
  return result;
})
  .catch(error => {
    console.log(error); // Error: Whoops!
    return "error";
  })
  .then(result => {

    console.log(result); // error
    return result;
  });
```
