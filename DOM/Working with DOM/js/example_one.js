const divElement = document.createElement('div');
const paragraphElement = document.createElement('p');

paragraphElement.style.color = 'white';
paragraphElement.style.backgroundColor = 'black';
paragraphElement.style.padding = '10px';
paragraphElement.style.width = '250px';
paragraphElement.style.textAlign = 'center';

paragraphElement.textContent = 'Hello, world!';

divElement.appendChild(paragraphElement);

const container = document.getElementById('container');
container.appendChild(divElement);