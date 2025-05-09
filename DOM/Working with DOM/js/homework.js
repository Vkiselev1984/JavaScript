"use strict";

const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.classList.add('super-dropdown');
});

const btnElement = document.querySelector('.btn');
if (btnElement.classList.contains('btn-secondary')) {
    btnElement.classList.remove('btn-secondary');
} else {
    btnElement.classList.add('btn-secondary');
}


const menuElement = document.querySelector('.menu');
if (menuElement) {
    menuElement.classList.remove('dropdown-menu');
}


const dropdownDiv = document.querySelector('.dropdown');
dropdownDiv.insertAdjacentHTML('afterend', '<a href="#">link</a>');

// 5. Replace the id "dropdownMenuButton" with "superDropdown"
const dropdownButton = document.getElementById('dropdownMenuButton');
if (dropdownButton) {
    dropdownButton.id = 'superDropdown';
}

// 6. Add data-dd attribute with value 3 to element with aria-labelledby="dropdownMenuButton" attribute
const ariaElement = document.querySelector('[aria-labelledby="dropdownMenuButton"]');
if (ariaElement) {
    ariaElement.dataset.dd = '3';
}

// 7. Remove type attribute from element with class "dropdown-toggle"
const dropdownToggle = document.querySelector('.dropdown-toggle');
if (dropdownToggle) {
    dropdownToggle.removeAttribute('type');
}