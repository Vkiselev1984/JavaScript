// Example № 2

document.addEventListener('DOMContentLoaded', function () {
    // 1. Change the text inside the link and the href attribute
    const link = document.querySelector('.link');
    link.textContent = 'link text js'; // Changing the text
    link.href = 'https://developer.mozilla.org/ru/'; // Change href

    // 2. Changing the src value for an image
    const img = document.querySelector('.photo');
    img.src = 'https://via.placeholder.com/150'; // Set the image URL
    img.alt = 'placeholder'; // Setting alt text
});