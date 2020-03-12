'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response) {
    console.log('Hello!');
    if(request.url == '/')
    {
        const text = fs.readFileSync('index.html', 'utf8');
        response.end(text);
    }
    else
    {
        const text1 = fs.readFileSync('index1.html', 'utf8');
        response.end(text1);
    }
});


server.listen(process.env.PORT || 3000);
console.log('Server started!');
