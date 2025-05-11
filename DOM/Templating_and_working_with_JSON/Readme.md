# Templating and working with JSON

## Introduction to JSON

JSON (short for JavaScript Object Notation) is a data transfer format. As its name suggests, JSON originated in JavaScript, but it is also available for use in many other languages, including Python, Ruby, PHP, and Java. In English-speaking countries, the format's name is usually pronounced as Jason, and in Russian-speaking countries, it is usually pronounced with the stress on the "o": Jison.

JSON itself uses the .json extension. When it is defined in other file formats, such as .html, it appears in quotes as a JSON string or can be an object assigned to a variable. This format is easy to transfer between a server and a client (such as a browser).

Easy to read and compact, JSON is a good alternative to XML and requires much less content formatting. Let's take a look at the data you can use in JSON, as well as the basic structure and syntax of the format.

In JavaScript programs, JSON is typically used for the following purposes:

1. Storing data.
2. Generating data structures from user input.
3. Exchanging data between the server and the client.
4. Setting up and validating data.

## Syntax and Structure

A JSON object stores data in a key-value format and is usually rendered in curly braces. When you work with JSON, you most likely see JSON objects in a .json file, but they can also be represented as a JSON object or string in the context of the program itself.

Here's what a JSON object looks like:

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

While this is a short example, and the JSON could be much longer, it shows that this format represents data as a block of keys and values, enclosed in curly braces. Most data used in JSON is enclosed in JSON objects.

The key-value pairs are separated by a colon: for example, "key" : "value". The pairs are separated by commas, so the middle of the JSON looks like this: "key" : "value", "key" : "value", "key" : "value". In our example above, the first key-value pair is "first_name" : "Sammy".

Keys in JSON are on the left side of the colon. They must be enclosed in quotes, as is the case with "key". The key name can be any string. Keys must be unique within each object. The key string can contain spaces, as in "first name", but this can make it difficult to access them during development, so a better option is to use underscores: "first_name".

JSON values ​​are on the right side of the colon and must be one of six data types: string, number, object, array, boolean, or null.

In some cases, values ​​can also consist of complex data types, such as a JSON object or array.

Each data type that is passed as values ​​in JSON supports its own syntax, so strings are written in quotes, but numbers are not.

Although .json files typically span key-value pairs across multiple lines, JSON can also be written on a single line:

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

This approach is common in other file formats or when working with a JSON string.

Working with JSON in a multiline format often makes it more readable, especially when you're trying to deal with a large data set. Since JSON ignores whitespace between its elements, you can use whitespace as an additional delimiter to make the data easier for humans to read:

```json
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
```

It is very important to remember that, despite all the visual similarities, JSON objects are formatted differently from JavaScript objects. And while you can use functions inside JavaScript objects, you cannot use them as values ​​in JSON.
The most important property of the JSON format is that it is “understood” by a wide variety of programming languages,
so it can be easily transferred between applications. JavaScript objects can only be manipulated directly through JavaScript.

So far we have seen JSON in its simplest cases, but it can become hierarchical and complex, including nested objects and arrays. Now we will look at a more complex example of JSON.

## Working with Complex Types in JSON

In addition to nested arrays, JSON can contain other nested objects.

Such objects and arrays will be passed as values ​​assigned to keys, and will represent a key-value pair.

### Nested Objects

For each of the four users ("sammy", "jesse", "drew", "jamie") there is a nested value-passing JSON object, with its own nested keys, "username" and "location". The first nested JSON:

```json
{
  "sammy": {
    "username": "sammyshoes",
    "location": "New York"
  }
}
```

### Nested Arrays

In JSON, data can also be nested using JavaScript arrays, which are passed as values. JavaScript uses square brackets to format an array: []. Arrays are essentially ordered collections and can contain values ​​of completely different data types. For example:

```json
{
  "sammy": {
    "username": "sammyshoes",
    "location": "New York"
  },
  "jesse": {
    "username": "jesse",
    "location": "San Francisco"
  },
  "drew": {
    "username": "drew",
    "location": "New York"
  },
  "jamie": {
    "username": "jamie",
    "location": "New York"
  },
  "users": [
    {
      "username": "sammyshoes",
      "location": "New York"
    },
    {
      "username": "jesse",
      "location": "San Francisco"
    },
    {
      "username": "drew",
      "location": "New York"
    },
    {
      "username": "jamie",
      "location": "New York"
    }
  ]
}
```

