// Example № 5

document.addEventListener('DOMContentLoaded', function () {
    // 1. Create new button element
    const button = document.createElement('button');

    // 2. Add text for "Send" button
    button.textContent = 'Send';

    // 3. Add a button to <div class="sender-content"> block
    const contentDiv = document.querySelector('.sender-content');
    contentDiv.appendChild(button);

    // 4. Add button click event handler and change button text to "Text sent"
    button.addEventListener('click', function () {
        button.textContent = 'Text sent';
    });
});