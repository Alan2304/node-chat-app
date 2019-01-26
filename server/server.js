const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const publicPath =  path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var io = SocketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User connected');
    
    socket.on('disconnect', () => {
        console.log('Disconnected user');
    });

    socket.emit('newMessage', {
        from: 'Cutla',
        text: 'See you then',
        createdAt: 123123
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


