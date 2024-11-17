document.addEventListener('DOMContentLoaded', function () {
    // 1. Find element by id "super_link" and output it to console
    const superLink = document.getElementById('super_link');
    console.log('Element with id "super_link":', superLink);

    // 2. Change text inside all elements with class card-link to "link"
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.textContent = 'link';
    });

    // 3. Find all elements with card-link class inside an element with card-body class and output collection to console
    const cardBodyLinks = document.querySelectorAll('.card-body .card-link');
    console.log('Elements with class card-link inside card-body:', cardBodyLinks);

    // 4. Find first element with data-number attribute with value 50 and output it to the console
    const dataNumberElement = document.querySelector('[data-number="50"]');
    console.log('First element is data-number="50":', dataNumberElement);

    // 5. Output title to console
    const titleContent = document.title;
    console.log('Tag contents title:', titleContent);

    // 6. Get an element with class card-title and output its parent node to console
    const cardTitle = document.querySelector('.card-title');
    console.log('Parent node of an element with a class card-title:', cardTitle.parentNode);

    // 7. Create <p> tag, write text "Hello" and add it to beginning of element with class card
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'Hello';
    const cardElement = document.querySelector('.card');
    cardElement.insertBefore(newParagraph, cardElement.firstChild);

    // 8. Remove h6 tag on the page
    const h6Element = document.querySelector('h6');
    if (h6Element) {
        h6Element.remove();
    }
});