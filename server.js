'use strict';

const http = require('http');
const fs = require('fs');

const server = http.createServer(function(request, response) {

    console.log(request.method, request.url);

    if(request.url === '/')
    {
        const text = fs.readFileSync('index.html', 'utf8');
        response.end(text);
    }
    else
    {
        // const text1 = fs.readFileSync('index1.html', 'utf8');
        // response.end(DATABASE_URL);
        response.end(request.url.slice(1, request.url.length));
    }
});


server.listen(process.env.PORT || 3000);
console.log('Server started!');
