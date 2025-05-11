// data.js

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