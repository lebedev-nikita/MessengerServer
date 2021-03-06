http://my-messenger-server.herokuapp.com/

## API

**Добавить канал**

> curl -X POST -H "Content-Type: application/json" -d '{"name": "Первый канал 1"}' http://my-messenger-server.herokuapp.com/channels

В ответ сервер вернет JSON вида: {"channel": {"id": 0, "name": "Первый канал 1"}}

Канал содержит 2 поля:
* "id" - заполняется автоматически
* "name" - нужно передать при создании канала

**Найти каналы, в имени которых есть "1"**

> curl http://my-messenger-server.herokuapp.com/channels?searchString=1

В ответ сервер вернет JSON вида:

{"channels": [{"id": 0,
"name": "Первый канал 1"}]}

**Напишем сообщения в канал с id = 0**

> curl -X POST -H "Content-Type: application/json" -d '{"answer_to_id": 10, "user_id": 1, "text": "Hello world!"}' http://my-messenger-server.herokuapp.com/channels/0/messages

В ответ сервер вернет JSON вида:

{"message": {"id": 0, "channel_id": 0, "user_id": 1, "datetime": "Thu, 19 Mar 2020 21:18:23 GMT", "answer_to_id": 10, "text": "Hello world!"}}

Сообщение содержит 6 полей:
* "user_id" - обязательное поле
* "text" - обязательное поле
* "answer_to_id" - не обязательное поле
* "id" - заполняется сервером автоматически
* "channel_id" - заполняется сервером автоматически
* "datetime" - заполняется автоматически

**Запросим сообщения из канала с id=0**

> curl http://my-messenger-server.herokuapp.com/channels/0/messages

В ответ сервер вернет JSON вида:

{"messages": [{"id": 0, "text": "Test message", "username": "test_user", "datetime": "Thu, 19 Mar 2020 20:33:33 GMT"}]}

**Удалить с сервера все каналы и сообщения**

> curl -X DELETE http://my-messenger-server.herokuapp.com/clean
