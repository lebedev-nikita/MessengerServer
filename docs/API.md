
**Добавить канал**
curl -X POST -H "Content-Type: application/json" -d '{"name": "Первый канал"}' http://localhost:8000/channels
curl -X POST -H "Content-Type: application/json" -d '{"name": "Второй канал"}' http://localhost:8000/channels

**Найти каналы, в имени которых есть "ерв"**
http://localhost:8000/channels?searchString=ерв

**Напишем сообщения в канал с id = 0**
curl -X POST -H "Content-Type: application/json" -d '{"body": "Test message", "username": "test_user"}' http://localhost:8000/channels/0/messages
curl -X POST -H "Content-Type: application/json" -d '{"body": "Еще одно сообщение!", "username": "TheOwl"}' http://localhost:8000/channels/0/messages

**Запросим сообщения из канала с id=0**
http://localhost:8000/channels/0/messages
