# Task 1

Let's create a class to manage a bank account. This class will have a private property to store the current balance, and methods to deposit and withdraw money from the account.

1. The class should contain a private property #balance, which is initialized
   to 0 and represents the current balance of the account.
2. Implement a getter balance, which will allow you to get information about the current balance.
3. Implement the method deposit(amount), which will allow you to deposit funds to the account.
   Make sure the deposit amount is not negative; otherwise, throw an error.
4. Implement the method withdraw(amount), which will allow you to withdraw funds from the account.
   Make sure the withdrawal amount is not negative and that the account has enough funds; otherwise, throw an
   error.
5. Implement a constructor that takes the initial balance as an argument.
   Make sure the initial balance is not negative; otherwise throw an error.

## Solution

```javascript
class BankAccount {
  // Class constructor
  constructor(initialBalance = 0) {
    // Check that the initial balance is not negative
    if (initialBalance < 0) {
      throw new Error("The initial balance cannot be negative.");
    }
    this.#balance = initialBalance; // Initialize the private property #balance
  }

  // Private property for storing the current balance
  #balance;

  // Getter for getting the current balance
  get balance() {
    return this.#balance;
  }

  // Method for depositing funds to the account
  deposit(amount) {
    if (amount < 0) {
      throw new Error("The deposit amount cannot be negative.");
    }
    this.#balance += amount; // Increase the balance
  }

  // Method for withdrawing funds from an account
  withdraw(amount) {
    if (amount < 0) {
      throw new Error("Withdrawal amount cannot be negative.");
    }
    if (amount > this.#balance) {
      throw new Error("Not enough funds in the account.");
    }
    this.#balance -= amount; // Decrease the balance
  }
}

// Example of using the BankAccount class
try {
  const account = new BankAccount(500); // Create a new account with an initial balance of 500
  console.log("Current balance:", account.balance); // Display the current balance

  account.deposit(200); // Deposit 200
  console.log("Balance after deposit:", account.balance); // Display the balance after deposit

  account.withdraw(100); // Withdraw 100
  console.log("Balance after withdrawal:", account.balance); // Display balance after withdrawal

  // Try to deposit a negative amount
  account.deposit(-20); // This will cause an error
} catch (error) {
  console.error(error.message); // Handle errors
}
```

The constructor takes the initial balance as an argument. If the initial balance is negative, an error is thrown.

The getter allows you to get the current account balance. It returns the value of the private property #balance.

Deposit(amount) and withdraw(amount) allow you to deposit funds into or withdraw funds from your account. If the deposit amount is negative, an error is thrown.

## Task 2

You have a basic list of users. Some of them have information about their premium account, and some do not.
Your task is to create a class structure for these users and a function to get information about the presence of a premium account using Optional chaining, the null coalescing operator, and instanceof.

1. Create a base class User with basic information (for example, first and last name).
2. Create classes PremiumUser and RegularUser that inherit from User. The class
   PremiumUser must have a premiumAccount property (say, expiration date), but RegularUser does not.
3. Create a function getAccountInfo(user) that takes an object of the User class and
   returns information about the presence and expiration date of a premium account using
   Optional chaining and the null coalescing operator.
4. In the getAccountInfo function, use instanceof to check the type of the passed user and respond accordingly.

### Solution

