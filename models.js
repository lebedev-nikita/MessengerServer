class ChannelManager {
    constructor () {
        // Задаем поля класса в его конструкторе.

        // Словарь каналов - позволяет получить канал по ее id.
        this.channels = {};
        // Счетчик, который хранит id, который бдет присвоен следующему каналу
        this._nextChannelId = 0;
    }

    createChannel (name) {
        // Создаем объект нового канала
        let channel = new Channel(this._nextChannelId++, name);
        // Заносим его в словарь
        this.channels[channel.id] = channel;
        return channel;
    }

    // Регистронезависимый поиск по имени канала
    findByName (searchSubstring) {
        // Переведем поисковый запрос в нижний регистр
        let lowerSearchSubstring = searchSubstring.toLowerCase();

        // Получим массив каналов. Для этого, получим все ключи словаря в виде
        // массива, и для каждого ключа вытащим соответствующий ему элемент
        // Если вы используете Node 7.2 или выше, то можно сделать так:
        // let channels = Object.values(this.channels);
        let channels = Object.keys(this.channels).map(id => this.channels[id]);

        // Отфильтруем из массива только те каналы, в названии которых есть
        // заданная подстрока
        return channels.filter(channel =>
            channel.name.toLowerCase().indexOf(lowerSearchSubstring) !== -1
        );
    }

    // Получаем комнату по ее id
    getById (id) {
        return this.channels[id];
    }
}


class Channel {
    constructor (id, name) {
        this.id = id;
        // В отличие от чат-комнат, сообщения хранятся в массиве, а не в словаре,
        // так как не стоит задачи получения сообщения по его id
        this.messages = [];
        this.name = name;
        // По аналогии с ChannelManager - счетчик хранит id следующего объекта
        this._nextMessageId = 0;
    }

    postMessage (user_id, answer_to_id, text) {
        // Создадим новый объект сообщения и поместим его в массив
        // Дату намеренно не передаем - см. конструктор Message
        let message = new Message(this._nextMessageId++, this.id, user_id,
                                  answer_to_id, text);
        this.messages.push(message);
        return message;
    }

    toJson () {
        // Приведем объект к тому JSON-представлению, которое отдается клиенту
        return {
            id: this.id,
            name: this.name
        };
    }
}


class Message {
    constructor (id, channel_id, user_id, answer_to_id, text) {
        this.id = id;
        this.channel_id = channel_id;
        this.user_id = user_id;
        this.datetime = new Date();
        this.answer_to_id = answer_to_id;
        this.text = text;
    }

    toJson () {
        return {
            id: this.id,
            channel_id: this.channel_id,
            user_id: this.user_id,
            // Объект даты сериализуем в строку
            datetime: this.datetime.toUTCString(),
            answer_to_id: this.answer_to_id,
            text: this.text
        };
    }
}


// Определим объекты, которые будут экспортироваться модулем как внешнее API:
module.exports = { ChannelManager, Channel, Message };
