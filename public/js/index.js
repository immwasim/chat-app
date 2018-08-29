//initiate client to server request to open up a web socket
var socket = io();

//use function, not arrow for cross browser fucntionality. 
socket.on('connect', function () {
    console.log("client connected to server");
})

socket.on('disconnect', function () {
    console.log("server connection dropped");
})

socket.on('newMessage', function (message) {
    console.log("new Message", message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`)

    jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
    var li = jQuery(`<li></li>`);
    var a = $('<a target="_blank">current location of user</a>')
    li.text(`${message.from}: `)
    a.attr('href', message.url)
    li.append(a);

    jQuery('#messages').append(li);
})

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var txtMessage =  jQuery('[name=message]')

    socket.emit('createMessage',
    {
        from: 'User', 
        text: txtMessage.val()
    }, function (data) {
        txtMessage.val('');
    });
})

var locationButton = $('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('No geo in your browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text("Send Location");
        socket.emit('createLocationMessage', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    }, function (){
        locationButton.removeAttr('disabled').text("Send Location");;
        alert('user denied permissions');
    });
});