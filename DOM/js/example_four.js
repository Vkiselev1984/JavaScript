// Example № 4

document.addEventListener('DOMContentLoaded', function () {
    // 1. Create button element
    const button = document.createElement('button');
    button.textContent = 'Click me'; // Setting button text

    // 2. Add button to <div class="clicker-content"> block
    const contentDiv = document.querySelector('.clicker-content');
    contentDiv.appendChild(button);

    // Variable to track numbers of clicks
    let clickCount = 0;

    // 3. Add button click event handler
    button.addEventListener('click', function () {
        ++clickCount; // Increase click counter
        console.log('Number of button click:', clickCount); // Output number of clicks to the console
    });
});