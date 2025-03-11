## Task 1

- Using Symbol.iterator, create a Music Collection object that can be iterated over. Each iteration should return the next album in the collection.

- Create a musicCollection object that contains an array of albums and has a Symbol.iterator property. Each album has the following structure:

{
title: "Album Title",
artist: "Artist",
year: "Release Year"
}

- Implement a custom iterator for the musicCollection object. The iterator should iterate over the albums in order.
- Use a for...of loop to iterate over the albums in the music collection and print them to the console in the format: Album Title - Artist (Release Year)

### Solution

To create a Music Collection object that can be iterated over, we will use Symbol.iterator. Each iteration will return the next album from the collection.

```javascript
// Create a music collection object
const musicCollection = {
  albums: [
    { title: "The Dark Side of the Moon", artist: "Pink Floyd", year: 1973 },
    { title: "Abbey Road", artist: "The Beatles", year: 1969 },
    { title: "Thriller", artist: "Michael Jackson", year: 1982 },
    { title: "Back in Black", artist: "AC/DC", year: 1980 },
    { title: "Rumours", artist: "Fleetwood Mac", year: 1977 },
  ],

  // Iterator implementation
  [Symbol.iterator]: function () {
    let index = 0; // Starting index for iteration
    const albums = this.albums; // Reference to albums array

    return {
      next: function () {
        if (index < albums.length) {
          return { value: albums[index++], done: false }; // Return the album and continue iterating
        } else {
          return { done: true }; // End iteration
        }
      },
    };
  },
};

// Use for...of loop to loop through albums
for (const album of musicCollection) {
  console.log(`${album.title} - ${album.artist} (${album.year})`);
}
```

Create an object that contains an array of albums, where each album is represented by an object with the fields title, artist, and year.

Add a Symbol.iterator property that returns an object with a next() method. This method controls the iteration over the albums array.

Use a for...of loop to iterate through the albums and output them to the console in the desired format.

## Task 2

You run a restaurant that has different chefs who specialize in certain dishes. Customers come in and order different dishes.

You need to create a system for managing these orders that will allow you to:

- Track which chef is preparing which dish.
- Record what dishes each customer ordered.

Use Map collections to store dishes and their cooks, and to store each customer's orders. Use objects as keys for customers.

Cooks and their specialties:

- Victor - specialty: Pizza.
- Olga - specialty: Sushi.
- Dmitry - specialty: Desserts.

Dishes and their cooks:

- Pizza "Margherita" - cook: Victor.
- Pizza "Pepperoni" - cook: Victor.
- Sushi "Philadelphia" - cook: Olga.
- Sushi "California" - cook: Olga.
- Tiramisu - cook: Dmitry.
- Cheesecake - cook: Dmitry.

Orders:

- Customer Alexey ordered: Pizza "Pepperoni" and Tiramisu.
- Client Maria ordered: California Sushi and Margarita Pizza.
- Client Irina ordered: Cheesecake.

### Solution

```javascript
// Create a Map to store dishes and their cooks
const dishesMap = new Map([
  ["Pizza 'Margarita'", "Victor"],
  ["Pizza 'Pepperoni'", "Victor"],
  ["Sushi 'Philadelphia'", "Olga"],
  ["Sushi 'California'", "Olga"],
  ["Tiramisu", "Dmitry"],
  ["Cheesecake", "Dmitry"],
]);

// Create a Map to store customer orders
const ordersMap = new Map();

// Function for adding a customer order
function addOrder(customer, dishes) {
  ordersMap.set(customer, dishes);
}

// Create objects for customers
const alexey = { name: "Alexey" };
const maria = { name: "Maria" };
const irina = { name: "Irina" };

// Add orders
addOrder(alexey, ["Pizza 'Pepperoni'", "Tiramisu"]);
addOrder(maria, ["Sushi 'California'", "Pizza 'Margarita'"]);
addOrder(irina, ["Cheesecake"]);

// Display orders and information about cooks
for (const [customer, dishes] of ordersMap) {
  console.log(`${customer.name} ordered: ${dishes.join(", ")}`);
  dishes.forEach((dish) => {
    console.log(`- ${dish} cooks: ${dishesMap.get(dish)}`);
  });
}
```

We create a dishesMap that stores the correspondence between dishes and cooks, and an ordersMap where the keys are customer objects and the values ​​are arrays of dishes they ordered.

The addOrder function adds customer orders to the ordersMap.

We create objects for each customer (Alexey, Maria, and Irina).

We add orders for each customer using addOrder.

We loop through the orders and print out information about what dishes each customer ordered and who is cooking them.
