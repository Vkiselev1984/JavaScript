import config from './config.js'; // Импортируем конфигурацию

const imageElement = document.getElementById('random-image');
const photographerElement = document.getElementById('photographer');
const photographerInfoElement = document.getElementById('photographer-info');
const likeButton = document.getElementById('like-button');
const likeCountElement = document.getElementById('count');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let likeCount = 0;
let history = []; // Массив для хранения истории изображений
let currentImageData = null; // Переменная для хранения текущего изображения

async function fetchRandomImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${config.apiKey}`);
        if (!response.ok) {
            throw new Error('Ошибка загрузки изображения');
        }
        currentImageData = await response.json();
        console.log('Полученные данные изображения:', currentImageData); // Логируем полученные данные
        displayImage(currentImageData);
        await saveToHistory(currentImageData);
    } catch (error) {
        console.error('Ошибка при получении случайного изображения:', error);
    }
}

// Функция для отображения изображения и информации о фотографе
function displayImage(data) {
    if (!data || !data.urls || !data.urls.regular || !data.user) {
        console.error('Некорректные данные изображения:', data);
        return; // Прерываем выполнение функции, если данные некорректные
    }

    imageElement.src = data.urls.regular; // Используем URL изображения
    photographerElement.innerHTML = `Фото от <a href="${data.user.links.html}" target="_blank">${data.user.name}</a>`; // Ссылка на фотографа

    // Дополнительная информация о фотографе
    photographerInfoElement.innerHTML = `
        <strong>Название:</strong> ${data.alt_description || 'Без названия'}<br>
        <strong>Ссылка на изображение:</strong> <a href="${data.links.html}" target="_blank">Посмотреть</a>
    `;
}

// Функция для добавления изображения в историю
async function addToHistory(data) {
    history.push({
        id: data.id, // Уникальный идентификатор
        title: data.alt_description || 'Без названия',
        imageUrl: data.urls.regular, // URL изображения
        photographer: data.user.name, // Имя фотографа
        photographerUrl: data.user.links.html, // Ссылка на страницу фотографа
        downloadUrl: data.links.html // Ссылка на страницу изображения
    });
    localStorage.setItem('imageHistory', JSON.stringify(history)); // Сохраняем историю в локальное хранилище

    // Отправляем данные на сервер для сохранения в файл
    await saveToHistory(data);
}

// Функция для сохранения данных в историю на сервере
// Функция для сохранения данных в историю на сервере
async function saveToHistory(imageData) {
    try {
        await fetch('/api/history', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: imageData.id,
                title: imageData.alt_description || 'Без названия',
                imageUrl: imageData.urls.regular, // Ссылка на изображение
                photographer: imageData.user.name,
                photographerUrl: imageData.user.links.html, // Ссылка на фотографа
                downloadUrl: imageData.links.html // Ссылка на страницу изображения
            })
        });
    } catch (error) {
        console.error('Ошибка при сохранении в историю:', error);
    }
}

// Обработчик события для лайка
likeButton.addEventListener('click', () => {
    likeCount++;
    likeCountElement.innerText = likeCount;
    localStorage.setItem('likeCount', likeCount); // Сохраняем количество лайков в локальном хранилище
});

// Обработчик события для кнопки "Предыдущее изображение"// Обработчик события для кнопки "Предыдущее изображение"
prevButton.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/history');
        if (!response.ok) {
            throw new Error('Ошибка загрузки истории изображений');
        }
        const historyData = await response.json(); // Загружаем историю из файла
        console.log('История изображений:', historyData); // Логируем историю

        if (historyData.length > 0) {
            // Получаем индекс текущего изображения
            const currentIndex = historyData.findIndex(img => img.imageUrl === currentImageData.urls.regular);
            if (currentIndex > 0) {
                const previousImageData = historyData[currentIndex - 1]; // Получаем предыдущее изображение
                console.log('Предыдущее изображение:', previousImageData); // Логируем предыдущее изображение
                displayImage(previousImageData); // Отображаем предыдущее изображение
                currentImageData = previousImageData; // Обновляем текущие данные изображения
            } else {
                alert('Нет предыдущих изображений!');
            }
        } else {
            alert('История изображений пуста!');
        }
    } catch (error) {
        console.error('Ошибка при получении истории:', error);
    }
});

// Обработчик события для кнопки "Следующее изображение"
nextButton.addEventListener('click', fetchRandomImage);

// Инициализация
fetchRandomImage(); // Получаем случайное изображение при загрузке страницы