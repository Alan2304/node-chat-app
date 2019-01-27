const path = require('path');
const http = require('http');
const express = require('express');
const SocketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

    //socket.emit from admin text welcome to the chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    //socket.broadcast.emit from admin text new user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


