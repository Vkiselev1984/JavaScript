// Example 1

document.addEventListener('DOMContentLoaded', function () {
    const colorSelect = document.querySelector('.character-test__select');
    const showCharacterBtn = document.querySelector('.character-test__button');
    const characterResultDiv = document.querySelector('.character-test__result');

    function showCharacter() {
        const selectedColor = colorSelect.value;
        let character;

        switch (selectedColor) {
            case 'red':
                character = 'You are a passionate and energetic person!';
                break;
            case 'blue':
                character = 'You are a calm and reliable person!';
                break;
            case 'green':
                character = 'You are a friendly and calm person!';
                break;
            case 'yellow':
                character = 'You are an optimistic and creative person!';
                break;
            default:
                character = 'Choose a color to find out your character!';
        }

        characterResultDiv.innerHTML = `<p><strong>Your character:</strong> ${character}</p>`;
    }

    showCharacterBtn.addEventListener('click', showCharacter);
});