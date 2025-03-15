# Managing Order List

Implement classes to manage products and orders:

Product Class

- Properties:
  - name — a string representing the name of the product.
  - price — a number representing the price of the product.

Order Class

- Properties:

  - orderNumber — a number, a unique order number.
  - products — an array containing the list of products in the order.

- Methods:
  - addProduct(product) — a method that takes a product object and
    adds it to the list of products in the order.
  - getTotalPrice() — a method that returns the total price of the order, based on the prices of the products.

## Solution

```js
// Product class
class Product {
  constructor(name, price) {
    this.name = name; // Product name
    this.price = price; // Product price
  }
}

// Order class
class Order {
  constructor(orderNumber) {
    this.orderNumber = orderNumber; // Order number
    this.products = []; // Array for storing products in the order
  }

  // Method for adding a product to the order
  addProduct(product) {
    this.products.push(product); // Add the product to the products array
  }

  // Method for getting the total cost of the order
  getTotalPrice() {
    return this.products.reduce((total, product) => total + product.price, 0); // Sum up the prices of all products
  }
}

// Example of using classes
const product1 = new Product("Laptop", 1000);
const product2 = new Product("Mouse", 50);
const product3 = new Product("Keyboard", 100);

// Create a new order
const order = new Order(1);

// Add products to the order
order.addProduct(product1);
order.addProduct(product2);
order.addProduct(product3);

// Get the total cost of the order
console.log(
  `Total price for order #${order.orderNumber}: $${order.getTotalPrice()}`
); // Output: Total price for order #1: $1150
```

1. Product class:

- The constructor takes name (the name of the product) and price (the price of the product) and initializes the corresponding properties.

2. Order class:

- The constructor takes orderNumber (the order number) and initializes the products array to store the products in the order.
- The addProduct(product) method adds the passed product to the products array.
- The getTotalPrice() method uses the reduce method to sum the prices of all the products in the products array and returns the total price of the order.

Example usage:

- We create multiple Product instances and one Order instance.
- Then we add the products to the order using the addProduct method.
- Finally, we print the total price of the order using the getTotalPrice method.
