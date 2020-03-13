// Подключим внешние зависимости из node_modules.
// Каждая библиотека возвращает некоторый объект через module.exports, точно так
// же, как мы это сделали в models.js. Функция require динамически находит
// модуль, исполняет его код и возвращает его module.exports нам.
const express = require('express');
const bodyParser = require('body-parser');

// Подключаем наш модуль models.js
const models = require('./models');


class Application {
    constructor () {
        // Создаем наше Express-приложение.
        this.expressApp = express();
        // Создаем ChannelManager, экспортированный из models.js
        this.manager = new models.ChannelManager();
        this.attachRoutes();
    }

    attachRoutes () {
        let app = this.expressApp;
        // Создадим middleware для обработки JSON-тел запросов, т. е. функцию,
        // которая будет вызываться перед нашими обработчиками и обрабатывать
        // JSON в теле запроса, чтобы наш обработчик получил готовый объект.
        let jsonParser = bodyParser.json();

        // Назначаем функции-обработчики для GET/POST разных URL. При запросе на
        // указанный первым аргументом адрес, будут вызваны все функции,
        // которые переданы начиная со второго аргумента (их может быть сколько
        // угодно).
        // Важно обратить внимание на .bind - тут мы назначаем в качестве
        // обработчиков методы, а не функции. По сути, метод - это функция,
        // привязанная к объекту, что мы и делаем методом bind. Без него мы
        // получим неопределенный this, так как метод будет вызван как обычная
        // функция. Так следует делать всегда при передаче метода как аргумента.
        // Каждый обработчик принимает два аргумента - объекты запроса и ответа,
        // обозначаемые как req и res.
        app.get('/channels', this.channelSearchHandler.bind(this));
        app.post('/channels', jsonParser, this.createChannelHandler.bind(this));
        // Имя после двоеточия - параметр, принимающий произвольное значение.
        // Такие параметры доступны в req.params
        app.get('/channels/:channelId/messages', this.getMessagesHandler.bind(this));
        app.post('/channels/:channelId/messages', jsonParser, this.postMessageHandler.bind(this));
    }

    // Обработчик создания комнаты
    createChannelHandler (req, res) {
        // Если нет обязательного поля name в JSON-теле - вернем 400 Bad Request
        if (!req.body.name) {
            res.status(400).json({});
        } else {
            // Создаем комнату в manager'e и вернем ее в виде JSON
            let channel = this.manager.createChannel(req.body.name);
            let response = {
                channel: channel.toJson()
            };
            // Отправим ответ клиенту. Объект будет автоматически сериализован
            // в строку. Если явно не задано иного, HTTP-статус будет 200 OK.
            res.json(response);
        }
    }

    getMessagesHandler (req, res) {
        // Получаем комнату по ID. Если комнаты нет - вернется undefined
        let channel = this.manager.getById(req.params.channelId);

        // Проверка на то, нашлась ли такая комната
        if (!channel) {
            // Если нет - 404 Not Found и до свидания
            res.status(404).json({});
        } else {
            // Преобразуем все сообщения в JSON
            let messagesJson = channel.messages.map(message => message.toJson());
            let response = {
                messages: messagesJson
            };

            // Отправим ответ клиенту
            res.json(response);
        }
    }

    postMessageHandler (req, res) {
        // Получаем комнату по ID
        let channel = this.manager.getById(req.params.channelId);

        if (!channel) {
            res.status(404).json({});
        } else if (!req.body.body || !req.body.username) {
            // Если формат JSON-сообщения некорректный - вернем 400 Bad Request
            res.status(400).json({});
        } else {
            // Создаем сообщение и возвращаем его клиенту
            let message = channel.postMessage(req.body.body, req.body.username);
            let response = {
                message: message.toJson()
            };

            res.json(response);
        }
    }

    channelSearchHandler (req, res) {
        // Получаем строку-фильтр из query-параметра searchString.
        // Если параметр не задан, то используем пустую строку, т. е.
        // будут найдены все комнаты
        let searchString = req.query.searchString || '';
        // Ищем комнаты и представляем их в виде JSON
        let channels = this.manager.findByName(searchString);
        let channelsJson = channels.map(channel => channel.toJson());
        let response = {
            channels: channelsJson
        };

        // Отдаем найденное клиенту
        res.json(response);
    }
}


// Экспортируем наш класс наружу
module.exports = Application;