```javascript
// 1. Base class User
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName; // First name
    this.lastName = lastName; // Last name
  }
}

// Class PremiumUser, inherited from User
class PremiumUser extends User {
  constructor(firstName, lastName, premiumAccount) {
    super(firstName, lastName); // Call the base class constructor
    this.premiumAccount = premiumAccount; // Premium account expiration date
  }
}

// Class RegularUser, inherited from User
class RegularUser extends User {
  constructor(firstName, lastName) {
    super(firstName, lastName); // Call base class constructor
    // RegularUser has no premiumAccount property
  }
}

// Function to get premium account information
function getAccountInfo(user) {
  // Check if user is PremiumUser
  if (user instanceof PremiumUser) {
    // Use optional chaining and null coalescing operator
    return `User: ${user.firstName} ${user.lastName}, Premium account until: ${
      user.premiumAccount?.expiryDate ?? "not specified"
    }`;
  } else if (user instanceof RegularUser) {
    return `User: ${user.firstName} ${user.lastName}, No Premium account.`;
  } else {
    return "Unknown user type.";
  }
}

// Usage example
const premiumUser = new PremiumUser("Ivan", "Ivanov", {
  expiryDate: "2023-12-31",
});
const regularUser = new RegularUser("Petr", "Petrov");

console.log(getAccountInfo(premiumUser)); // User: Ivan Ivanov, Premium account until: 2023-12-31
console.log(getAccountInfo(regularUser)); // User: Petr Petrov, no Premium account.
```

## Task 3

You are creating an interface where the user enters a number.

Your task is to check whether the entered value is a number or not and give an appropriate answer.

1. Create an HTML structure: a text field for entering a number and a "Check" button.
2. Add a place (for example, a div) to display a message to the user.
3. Write a function that will be called when the button is clicked. This function should use try and catch to check the entered value.

### Solution

We have created a [text field with the id numberInput](./checkNumber.html) where the user can enter a value.

The button with the id checkButton starts the check when clicked.

The div with the id message is used to display messages to the user.

```Javascript
 // Function to check if the entered value is a number
        function checkNumber() {
            const input = document.getElementById('numberInput').value; // Get the value from the text field
            const messageDiv = document.getElementById('message'); // Get the element to display the message

            try {
                // Try to convert the entered value to a number
                const number = Number(input);

                // If the converted value is not a number, throw an error
                if (isNaN(number)) {
                    throw new Error("The entered value is not a number.");
                }

                // If everything is OK, display a message that this is a number
                messageDiv.textContent = `You entered a number: ${number}`;
            } catch (error) {
                // If an error occurs, display an error message
                messageDiv.textContent = error.message;
            }
        }

        // Bind an event handler to the button
        document.getElementById('checkButton').addEventListener('click', checkNumber);
```

## Task 4

Your site users can add items to the list. But there is a condition: the entered value must contain from 3 to 10 characters.

1. Create an HTML structure with a text field, a button, and a list.
2. Write a function that will add items to the list or
   throw an exception if the length of the entered value does not meet the requirements.

### Solution

```Javascript
// Function for adding an item to the list
function addItem() {
const input = document.getElementById('itemInput').value; // Get the value from the text field
const itemList = document.getElementById('itemList'); // Get the list item
const errorMessage = document.getElementById('errorMessage'); // Get the element to display the error message

try {
// Check the length of the input value
if (input.length < 3 || input.length > 10) {
throw new Error("The length of the input value must be between 3 and 10 characters.");
}

// Create a new list item
const listItem = document.createElement('li');
listItem.textContent = input; // Set the text of the item

// Add a new item to the list
itemList.appendChild(listItem);

// Clear the text field and the error message
document.getElementById('itemInput').value = '';
errorMessage.textContent = '';
} catch (error) {
// Display the error message
errorMessage.textContent = error.message;
}
}

// Bind the event handler to the button
document.getElementById('addButton').addEventListener('click', addItem);
```

We [create a text field](./addItem.html) with the id itemInput where the user can enter a value.

The button with the id addButton triggers the addition of an item when clicked.

ul with the id itemList is used to display the list of added items.

div with the id errorMessage is used to display error messages.

AddItem function:

- Gets the value from the text field and stores it in the input variable.
- Gets the list items and the error message.
- Uses the try construct to check the length of the entered value.
- If the value's length is less than 3 or greater than 10, an error is thrown with the appropriate message.
- If the value's length is correct, a new list item (li) is created and added to the ul.
- Clears the text field and the error message after a successful addition.

The catch block handles the error and displays the appropriate message.
