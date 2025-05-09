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


const dropdownButton = document.getElementById('dropdownMenuButton');
if (dropdownButton) {
    dropdownButton.id = 'superDropdown';
}


const ariaElement = document.querySelector('[aria-labelledby="dropdownMenuButton"]');
if (ariaElement) {
    ariaElement.dataset.dd = '3';
}


const dropdownToggle = document.querySelector('.dropdown-toggle');
if (dropdownToggle) {
    dropdownToggle.removeAttribute('type');
}