We can use an array when working with large amounts of data that can be easily grouped . For example, if you have several different websites and social media profiles associated with a single user.

Example:

```json
{
  "first_name": "Sammy",
  "last_name": "Shark",
  "location": "Ocean",
  "websites": [
    {
      "description": "work",
      "URL": "https://www.digitalocean.com/"
    },
    {
      "desciption": "tutorials",
      "URL": "https://www.digitalocean.com/community/tutorials"
    }
  ],
  "social_media": [
    {
      "description": "twitter",
      "link": "https://twitter.com/digitalocean"
    },
    {
      "description": "facebook",
      "link": "https://www.facebook.com/DigitalOceanCloudHosting"
    },
    {
      "description": "github",
      "link": "https://github.com/digitalocean"
    }
  ]
}
```

The "websites" and "social_media" keys use an array to nest information about the user's websites and social media profiles. We know they are arrays because of the square brackets.

Using nesting in our JSON format allows us to work with the most complex and hierarchical data. [https://jsonplaceholder.typicode.com/comments](https://jsonplaceholder.typicode.com/comments) is an example of what hierarchical JSON data looks like and how large it can be.

## Functions in JSON

When working with JSON, it is very useful to be able to quickly convert a string to an object and vice versa. In this section, we will look at two JSON methods.

### JSON.stringify() function

The JSON.stringify() function converts JSON objects to strings. Strings allow you to simplify the exchange of data between the server and the client. For example, you can collect user settings on the client side and then pass them to the
server. You can then convert the string to an object using the JSON.parse() method.

Consider the object assigned to the obj variable. Try converting it to a string. To do this, you need to pass the obj variable to the JSON.stringify() function. Assign this string to the s variable.

```JavaScript
const obj = {"first_name" : "John", "last_name" : "Smith", "location" :
"London"}
const s = JSON.stringify(obj)
```

### JSON.parse() Function

Strings are useful for exchanging data, but then they need to be converted back into objects.
To do this, use the JSON.parse() function.

> Note: To convert text to an object, use the eval() function.

Now try converting the function value s to an object and assigning it to a new variable:

```JavaScript
const obj = {"first_name" : "John", "last_name" : "Smith", "location" :
"London"}
const s = JSON.stringify(obj)
const obj2 = JSON.parse(s)
```

Let's look at another example. The JSON.parse() function can be used in the context of an HTML file:

```Html
<!DOCTYPE html>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <p id="user"></p>
    <script>
        const userInfo = '{"first_name" : "John", "last_name" : "Smith", "location" : "London"}';
        const obj = JSON.parse(userInfo);
        document.getElementById("user").innerHTML =
            "Name: " + obj.first_name + " " + obj.last_name + "<br>" +
            "Location: " + obj.location;
    </script>
</body>

</html>
```

## Practice

### Task 1

1. Create a data.js file
2. Create a variable dataInfo
3. Add some data to dataInfo

You can create a file named data.js in your project directory. Here’s an example of what the contents of that file might look like:

```JavaScript
const dataInfo = {
    users: [
        {
            firstName: "John",
            lastName: "Doe",
            age: 30,
            location: "New York"
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            age: 25,
            location: "Los Angeles"
        },
        {
            firstName: "Alice",
            lastName: "Johnson",
            age: 28,
            location: "Chicago"
        }
    ],
    message: "This is a sample data for demonstration purposes."
};

// Export the dataInfo variable if you plan to use it in another file
export default dataInfo;
```

#### Explanation:

We declare a variable named dataInfo that contains an object. This object has a property users, which is an array of user objects. Each user object contains firstName, lastName, age, and location.

#### Exporting the Variable:

If you plan to use this dataInfo variable in another JavaScript file, you can export it using export default dataInfo;. This allows you to import it in other files.

If you want to use the dataInfo variable in another JavaScript file, you can do so like this:

```JavaScript
<script type="module">
        import dataInfo from './data.js';

        console.log(dataInfo);
    </script>
```

Here’s an example of how to include it in an HTML file:

```Html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Example</title>
</head>
<body>
    <script type="module">
        import dataInfo from './data.js';

        console.log(dataInfo);
    </script>
</body>
</html>
```

### Task 2

Using foreach to iterate over the data array:

#### Step 1: Update data.js

Ensure your data.js file contains the dataInfo variable as previously defined:

```JavaScript
const dataInfo = {
    users: [
        {
            firstName: "John",
            lastName: "Doe",
            age: 30,
            location: "New York"
        },
        {
            firstName: "Jane",
            lastName: "Smith",
            age: 25,
            location: "Los Angeles"
        },
        {
            firstName: "Alice",
            lastName: "Johnson",
            age: 28,
            location: "Chicago"
        }
    ],
    message: "This is a sample data for demonstration purposes."
};

// Export the dataInfo variable
export default dataInfo;
```

#### Step 2: Update js scropt

```JavaScript
import dataInfo from './data.js';

// Iterate over the users array using forEach
dataInfo.users.forEach(user => {
    console.log(`Name: ${user.firstName} ${user.lastName}, Age: ${user.age}, Location: ${user.location}`);
});
```

#### Step 3: HTML File to Run the Code

```Html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Data Example</title>
</head>
<body>
    <script type="module">
        import dataInfo from './data.js';
        dataInfo.users.forEach(user => {
            console.log(`Name: ${user.firstName} ${user.lastName}, Age: ${user.age}, Location: ${user.location}`);
        });
    </script>
</body>
</html>
```

### Task 3

1. Create all necessary headings, paragraphs, images (from json data)

We'll create a JSON structure that contains the data we want to display. You can save this data in a file called data.json or directly in your JavaScript code.

Example JSON Data ([text_data.json](./text_data.json))

2. Add all content to the content block
3. Add styles if necessary

Example HTML ([text_page.html](./text_page.html))

## Homework

### Task

1. Get data from https://fakestoreapi.com/products.
2. Create a data.js file.
3. In the data.js file, create a dataJSON variable that will
   store this data in JSON format.
4. Create a second data variable in which you will store the data in an array format based on dataJSON.
5. Create an index.html file.
6. Include data.js in index.html.
7. Generate content from the data (picture, title, description,
   price and the “Add to Cart” button).
8. Add this content to the layout as a ul and li list.
9. Add styles if necessary (optional).

### Solution

```Html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,
initial-scale=1.0">
<title>Products List</title>
<style>
/* Styles as desired */
ul {
list-style-type: none;
padding: 0;
}
li {
margin: 20px 0;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
display: flex;
align-items: center;
flex-direction: column;
}
img {
margin-bottom: 10px;
}
h2 {
margin: 0;
font-size: 1.5rem;
}
button {
margin-top: 10px;
padding: 10px 15px;
border: none;
border-radius: 5px;
background-color: #007bff;
color: white;
cursor: pointer;
}
button:hover {
background-color: #0056b3;
}
</style>
</head>
<body>
<h1>Products List</h1>
<ul id="product-list">
<!-- Products will be added here -->
</ul>
<!-- Including the data.js file -->
<script src="data.js"></script>
<!-- Including the script.js file -->
<script src="script.js"></script>
</body>
</html>
```

```JavaScript
// hw_data.js

const dataJSON = [];

// Fetch data from the API
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        // Store the fetched data in dataJSON
        dataJSON.push(...data);
        // Call function to generate product list
        generateProductList(dataJSON);
    })
    .catch(error => console.error('Error fetching the data:', error));

// Function to generate product list
function generateProductList(products) {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const listItem = document.createElement('li');

        // Create and append the product image
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.style.width = '100px'; // Set a fixed width for images
        listItem.appendChild(img);

        // Create and append the product title
        const title = document.createElement('h2');
        title.textContent = product.title;
        listItem.appendChild(title);

        // Create and append the product description
        const description = document.createElement('p');
        description.textContent = product.description;
        listItem.appendChild(description);

        // Create and append the product price
        const price = document.createElement('p');
        price.textContent = `Price: $${product.price}`;
        listItem.appendChild(price);

        // Create and append the "Add to Cart" button
        const button = document.createElement('button');
        button.textContent = 'Add to Cart';
        button.onclick = () => {
            alert(`Added ${product.title} to cart!`);
        };
        listItem.appendChild(button);

        // Append the list item to the product list
        productList.appendChild(listItem);
    });
}
```
