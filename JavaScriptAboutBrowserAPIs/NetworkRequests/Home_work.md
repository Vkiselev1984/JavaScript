# NetworkRequests

Goal: Build a web app that displays a new random image from the Unsplash collection every day, giving the user the opportunity to learn more about the photographer and like the image.

**Sign up for Unsplash**

- Go to the Unsplash website (https://unsplash.com/).
- Sign up or sign in to your account. (If you haven't registered before, you don't need to create a new account).

**Build the app**

- Go to the Unsplash developer page (https://unsplash.com/developers).
- Click "New Application".
- Fill in the required application information (you can use http://localhost for testing).
- Get your API key after creating the app.

**Build the web app**

- Create an HTML page with the following elements: image, photographer name, like button, and like counter.
- Using JavaScript and your API key, get a random image from Unsplash every time the user loads the page.
- Display information about the photographer under the image.
- Implement the "like" functionality. Each time the user clicks the "like" button, the counter should increase by one.

**Additional tasks (optional)**

- Add a function to save the number of likes to local storage so that the counter does not reset when the page is loaded again.
- Implement the ability to view previous "photos of the day" by saving them in the viewing history.

Solution:

1. Register on the Unsplash website and get API keys, and create a file Create a file named config.js in which we will store them.

```Js
// config.js
const config = {
apiKey: 'YOUR_API_KEY' // Replace YOUR_API_KEY with your actual API key
};


export default config; // Export the config object
```

Add this file to .gitignore.

2. Creating an HTML structure in [index.html](./index.html) file.

3. Add styles to [styles.css](./CSS/styles.css) file.

4. Implementing logic in JavaScript

Let's try to implement a functionality that saves photo data to a file on the server, you will need a backend server that can handle requests to write data. In this case, we can use Node.js with Express to create a simple server that will save data to a JSON file.

1. Installing the required dependencies

We will install Node.js and the following dependencies:

```BASH
npm init -y
npm install express body-parser cors
```

2. Creating a server on Node.js

Let's create a file srver.js in which we will write the code for the server:

```Js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // For static files

// Function for writing data to a file
function saveData(data) {
 fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); // Save data to JSON file
}

// Function for getting data from file
function loadData() {
if (fs.existsSync(dataFilePath)) {
const data = fs.readFileSync(dataFilePath);
return JSON.parse(data);
}
return []; // Return an empty array if the file does not exist
}

// Endpoint for getting data about photos
app.get('/api/history', (req, res) => {
const history = loadData(); // Load history from file
res.json(history); // Send history in response
});

// Endpoint for saving photo data
app.post('/api/history', (req, res) => {
const newEntry = req.body; // Get new data from the request
const history = loadData(); // Load the current history
history.push(newEntry); // Add a new entry to the history
saveData(history); // Save the updated history to a file
res.status(201).json(newEntry); // Send the new entry in the response
});

// Start the server
app.listen(PORT, () => {
console.log(`The server is running on http://localhost:${PORT}`);
});
```

3. Updating the Client Code
   Now let's update script.js so that it sends the photo data to the server when a new image is received.

```Js
import config from './config.js'; // Import the configuration

const imageElement = document.getElementById('random-image');
const photographerElement = document.getElementById('photographer');
const photographerInfoElement = document.getElementById('photographer-info');
const likeButton = document.getElementById('like-button');
const likeCountElement = document.getElementById('count');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let likeCount = 0;
let history = []; // Array for storing image history
let currentImageData = null; // Variable for storing the current image

// Function for getting a random image
async function fetchRandomImage() {
try {
const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${config.apiKey}`);
if (!response.ok) {
throw new Error('Error loading image');
}
currentImageData = await response.json(); // Save the current image data
displayImage(currentImageData);
await addToHistory(currentImageData); // Add the current image to history
} catch (error) {
console.error(error);
}
}

// Function for displaying the image and photographer information
function displayImage(data) {
imageElement.src = data.urls.regular;
photographerElement.innerHTML = `Photo by <a href="${data.user.links.html}" target="_blank">${data.user.name}</a>`;

// Additional information about the photographer
photographerInfoElement.innerHTML = `
<strong>Hobby:</strong> ${data.user.bio || 'No hobby information.'}<br>
<strong>Camera:</strong> ${data.user.portfolio_url || 'Not specified'}<br>
<strong>Location:</strong> ${data.user.location || 'Not specified'}<br>
<strong>Available for Hire:</strong> ${data.user.available_for_hire ? 'Yes' : 'No'}
`;
}

// Function for adding an image to history and saving it to the server
async function addToHistory(data) {
const entry = {
title: data.alt_description || 'Untitled',
imageUrl: data.urls.regular,
photographer: data.user.name,
date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
};

try {
const response = await fetch('/api/history', {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(entry)
});

if (!response.ok) {
throw new Error('Error saving data');
}
history.push(entry); // Add a record to history
} catch (error) {
console.error(error);
}
}

// Like event handler
likeButton.addEventListener('click', () => {
likeCount++;
likeCountElement.innerText = likeCount;
saveLikeCount(); // Save the like count in local storage
});

// Function for saving the like count in local storage
function saveLikeCount() {
localStorage.setItem('likeCount', likeCount);
}

// Function for loading the like count from local storage
function loadLikeCount() {
const savedCount = localStorage.getItem('likeCount');
if (savedCount) {
likeCount = parseInt(savedCount);
likeCountElement.innerText = likeCount;
}
}

// Event handler for the "Previous image" button
prevButton.addEventListener('click', () => {
if (history.length > 1) { // Check if there are previous images
history.pop(); // Remove the current image from history
const previousImageData = history[history.length - 1]; // Get the previous image
if (previousImageData) {
displayImage(previousImageData); // Display the previous image
}
} else {
alert('No previous images!');
}
});

// Event handler for the "Next image" button
nextButton.addEventListener('click', fetchRandomImage);

// Initialization
loadLikeCount();
fetchRandomImage(); // Get a random image when the page loads
```
