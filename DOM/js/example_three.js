// Example № 3

document.addEventListener('DOMContentLoaded', function () {
    // 1. Create a new element <p>
    const newParagraph = document.createElement('p');

    // 2. Add the text "New text element" to the new element
    newParagraph.textContent = 'New text element';

    // 3. Add the created element inside <div class="content">
    const contentDiv = document.querySelector('.content');
    contentDiv.appendChild(newParagraph);

    // 4. Remove the added element
    contentDiv.removeChild(newParagraph);
});