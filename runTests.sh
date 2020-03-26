#!/bin/bash

if [ -z "$1" ]
then
    SRV=localhost:8000
else
    SRV=my-messenger-server.herokuapp.com
fi

curl -X POST -H "Content-Type: application/json" -d '{"name": "Первый канал 1"}' http://$SRV/channels
echo
echo
curl -X POST -H "Content-Type: application/json" -d '{"answer_to_id": 10, "user_id": 1, "text": "Hello world!"}' http://$SRV/channels/0/messages
echo
echo
curl http://$SRV/channels/0/messages
echo
echo
curl -X DELETE http://$SRV/clean
echo
echo
curl http://$SRV/channels/0/messages
