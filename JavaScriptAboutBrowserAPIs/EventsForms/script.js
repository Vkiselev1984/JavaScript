// script.js
const images = [
    './images/IronMaden.png',
    './images/IronMaden2.png',
    './images/IronMaden3.png'
];

let currentIndex = 0;

// Function for displaying the current image
function updateImage() {
    const sliderImage = document.getElementById('slider-image');
    sliderImage.src = images[currentIndex];

    // Update indicators
    updateIndicators();
}

// Function for updating indicators
function updateIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = ''; // Clear indicators

    images.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentIndex) {
            indicator.classList.add('active'); // Add the active class to the current indicator
        }
        indicator.addEventListener('click', () => {
            currentIndex = index; // Switch to the corresponding image
            updateImage();
        });
        indicatorsContainer.appendChild(indicator); // Add the indicator to the container
    });
}

// Button event handlers
document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1; // Cycle through
    updateImage();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1; // Cycle through
    updateImage();
});

// Slider initialization
updateImage();