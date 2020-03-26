curl -X POST -H "Content-Type: application/json" -d '{"name": "Первый канал 1"}' http://localhost:8000/channels
echo
echo
curl -X POST -H "Content-Type: application/json" -d '{"answer_to_id": 10, "user_id": 1, "text": "Hello world!"}' http://localhost:8000/channels/0/messages
echo
echo
curl http://localhost:8000/channels/0/messages
echo
echo
curl -X DELETE http://localhost:8000/clean
echo
echo
curl http://localhost:8000/channels/0/messages
