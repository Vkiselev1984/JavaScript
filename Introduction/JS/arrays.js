// Example 2
document.addEventListener('DOMContentLoaded', function () {
    const firstArray = ['1', '2', '3'];
    const secondArray = ['a', 'b', 'c', 'd', 'f'];

    const displayArray = (array, elementClass) => {
        const element = document.querySelector(`.${elementClass}`);
        element.innerHTML = '';
        element.append(...array.map(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            return listItem;
        }));
    };

    const updateArrayLength = (array, lengthElementId) => {
        const lengthElement = document.getElementById(lengthElementId);
        lengthElement.textContent = `(number of elements in the array ${array.length})`;
    };

    displayArray(firstArray, 'arrays__list#first-array');
    displayArray(secondArray, 'arrays__list#second-array');

    updateArrayLength(firstArray, 'first-array-length');
    updateArrayLength(secondArray, 'second-array-length');

    document.querySelector('.arrays__button#merge-button').addEventListener('click', () => {
        const mergedArray = firstArray.map((item, i) => (i < secondArray.length ? secondArray[i] : item));

        displayArray(mergedArray, 'arrays__list#merged-array');
        updateArrayLength(mergedArray, 'merged-array-length');
        const remainingElements = secondArray.slice(firstArray.length);
        document.querySelector('.arrays__remaining#remaining-elements').textContent = `The remaining elements of the second array: ${remainingElements.join(', ')}`;
    });
});

// Example 3

document.addEventListener('DOMContentLoaded', function () {
    const numberDiv = document.querySelector('.number-info__output');
    const button = document.querySelector('.number-info__button');

    button.addEventListener('click', function () {
        button.disabled = true;

        let i = 0;
        const results = [];

        const intervalId = setInterval(() => {
            if (i > 10) {
                clearInterval(intervalId);
                button.disabled = false;
                return;
            }

            let description;

            if (i === 0) {
                description = 'null';
            } else if (i % 2 === 0) {
                description = 'even number';
            } else {
                description = 'odd number';
            }

            results.push(`${i} - ${description}`);
            numberDiv.textContent = results.join(', ');
            i++;
        }, 1000);
    });
});


// Example 4

document.addEventListener('DOMContentLoaded', function () {
    const originalArray = [1, 2, 3, 4, 5, 6, 7];
    const arrayDisplay = document.getElementById('array-display');
    const button = document.querySelector('.remove-number__button');

    function displayArray() {
        arrayDisplay.textContent = originalArray.join(', ');
    }

    displayArray();

    button.addEventListener('click', function () {
        const index4 = originalArray.indexOf(4);
        const index5 = originalArray.indexOf(5);

        if (index4 !== -1) {
            originalArray.splice(index4, 1);
        }
        if (index5 !== -1) {
            const newIndex5 = originalArray.indexOf(5);
            if (newIndex5 !== -1) {
                originalArray.splice(newIndex5, 1);
            }
        }

        displayArray();
    });
});

// Example 5

document.addEventListener('DOMContentLoaded', function () {
    const resultDiv = document.querySelector('.random_numbers__result');
    const button = document.querySelector('.random_numbers__button');

    button.addEventListener('click', function () {
        const randomArray = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
        const sum = randomArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const minNumber = Math.min(...randomArray);
        const hasThree = randomArray.includes(3);

        const resultText = `
            Generated array: [${randomArray.join(', ')}]<br>
            Sum of array elements: ${sum}<br>
            Minimum number in array: ${minNumber}<br>
            Is there a number 3 in the array: ${hasThree}
        `;

        resultDiv.innerHTML = resultText;
    });
});