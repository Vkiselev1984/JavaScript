const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const dataFilePath = path.join(__dirname, './public/data/data.json');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Для статических файлов

// Функция для записи данных в файл
function saveData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify({ history: data }, null, 2)); // Оборачиваем в объект с ключом history
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
    }
}

// Функция для получения данных из файла
function loadData() {
    try {
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath);
            const parsedData = JSON.parse(data);
            return parsedData.history || []; // Возвращаем массив history
        }
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
    return []; // Возвращаем пустой массив, если файл не существует или произошла ошибка
}

// Endpoint для получения данных о фотографиях
// Endpoint для получения данных о фотографиях
app.get('/api/history', (req, res) => {
    const history = loadData(); // Загружаем историю из файла
    res.json(history); // Отправляем историю в ответе
});

// Endpoint для сохранения данных о фотографиях
// Endpoint для сохранения данных о фотографиях
app.post('/api/history', (req, res) => {
    const newEntry = req.body; // Получаем новые данные из запроса
    const history = loadData(); // Загружаем текущую историю
    history.push(newEntry); // Добавляем новую запись в историю
    saveData(history); // Сохраняем обновленную историю в файл
    res.status(201).json(newEntry); // Отправляем новую запись в ответе
});

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; font-src 'self' data:; img-src 'self' data: https://*.unsplash.com;");
    next();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});