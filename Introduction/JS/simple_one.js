document.addEventListener('DOMContentLoaded', function() {
    const colorSelect = document.getElementById('colorSelect');
    const showCharacterBtn = document.getElementById('showCharacterBtn');
    const characterResultDiv = document.getElementById('characterResult');

    function showCharacter() {
        const selectedColor = colorSelect.value;
        let character;

        switch (selectedColor) {
            case 'red':
                character = 'Вы страстный и энергичный человек!';
                break;
            case 'blue':
                character = 'Вы спокойный и надежный человек!';
                break;
            case 'green':
                character = 'Вы дружелюбный и спокойный человек!';
                break;
            case 'yellow':
                character = 'Вы оптимистичный и креативный человек!';
                break;
            default:
                character = 'Выберите цвет, чтобы узнать свой характер!';
        }

        characterResultDiv.innerHTML = `<p><strong>Ваш характер:</strong> ${character}</p>`;
    }

    showCharacterBtn.addEventListener('click', showCharacter);
});