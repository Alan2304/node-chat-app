var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log("New Email", email);
});

socket.on('newMessage', function(message) {
    var formatedTime = moment(message.createdAt).format('hh:mm a');
    var li = $('<li></li>');
    li.text(`${message.from} ${formatedTime}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formatedTime = moment(message.createdAt).format('hh:mm a');

    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current Location</a>')
    
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);  
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click', function(){
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    })

});
