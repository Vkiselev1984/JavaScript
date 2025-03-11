## Task 1

You are prototyping a web app for reading news. The articles are "stored" in an internal array
(simulating a database). When the user clicks the "Load News" button, your code should simulate a delay, as if the data were actually being loaded from an external source, and after this delay, display the news on the page.

1. Create a basic HTML structure with a button to load the news and a container to display it.
2. Implement a fetchNews() function that returns a promise. This function should simulate a 2-second delay before successfully returning the data from the "virtual" database. To add interest, it should return an error with a 10% probability instead of data.
3. When the "Load News" button is clicked, call the fetchNews() function, handling success and errors using then() and catch().
4. On successful loading, display the articles on the page. On error, show an error message.
5. Add functionality that disables the download button while the news is being "downloaded" and re-enables it after the operation is completed (whether it is a successful download or an error).

### Solution

[news.html](./news.html)

```JavaScript
// Virtual database with news
const newsDatabase = [
{ title: "First news", content: "Contents of the first news." },
{ title: "Second news", content: "Contents of the second news." },
{ title: "Third news", content: "Contents of the third news." },
];

// Function for simulating loading news
function fetchNews() {
return new Promise((resolve, reject) => {
// Simulate a 2-second delay
setTimeout(() => {
// Throw an error with a 10% probability
if (Math.random() < 0.1) {
reject(new Error("Failed to load news. Try again later."));
} else {
resolve(newsDatabase);
}
}, 2000);
});
}

// Function for displaying news on the page
function displayNews(news) {
const newsContainer = document.getElementById('newsContainer');
newsContainer.innerHTML = ''; // Clear the container before adding new news
news.forEach(article => {
const articleElement = document.createElement('div');
articleElement.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
newsContainer.appendChild(articleElement);
});
}

// Event handler for the news load button
document.getElementById('loadNewsButton').addEventListener('click', () => {
const button = document.getElementById('loadNewsButton');
const errorMessage = document.getElementById('errorMessage');
errorMessage.textContent = ''; // Clear the error message
button.disabled = true; // Disable the button while loading

fetchNews()
.then(news => {
displayNews(news); // Display the news
})
.catch(error => {
errorMessage.textContent = error.message; // Show the error message
})
.finally(() => {
button.disabled = false; // Re-enable the button after loading is complete
});
});
```

## Task 2

Create an interactive web page where users can enter text, save it to localStorage,
and then load or delete the saved data.

Interface Development:

Create an HTML page with:

- One text field for user input.
- Three buttons: "Save", "Load", and "Clear".
- A place to display the saved text.

JavaScript Logic Programming:

1. When "Save" is clicked, the entered text should be saved to localStorage.
2. When "Load" is clicked, the text from localStorage should be displayed on the page.
3. When "Clear" is clicked, the saved text should be deleted from localStorage and a corresponding
   message should be displayed on the page.

### Solution

[localStorage.html](./localStorage.html)

```JavaScript
// Getting elements from the DOM
        const textInput = document.getElementById('textInput');
        const saveButton = document.getElementById('saveButton');
        const loadButton = document.getElementById('loadButton');
        const clearButton = document.getElementById('clearButton');
        const message = document.getElementById('message');

        // Handler for the "Save" button
        saveButton.addEventListener('click', () => {
            const text = textInput.value; // Get the text from the text field
            if (text) {
                localStorage.setItem('savedText', text); // Save the text to localStorage
                message.textContent = "Text saved!";
                textInput.value = ''; // Clear the text field
            } else {
                message.textContent = "Enter text to save.";
            }
        });

        // Handler for the "Load" button
        loadButton.addEventListener('click', () => {
            const savedText = localStorage.getItem('savedText'); // Get the text from localStorage
            if (savedText) {
                textInput.value = savedText; // Display the text in the text field
                message.textContent = "Text loaded!";
            } else {
                message.textContent = "No saved text.";
            }
        });

        // Handler for the "Clear" button
        clearButton.addEventListener('click', () => {
            localStorage.removeItem('savedText'); // Remove the text from localStorage
            message.textContent = "Saved text removed.";
            textInput.value = ''; // Clear the text field
        });
```

## Task 3

Create an interactive web page where users can select different furniture items (e.g. tables, chairs, sofas) and their parameters (material, color, style). The selected parameters should be saved so that when the user revisits the site, he/she can see his/her previously assembled
furniture set.

1. Users can choose from different furniture types (e.g. tables, chairs, sofas).
2. For each furniture type, a choice of parameters (color, material, style) is available.
3. Provide a "Save Set" button, which, when clicked, saves the user's current selection
   to localStorage.
4. When the user revisits the site, automatically load the saved parameters from localStorage and
   display the previously created set.
5. Provide the ability for the user to clear the saved settings via a special
   button.
6. After clicking the "Save" button, the selected set should be displayed on the page.
7. When you click the "Clear" button, a message should appear stating that no selection has been made and the previous settings have been deleted.

### Solution

[Parms.html](./params.html)

```JavaScript
// Function for loading saved settings from localStorage
        function loadSettings() {
            const savedSettings = JSON.parse(localStorage.getItem('furnitureSettings'));
            if (savedSettings) {
                document.getElementById('furnitureType').value = savedSettings.type;
                document.getElementById('material').value = savedSettings.material;
                document.getElementById('color').value = savedSettings.color;
                document.getElementById('style').value = savedSettings.style;
                displaySelectedFurniture(savedSettings);
            }
        }

        // Function for displaying the selected furniture set
        function displaySelectedFurniture(settings) {
            const selectedFurniture = document.getElementById('selectedFurniture');
            selectedFurniture.innerHTML = `<h2>Selected set:</h2>
<p>Type: ${settings.type}</p>
<p>Material: ${settings.material}</p>
<p>Color: ${settings.color}</p>
<p>Style: ${settings.style}</p>`;
        }

        // Handler for the "Save set" button
        document.getElementById('saveButton').addEventListener('click', () => {
            const type = document.getElementById('furnitureType').value;
            const material = document.getElementById('material').value;
            const color = document.getElementById('color').value;
            const style = document.getElementById('style').value;

            if (type && material && color && style) {
                const furnitureSettings = {
                    type,
                    material,
                    color,
                    style
                };
                localStorage.setItem('furnitureSettings', JSON.stringify(furnitureSettings));
                displaySelectedFurniture(furnitureSettings);
                document.getElementById('message').textContent = "Set saved!";
                document.getElementById('errorMessage').textContent = ''; // Clear the error message
            } else {
                document.getElementById('errorMessage').textContent = "Please select all options.";
            }
        });

        // Handler for the "Clear Settings" button
        document.getElementById('clearButton').addEventListener('click', () => {
            localStorage.removeItem('furnitureSettings'); // Remove settings from localStorage
            document.getElementById('selectedFurniture').innerHTML = ''; // Clear the display of the selected set
            document.getElementById('message').textContent = ''; // Clear the message about saving
            document.getElementById('errorMessage').textContent = "Selection cleared. Previous settings have been removed."; // Message about clearing
        });

        // Load settings on page load
        loadSettings();
```
