var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'Alan',
        text: 'Yup, that works for me'
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log("New Email", email);
});

socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});

