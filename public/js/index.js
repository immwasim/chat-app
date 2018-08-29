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
    //console.log("new Message", message);
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text:message.text,
        from:message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
})

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a')
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url:message.url,
        from:message.from,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);
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