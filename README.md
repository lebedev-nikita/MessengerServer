http://my-messenger-server.herokuapp.com/

##API
**Добавить канал**
curl -X POST -H "Content-Type: application/json" -d '{"name": "Первый канал 1"}' http://my-messenger-server.herokuapp.com/channels
curl -X POST -H "Content-Type: application/json" -d '{"name": "Второй канал 2"}' http://my-messenger-server.herokuapp.com/channels

**Найти каналы, в имени которых есть "3"**
curl http://my-messenger-server.herokuapp.com/channels?searchString=3

**Напишем сообщения в канал с id = 0**
curl -X POST -H "Content-Type: application/json" -d '{"text": "Test message", "username": "test_user"}' http://my-messenger-server.herokuapp.com/channels/0/messages
curl -X POST -H "Content-Type: application/json" -d '{"text": "Еще одно сообщение!", "username": "TheOwl"}' http://my-messenger-server.herokuapp.com/channels/0/messages

**Запросим сообщения из канала с id=0**
curl http://my-messenger-server.herokuapp.com/channels/0/messages
